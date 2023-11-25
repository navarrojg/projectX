import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { AuthData } from './auth-data.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  BACKEND_URL = environment.apiUrl + '/user/signup';
  constructor(private http: HttpClient) {}

  createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http.post(this.BACKEND_URL, authData).subscribe((response) => {
      console.log(response);
    });
  }
}
