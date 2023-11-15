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

  ngOnDestroy() {
    this.petSub.unsubscribe();
  }
}
