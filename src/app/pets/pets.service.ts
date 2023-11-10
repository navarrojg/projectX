import { Injectable } from '@angular/core';
import { Pet } from './pet.model';
import { Subject } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class PetsService {
  private pets: Pet[] = [
    { name: 'Max', sex: 'M', age: 12, breed: 'german shepard' },
    { name: 'Alex', sex: 'F', age: 5, breed: 'german shepard' },
    { name: 'Misty', sex: 'F', age: 2, breed: 'german shepard' },
  ];

  private petsUpdate = new Subject<Pet[]>();

  getPets() {
    return [...this.pets];
  }

  getPetUpdateListener() {
    return this.petsUpdate.asObservable();
  }

  addPet(name: string, sex: string, age: number, breed: string) {
    const pet: Pet = { name: name, sex: sex, age: age, breed: breed };
    this.pets.push(pet);
    this.petsUpdate.next([...this.pets]);
  }
}
