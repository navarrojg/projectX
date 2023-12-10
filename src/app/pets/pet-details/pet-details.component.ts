import { Component, OnInit, OnDestroy, Injectable } from '@angular/core';
import { Pet } from '../pet.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PetsService } from '../pets.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConf } from 'src/app/delete-conf/delete-conf.component';

@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.css'],
})
@Injectable()
export class PetDetailsComponent implements OnInit, OnDestroy {
  pet: Pet;
  id: string;
  private authStatusSub: Subscription;
  userIsAuthenticated = false;
  userId: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private petService: PetsService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.pet = this.petService.getPet1(this.id);
    });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.userId = this.authService.getUserId();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        console.log(isAuthenticated);
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }

  onDeletePet(petId: string) {
    this.dialog.open(DeleteConf);
    // this.petService.deletePet(petId);
  }

  onEditPet() {
    this.router.navigate(['/edit', this.id]);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
