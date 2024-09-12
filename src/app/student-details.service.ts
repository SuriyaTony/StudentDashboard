import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentDetailsService {

  

  private apiUrl = 'http://localhost:3000/studentDetails';  // URL to the db.json file

  constructor(private http: HttpClient) { }

  // Method to add a user to db.json
  addUser(user: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(this.apiUrl, user, { headers });
  }
}
