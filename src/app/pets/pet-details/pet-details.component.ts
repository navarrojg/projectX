import { Component, OnInit, OnDestroy } from '@angular/core';
import { Pet } from '../pet.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PetsService } from '../pets.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.css'],
})
export class PetDetailsComponent implements OnInit, OnDestroy {
  pet: Pet;
  id: string;
  private authStatusSub: Subscription;
  userIsAuthenticated = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private petService: PetsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.pet = this.petService.getPet1(this.id);
    });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        console.log(isAuthenticated);
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onDeletePet(petId: string) {
    this.petService.deletePet(petId);
  }

  onEditPet() {
    this.router.navigate(['/edit', this.id]);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
