import { Component, OnInit } from '@angular/core';
import { Pet } from '../pet.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PetsService } from '../pets.service';

@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.css'],
})
export class PetDetailsComponent implements OnInit {
  pet: Pet;
  id: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private petService: PetsService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.pet = this.petService.getPet(this.id);
      console.log(this.id);
      console.log(this.pet);
      console.log(this.pet.name);
    });
  }
}
