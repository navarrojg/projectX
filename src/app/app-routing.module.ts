import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PetsListComponent } from './pets/pets-list/pets-list.component';
import { PetCreateComponent } from './pets/pet-create/pet-create.component';
import { PetDetailsComponent } from './pets/pet-details/pet-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/pets', pathMatch: 'full' },
  {
    path: 'pets',
    component: PetsListComponent,
    // children: [{ path: ':id', component: PetDetailsComponent }],
  },
  { path: 'pets/:id', component: PetDetailsComponent },
  { path: 'create', component: PetCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
