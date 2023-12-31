import { Component, OnInit, OnDestroy } from '@angular/core';
import { PetsService } from '../pets.service';
import { Pet } from '../pet.model';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-pets-list',
  templateUrl: './pets-list.component.html',
  styleUrls: ['./pets-list.component.css'],
  animations: [
    trigger('likeAnimation', [
      state(
        'rotate',
        style({
          transform: 'rotate(360deg)',
        })
      ),
      transition('normal => rotate', [animate('0.8s ease-out')]),
    ]),
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [animate(1000)]),
    ]),
  ],
})
export class PetsListComponent implements OnInit, OnDestroy {
  pets: Pet[] = [];
  private petSub: Subscription;
  isLoading = false;
  totalPets = 0;
  petsPerPage = 10;
  currentPage = 1;
  petSizeOptions = [3, 4, 5, 10];
  petAnimationStates: { [petId: string]: 'normal' | 'rotate' } = {};

  constructor(private petsService: PetsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.petsService.getPets(this.petsPerPage, this.currentPage);
    this.petSub = this.petsService
      .getPetUpdateListener()
      .subscribe((petData: { pets: Pet[]; petsCount: number }) => {
        this.isLoading = false;
        this.totalPets = petData.petsCount;
        this.pets = petData.pets;
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.petsPerPage = pageData.pageSize;
    this.petsService.getPets(this.petsPerPage, this.currentPage);
  }

  onGiveLike(petId: string) {
    this.petAnimationStates[petId] = 'rotate';
    setTimeout(() => {
      this.petAnimationStates[petId] = 'normal';
    }, 800);
    this.petsService.giveLike(petId).subscribe(() => {
      this.petsService.getPets(this.petsPerPage, this.currentPage);
    });
  }

  petIcon(breed: string) {
    const petType = breed;
    // const dogAvatar = '../pets-icon/dogicon.jpg';
    // const catAvatar = '../pets-icon/caticon.jpg';
    // const unkownAvatar = '../pets-icon/qmicon.jpg';
    const dogAvatar =
      'https://img.freepik.com/premium-vector/creative-canine-logo-design-vector-dog-head-illustration-icon-pet-shop_950157-1962.jpg?w=2000';
    const catAvatar =
      'https://www.creativefabrica.com/wp-content/uploads/2021/01/26/Cat-Icon-Graphics-8071439-1.jpg';
    const unkownAvatar =
      'https://icons.veryicon.com/png/o/miscellaneous/mobile-aone/question-mark-12.png';
    const horseAvatar =
      'https://st5.depositphotos.com/66293462/64473/v/450/depositphotos_644734704-stock-illustration-vector-logo-horse-black-white.jpg';
    const turtleAvatar =
      'https://cdn.iconscout.com/icon/free/png-256/free-turtle-104-979422.png';
    const birdAvatar = 'https://static.thenounproject.com/png/2533760-200.png';
    const hamsterAvatar =
      'https://cdn-icons-png.flaticon.com/512/5987/5987650.png';
    const fishAvatar =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBx2I_8PXXi9ffXdBypbTOvEOfJhoc5F9pfA';
    const snakeAvatar =
      'https://www.creativefabrica.com/wp-content/uploads/2023/01/29/Snake-logo-icon-vector-template-Graphics-59338083-1.jpg';
    switch (petType.toLowerCase()) {
      case 'dog':
        return dogAvatar;
        break;
      case 'cat':
        return catAvatar;
        break;
      case 'horse':
        return horseAvatar;
        break;
      case 'turtle':
        return turtleAvatar;
        break;
      case 'bird':
        return birdAvatar;
        break;
      case 'hamster':
        return hamsterAvatar;
        break;
      case 'fish':
        return fishAvatar;
        break;
      case 'snake':
        return snakeAvatar;
        break;
      default:
        return unkownAvatar;
    }
  }

  ngOnDestroy() {
    this.petSub.unsubscribe();
  }
}
