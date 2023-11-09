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


  constructor(petsService: PetsService) {}
  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(1)],
      }),
    });
  }
  onSavePost() {}
  onImagePicked() {}

  ngOnDestroy(): void {}
}
