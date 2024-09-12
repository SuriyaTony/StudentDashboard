import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:3000/users';  // URL to the db.json file

  constructor(private http: HttpClient) { }

  // Method to get all users from db.json
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Method to verify login credentials
  loginUser(email: string, password: string): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => users.find(user => user.email === email && user.password === password))
    );
  }
}
