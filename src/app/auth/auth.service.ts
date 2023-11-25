import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { AuthData } from './auth-data.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  BACKEND_URL_SIGNUP = environment.apiUrl + '/user/signup';
  BACKEND_URL_LOGIN = environment.apiUrl + '/user/login';
  constructor(private http: HttpClient) {}

  createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http.post(this.BACKEND_URL_SIGNUP, authData).subscribe((response) => {
      console.log(response);
    });
  }

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http.post(this.BACKEND_URL_LOGIN, authData).subscribe((response) => {
      console.log(response);
    });
  }
}
