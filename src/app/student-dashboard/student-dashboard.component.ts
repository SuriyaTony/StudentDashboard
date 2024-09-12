import { Component, OnInit } from '@angular/core';
import { StudentDashboardService } from '../student-dashboard.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  students: any[] = [];
  editMode: { [key: number]: boolean } = {}; // Object to track edit mode for each student by ID

  constructor(private studentDashService: StudentDashboardService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentDashService.getStudents().subscribe(data => {
      this.students = data;
      this.students.forEach(student => {
        this.editMode[student.id] = false; // Initialize edit mode to false for each student
      });
    });
  }

  // Enable editing mode for the specific student
  editStudent(studentId: number): void {
    this.editMode[studentId] = true; // Set edit mode to true for the selected student
  }

  // Save the updated student data
  saveEditedStudent(student: any): void {
    this.studentDashService.updateStudent(student.id, student).subscribe(() => {
      console.log('Student updated successfully');
      this.editMode[student.id] = false; // Disable edit mode after saving changes
    });
  }

  // Cancel editing and revert changes
  cancelEdit(studentId: number): void {
    this.editMode[studentId] = false; // Set edit mode back to false
    this.loadStudents(); // Reload the student data to undo any changes
  }

  // Delete student
  deleteStudent(id: string): void {
    this.studentDashService.deleteStudent(id).subscribe(() => {
      this.loadStudents();
    });
  }
}
