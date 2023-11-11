import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PetsService } from '../pets.service';
import { Router } from '@angular/router';

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

  constructor(private petsService: PetsService, private router: Router) {}

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
    }
    this.petForm.reset();
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {}
}
