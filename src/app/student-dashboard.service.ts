import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StudentDashboardService {
  editStudent(selectedStudentId: string, updatedStudent: any) {
    throw new Error('Method not implemented.');
  }

  private apiUrl = 'http://localhost:3000/studentDetails';  // URL to your db.json file

  constructor(private http: HttpClient) { }

  // Method to get all students
  getStudents(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Method to get a student by ID
  getStudentById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Method to add a new student
  addStudent(student: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, student);
  }

  // Method to update a student by ID
  updateStudent(id: string, student: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, student);
  }

  // Method to delete a student by ID
  deleteStudent(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
