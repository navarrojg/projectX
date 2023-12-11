import { NgModule } from '@angular/core';
import { PetsListComponent } from './pets-list/pets-list.component';
import { PetCreateComponent } from './pet-create/pet-create.component';
import { PetDetailsComponent } from './pet-details/pet-details.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PetsListComponent, PetCreateComponent, PetDetailsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule,
    FormsModule,
  ],
})
export class PetsModule {}
