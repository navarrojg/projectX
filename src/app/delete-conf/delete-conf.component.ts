import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PetsService } from '../pets/pets.service';
import { Pet } from '../pets/pet.model';

@Component({
  selector: 'app-delete-conf',
  templateUrl: './delete-conf.component.html',
})
export class DeleteConf implements OnInit {
  petId: string;
  pet: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private petService: PetsService
  ) {}

  ngOnInit() {
    this.petId = this.data.id;
    this.pet = this.petService.getPet1(this.petId);
  }

  onDetelePet() {
    this.petService.deletePet(this.petId);
  }
}
