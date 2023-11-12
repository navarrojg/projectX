import { Injectable } from '@angular/core';
import { Pet } from './pet.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PetsService {
  private pets: Pet[] = [
    // { name: 'Max', sex: 'M', age: 12, breed: 'german shepard' },
    // { name: 'Alex', sex: 'F', age: 5, breed: 'german shepard' },
    // { name: 'Misty', sex: 'F', age: 2, breed: 'german shepard' },
  ];
  private petsUpdate = new Subject<Pet[]>();

  constructor(private http: HttpClient) {}

  getPets() {
    // return [...this.pets];
    this.http
      .get<{ message: string; pets: Pet[] }>('http://localhost:3000/api/pets')
      .subscribe((petData) => {
        this.pets = petData.pets;
        this.petsUpdate.next([...this.pets]);
      });
  }

  getPetUpdateListener() {
    return this.petsUpdate.asObservable();
  }

  addPet(name: string, sex: string, age: number, breed: string) {
    const pet: Pet = { id: null, name: name, sex: sex, age: age, breed: breed };
    this.http
      .post<{ message: string }>('http://localhost:3000/api/pets', pet)
      .subscribe((resData) => {
        console.log(resData.message);
        this.pets.push(pet);
        this.petsUpdate.next([...this.pets]);
        console.log(this.pets);
      });
  }
}
