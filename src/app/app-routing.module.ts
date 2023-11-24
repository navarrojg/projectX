import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PetsListComponent } from './pets/pets-list/pets-list.component';
import { PetCreateComponent } from './pets/pet-create/pet-create.component';
import { PetDetailsComponent } from './pets/pet-details/pet-details.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: '/pets', pathMatch: 'full' },
  {
    path: 'pets',
    component: PetsListComponent,
    // children: [{ path: ':id', component: PetDetailsComponent }],
  },
  { path: 'pets/:id', component: PetDetailsComponent },
  { path: 'create', component: PetCreateComponent },
  { path: 'edit/:id', component: PetCreateComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
