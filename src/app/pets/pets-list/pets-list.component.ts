import { Component, OnInit, OnDestroy } from '@angular/core';
import { PetsService } from '../pets.service';
import { Pet } from '../pet.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pets-list',
  templateUrl: './pets-list.component.html',
  styleUrls: ['./pets-list.component.css'],
})
export class PetsListComponent implements OnInit, OnDestroy {
  pets: Pet[] = [];
  private petSub: Subscription;
  isLoading = false;

  constructor(private petsService: PetsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.petsService.getPets();
    this.petSub = this.petsService
      .getPetUpdateListener()
      .subscribe((pets: Pet[]) => {
        this.isLoading = false;
        this.pets = pets;
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
      'https://cdn.icon-icons.com/icons2/2518/PNG/512/question_mark_icon_151137.png';
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
