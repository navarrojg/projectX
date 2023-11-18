import { Injectable } from '@angular/core';
import { Pet } from './pet.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';

const BACKEND_URL = environment.apiUrl + '/pets/';

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
      .get<{ message: string; pets: any }>(BACKEND_URL)
      .pipe(
        map((petData) => {
          return petData.pets.map((pet) => {
            return {
              name: pet.name,
              sex: pet.sex,
              age: pet.age,
              breed: pet.breed,
              id: pet._id,
            };
          });
        })
      )
      .subscribe((transformedPets) => {
        this.pets = transformedPets;
        this.petsUpdate.next([...this.pets]);
      });
  }

  getPetUpdateListener() {
    return this.petsUpdate.asObservable();
  }

  addPet(name: string, sex: string, age: any, breed: string, image: File) {
    // const pet: Pet = { id: null, name: name, sex: sex, age: age, breed: breed };
    const petData = new FormData();
    petData.append('name', name);
    petData.append('sex', sex);
    petData.append('age', age);
    petData.append('breed', breed);
    petData.append('image', image, name);

    this.http
      .post<{ message: string; petId: string }>(BACKEND_URL, petData)
      .subscribe((resData) => {
        const pet: Pet = {
          id: resData.petId,
          name: name,
          sex: sex,
          age: age,
          breed: breed,
        };
        console.log(resData.message);
        this.pets.push(pet);
        this.petsUpdate.next([...this.pets]);
      });
  }

  getPet1(id: string) {
    // return this.pets[index];
    return { ...this.pets.find((p) => p.id === id) };
  }

  getPet(id: string) {
    return this.http.get<{
      _id: string;
      name: string;
      sex: string;
      age: number;
      breed: string;
    }>(BACKEND_URL + id);
  }

  deletePet(petId: string) {
    this.http.delete(BACKEND_URL + petId).subscribe(() => {
      const updatedPets = this.pets.filter((pet) => pet.id !== petId);
      this.pets = updatedPets;
      this.petsUpdate.next([...this.pets]);
      console.log('Pet deleted!');
    });
  }

  updatePet(
    petId: string,
    name: string,
    sex: string,
    age: number,
    breed: string
  ) {
    const pet: Pet = {
      id: petId,
      name: name,
      sex: sex,
      age: age,
      breed: breed,
    };
    this.http.put(BACKEND_URL + petId, pet).subscribe((response) => {
      const updatedPets = [...this.pets];
      const oldPetIndex = updatedPets.findIndex((p) => p.id === pet.id);
      updatedPets[oldPetIndex] = pet;
      this.pets = updatedPets;
      this.petsUpdate.next([...this.pets]);
    });
  }
}
