import { Component, OnInit, OnDestroy, Injectable } from '@angular/core';
import { Pet } from '../pet.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PetsService } from '../pets.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConf } from 'src/app/delete-conf/delete-conf.component';
import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.css'],
  animations: [
    trigger('newComment', [
      state(
        'in',
        style({
          opacity: 1,
          transform: 'translateX(0)',
        })
      ),
      transition('void => *', [
        animate(
          1000,
          keyframes([
            style({
              transform: 'translateX(-500px)',
              opacity: 0,
              offset: 0,
            }),
            style({
              transform: 'translateX(-250px)',
              opacity: 0.5,
              offset: 0.3,
            }),
            style({
              transform: 'translateX(-100px)',
              opacity: 0.8,
              offset: 0.8,
            }),
            style({
              transform: 'translateX(0px)',
              opacity: 1,
              offset: 1,
            }),
          ])
        ),
      ]),
    ]),
  ],
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
  initialCommentsToShow = 5;

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

  showMoreComments() {
    this.initialCommentsToShow += 5;
  }
}
