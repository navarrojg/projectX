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
              imagePath: pet.imagePath,
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
      .post<{ message: string; pet: Pet }>(BACKEND_URL, petData)
      .subscribe((resData) => {
        const pet: Pet = {
          id: resData.pet.id,
          name: name,
          sex: sex,
          age: age,
          breed: breed,
          imagePath: resData.pet.imagePath,
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
      imagePath: string;
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
    id: string,
    name: string,
    sex: string,
    age: any,
    breed: string,
    image: File | string
  ) {
    let petData: Pet | FormData;
    if (typeof image === 'object') {
      petData = new FormData();
      petData.append('id', id);
      petData.append('name', name);
      petData.append('sex', sex);
      petData.append('age', age);
      petData.append('breed', breed);
      petData.append('image', image, name);
    } else {
      petData = {
        id: id,
        name: name,
        sex: sex,
        age: age,
        breed: breed,
        imagePath: image,
      };
    }

    this.http.put(BACKEND_URL + id, petData).subscribe((response) => {
      console.log('-----------');
      console.log(response);
      console.log('-----------');
      const updatedPets = [...this.pets];
      const oldPetIndex = updatedPets.findIndex((p) => p.id === id);
      const pet: Pet = {
        id: id,
        name: name,
        sex: sex,
        age: age,
        breed: breed,
        imagePath: '',
      };
      updatedPets[oldPetIndex] = pet;
      this.pets = updatedPets;
      this.petsUpdate.next([...this.pets]);
    });
  }
}
