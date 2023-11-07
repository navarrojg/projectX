import { Pet } from './pet.model';

export class PetsService {
  private list0fPets: Pet[] = [
    { name: 'Max', sex: 'M', age: 12, breed: 'german shepard' },
    { name: 'Alex', sex: 'F', age: 5, breed: 'german shepard' },
    { name: 'Misty', sex: 'F', age: 2, breed: 'german shepard' },
  ];
  getPets() {
    return this.list0fPets;
  }
}
