import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private apiUrl = 'http://localhost:3000/users';  // URL to the db.json file

  constructor(private http: HttpClient) { }

  // Method to save user data
  addUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }
}
