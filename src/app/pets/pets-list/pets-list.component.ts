import { Component, OnInit, OnDestroy } from '@angular/core';
import { PetsService } from '../pets.service';
import { Pet } from '../pet.model';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pets-list',
  templateUrl: './pets-list.component.html',
  styleUrls: ['./pets-list.component.css'],
})
export class PetsListComponent implements OnInit, OnDestroy {
  pets: Pet[] = [];
  private petSub: Subscription;
  isLoading = false;
  totalPets = 10;
  petsPerPage = 5;
  currentPage = 1;
  petSizeOptions = [1, 3, 5, 10];

  constructor(private petsService: PetsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.petsService.getPets(this.petsPerPage, this.currentPage);
    this.petSub = this.petsService
      .getPetUpdateListener()
      .subscribe((pets: Pet[]) => {
        this.isLoading = false;
        this.pets = pets;
      });
  }

  onChengedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.petsPerPage = pageData.pageSize;
    this.petsService.getPets(this.petsPerPage, this.currentPage);
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
      default:
        return unkownAvatar;
    }
  }

  ngOnDestroy() {
    this.petSub.unsubscribe();
  }
}
