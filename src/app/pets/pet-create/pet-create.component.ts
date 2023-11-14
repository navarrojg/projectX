import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PetsService } from '../pets.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Pet } from '../pet.model';

@Component({
  selector: 'app-pet-create',
  templateUrl: './pet-create.component.html',
  styleUrls: ['./pet-create.component.css'],
})
export class PetCreateComponent implements OnInit, OnDestroy {
  petForm: FormGroup;
  enteredTitle = '';
  enteredContent = '';
  private mode = 'create';
  private petId: string;
  private pet: Pet;

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
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.petId = paramMap.get('id');
        this.pet = this.petsService.getPet(+this.petId);
        console.log(this.pet);
        this.petForm.setValue({
          // id: this.pet.id,
          name: this.pet.name,
          sex: this.pet.sex,
          age: this.pet.age,
          breed: this.pet.breed,
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
    if (this.mode === 'create') {
      this.petsService.addPet(
        this.petForm.value.name,
        this.petForm.value.sex,
        this.petForm.value.age,
        this.petForm.value.breed
      );
    } else {
      this.petsService.updatePet(
        this.petId,
        this.petForm.value.name,
        this.petForm.value.sex,
        this.petForm.value.age,
        this.petForm.value.breed
      );
    }
    this.petForm.reset();
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {}
}
