import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PetsService } from '../pets.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Pet } from '../pet.model';
import { mimeType } from './mime-type.validator';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-pet-create',
  templateUrl: './pet-create.component.html',
  styleUrls: ['./pet-create.component.css'],
})
export class PetCreateComponent implements OnInit, OnDestroy {
  petForm: FormGroup;
  isLoading = false;
  private mode = 'create';
  private id: string;
  private pet: Pet;
  imagePreview: string;
  private authStatusSub: Subscription;

  constructor(
    private petsService: PetsService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.isLoading = false;
      });
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
        this.id = paramMap.get('id');
        this.isLoading = true;
        this.petsService.getPet(this.id).subscribe((petData) => {
          console.log(petData);
          console.log(petData.comments);
          this.isLoading = false;
          this.pet = {
            id: petData._id,
            name: petData.name,
            sex: petData.sex,
            age: petData.age,
            breed: petData.breed,
            imagePath: petData.imagePath,
            creator: petData.creator,
            comments: petData.comments,
            likes: petData.likes,
          };
          this.petForm.setValue({
            name: this.pet.name,
            sex: this.pet.sex,
            age: this.pet.age,
            breed: this.pet.breed,
            image: this.pet.imagePath,
          });
        });
      } else {
        this.mode = 'create';
        this.id = null;
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
        this.id,
        this.petForm.value.name,
        this.petForm.value.sex,
        this.petForm.value.age,
        this.petForm.value.breed,
        this.petForm.value.image,
        this.pet.comments,
        this.pet.likes
      );
    }
    this.petForm.reset();
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

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }
}
