import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentDetailsService } from '../student-details.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css',
  providers: [DatePipe]
})
export class StudentDetailsComponent{
  
  studentDetailsForm!: FormGroup;
  formattedDob!: string;

  constructor(private fb: FormBuilder, private studentService: StudentDetailsService,private datePipe: DatePipe,
    private router : Router
  ) {
    this.studentDetailsForm = this.fb.group({
      
      name: ['', Validators.required],
      age: ['', Validators.required],
      section: ['', Validators.required],
      
      dob: ['', [Validators.required, this.dateValidator]]
      ,
      gender: ['', Validators.required]
    });
  }
  dateValidator(control: any) {
    const value = control.value;
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d\d$/;
    return regex.test(value) ? null : { invalidDate: true };
  }
  onDateBlur() {
    const dobValue = this.studentDetailsForm.get('dob')?.value;
    if (dobValue) {
      // Parse the date string and format it to 'DD/MM/YYYY'
      const parts = dobValue.split('/');
      if (parts.length === 3) {
        const day = parts[0].padStart(2, '0');
        const month = parts[1].padStart(2, '0');
        const year = parts[2];
        const date = new Date(`${year}-${month}-${day}`);
        const formattedDate = `${day}/${month}/${year}`;
        this.studentDetailsForm.get('dob')?.setValue(formattedDate, { emitEvent: false });
      }
    }
  }
  onDateInput(event: any) {
    const input = event.target.value;
    // Optionally add validation for correct date format
    if (input.length === 10 && /^\d{2}\/\d{2}\/\d{4}$/.test(input)) {
      const parts = input.split('/');
      const day = parts[0].padStart(2, '0');
      const month = parts[1].padStart(2, '0');
      const year = parts[2];
      const date = new Date(`${year}-${month}-${day}`);
      // if (date && !isNaN(date.getTime())) {
      //   // Optional: Set formatted date if needed
      // }
    }
  }

  onSave() {
    if (this.studentDetailsForm.valid) {
      this.studentService.addUser(this.studentDetailsForm.value).subscribe({
        next: (response) => {
          alert('User saved successfully');
          this.router.navigate(['studentDashboard']);
          this.studentDetailsForm.reset();
        },
        error: (err) => {
         alert("Enter the student Details");
        }
      });
    }
  } 

}
