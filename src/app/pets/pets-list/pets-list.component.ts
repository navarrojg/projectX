import { Component, OnInit } from '@angular/core';
import { PetsService } from '../pets.service';
import { Pet } from '../pet.model';

@Component({
  selector: 'app-pets-list',
  templateUrl: './pets-list.component.html',
  styleUrls: ['./pets-list.component.css'],
})
export class PetsListComponent {
  pets: Pet[] = [
    { name: 'Max', sex: 'M', age: 12, breed: 'german shepard' },
    { name: 'Alex', sex: 'F', age: 5, breed: 'german shepard' },
    { name: 'Misty', sex: 'F', age: 2, breed: 'german shepard' },
  ];
}
