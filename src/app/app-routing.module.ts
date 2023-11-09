import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PetsListComponent } from './pets/pets-list/pets-list.component';
import { PetCreateComponent } from './pets/pet-create/pet-create.component';

const routes: Routes = [
  { path: '', component: PetsListComponent },
  { path: 'create', component: PetCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
