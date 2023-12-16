import { Injectable } from '@angular/core';
import { Pet } from './pet.model';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';

const BACKEND_URL = environment.apiUrl + '/pets/';

@Injectable({ providedIn: 'root' })
export class PetsService {
  private pets: Pet[] = [];
  private petsUpdate = new Subject<{ pets: Pet[]; petsCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  getPets(petsPerPage: number, currentPage: number) {
    const queryParams = `?pageSize=${petsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; pets: any; maxPets: number }>(
        BACKEND_URL + queryParams
      )
      .pipe(
        map((petData) => {
          return {
            pets: petData.pets.map((pet) => {
              return {
                name: pet.name,
                sex: pet.sex,
                age: pet.age,
                breed: pet.breed,
                id: pet._id,
                imagePath: pet.imagePath,
                creator: pet.creator,
                comments: pet.comments,
                likes: pet.likes,
              };
            }),
            maxPets: petData.maxPets,
          };
        })
      )
      .subscribe((transformedPetsData) => {
        this.pets = transformedPetsData.pets;
        this.petsUpdate.next({
          pets: [...this.pets],
          petsCount: transformedPetsData.maxPets,
        });
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
        // const pet: Pet = {
        //   id: resData.pet.id,
        //   name: name,
        //   sex: sex,
        //   age: age,
        //   breed: breed,
        //   imagePath: resData.pet.imagePath,
        // };
        // console.log(resData.message);
        // this.pets.push(pet);
        // this.petsUpdate.next([...this.pets]);
        this.router.navigate(['/']);
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
      creator: string;
      comments: string[];
      likes: number;
    }>(BACKEND_URL + id);
  }

  deletePet(petId: string) {
    this.http.delete(BACKEND_URL + petId).subscribe(() => {
      // const updatedPets = this.pets.filter((pet) => pet.id !== petId);
      // this.pets = updatedPets;
      // this.petsUpdate.next([...this.pets]);
      console.log('Pet deleted!');
      this.router.navigate(['/']);
    });
  }

  updatePet(
    id: string,
    name: string,
    sex: string,
    age: any,
    breed: string,
    image: File | string,
    comments: string[],
    likes: number
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
        creator: null,
        comments: comments ? comments : null,
        likes: likes ? likes : null,
      };
    }

    this.http.put(BACKEND_URL + id, petData).subscribe(() => {
      // const updatedPets = [...this.pets];
      // const oldPetIndex = updatedPets.findIndex((p) => p.id === id);
      // const pet: Pet = {
      //   id: id,
      //   name: name,
      //   sex: sex,
      //   age: age,
      //   breed: breed,
      //   imagePath: '',
      // };
      // updatedPets[oldPetIndex] = pet;
      // this.pets = updatedPets;
      // this.petsUpdate.next([...this.pets]);
      this.router.navigate(['/']);
    });
  }

  addComment(petid: string, comment: string) {
    return this.http.post(BACKEND_URL + petid + '/' + 'comments', { comment });
  }

  giveLike(petid: string) {
    this.http.post(BACKEND_URL + petid + '/likes', {}).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
