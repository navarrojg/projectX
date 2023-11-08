import { Component, OnInit } from '@angular/core';
import { PetsService } from '../pets.service';
import { Pet } from '../pet.model';

@Component({
  selector: 'app-pets-list',
  templateUrl: './pets-list.component.html',
  styleUrls: ['./pets-list.component.css'],
})
export class PetsListComponent implements OnInit {
  pets: Pet[] = [];

  constructor(private petsService: PetsService) {}

  ngOnInit() {
    this.pets = this.petsService.getPets();
  }
}
