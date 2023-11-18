import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PetsService } from '../pets.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Pet } from '../pet.model';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-pet-create',
  templateUrl: './pet-create.component.html',
  styleUrls: ['./pet-create.component.css'],
})
export class PetCreateComponent implements OnInit, OnDestroy {
  // enteredTitle = '';
  // enteredContent = '';
  petForm: FormGroup;
  isLoading = false;
  private mode = 'create';
  private petId: string;
  private pet: Pet;
  imagePreview: string;

  constructor(
    private petsService: PetsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.petForm = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(1)],
      }),
      sex: new FormControl(null, {
        validators: [Validators.required],
      }),
      age: new FormControl(null, {
        validators: [Validators.required],
      }),
      breed: new FormControl(null, {
        validators: [Validators.required],
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType],
      }),
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.petId = paramMap.get('id');
        this.isLoading = true;
        this.petsService.getPet(this.petId).subscribe((petData) => {
          this.isLoading = false;
          this.pet = {
            id: petData._id,
            name: petData.name,
            sex: petData.sex,
            age: petData.age,
            breed: petData.breed,
            imagePath: null,
          };
          console.log(this.pet);
          this.petForm.setValue({
            // id: this.pet.id,
            name: this.pet.name,
            sex: this.pet.sex,
            age: this.pet.age,
            breed: this.pet.breed,
          });
        });
      } else {
        this.mode = 'create';
        this.petId = null;
      }
    });
  }

  onSavePet() {
    if (this.petForm.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.petsService.addPet(
        this.petForm.value.name,
        this.petForm.value.sex,
        this.petForm.value.age,
        this.petForm.value.breed,
        this.petForm.value.image
      );
    } else {
      this.petsService.updatePet(
        this.petId,
        this.petForm.value.name,
        this.petForm.value.sex,
        this.petForm.value.age,
        this.petForm.value.breed,
        null
      );
    }
    this.petForm.reset();
    this.router.navigate(['/']);
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.petForm.patchValue({ image: file });
    this.petForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  ngOnDestroy(): void {}
}
