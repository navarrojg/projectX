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
  isLoading = false;

  newComment: string = '';
  // comments: string[] = ['fajny kotek :)', 'what a kitty!'];
  comments: string[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private petService: PetsService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      // this.pet = this.petService.getPet1(this.id);
      this.petService.getPet(this.id).subscribe((pet: any) => {
        this.pet = pet;
        this.isLoading = false;
      });
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
    this.dialog.open(DeleteConf, {
      data: {
        id: this.route.snapshot.params['id'],
      },
    });
    // this.petService.deletePet(petId);
  }

  onEditPet() {
    this.router.navigate(['/edit', this.id]);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

  onAddComment() {
    if (this.newComment.trim() !== '') {
      // this.comments.push(this.newComment);
      // this.pet.comments = this.comments;

      this.petService.addComment(this.id, this.newComment).subscribe(
        (response) => {
          this.petService.getPet(this.id).subscribe((pet: any) => {
            this.pet = pet;
            console.log('comment added succesfully:', response);
          });
        },
        (error) => {
          console.error('error adding comment: ', error);
        }
      );
      this.newComment = '';
    }
  }
}
