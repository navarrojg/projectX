import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PetsService } from '../pets.service';

@Component({
  selector: 'app-pet-create',
  templateUrl: './pet-create.component.html',
  styleUrls: ['./pet-create.component.css'],
})
export class PetCreateComponent implements OnInit, OnDestroy {
  form: FormGroup;
  enteredTitle = '';
  enteredContent = '';
  private mode = 'create';

  constructor(petsService: PetsService) {}

  ngOnInit() {}
  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.form = new FormGroup({
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
  }

  onImagePicked() {}

  ngOnDestroy(): void {}
}
