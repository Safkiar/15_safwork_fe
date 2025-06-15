import { Component, output }                            from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule }                           from '@angular/material/form-field';
import { MatInputModule }                               from '@angular/material/input';
import { MatButtonModule }                              from '@angular/material/button';

import { NewJob }                                       from '../../services/job.service';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-job-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,  
    MatInputModule,    
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './job-form.html',
  styleUrls: ['./job-form.scss']
})
export class JobForm {

  constructor(private snackBar: MatSnackBar) {}

  jobCreated = output<NewJob>();
    showForm = false;
  initialState = false;

    toggleForm() {
    this.initialState = true;
    this.showForm = !this.showForm;
  }


  form = new FormGroup({
    title:    new FormControl<string>('', { nonNullable: true,  validators: [
          Validators.required,
          Validators.maxLength(21)      
        ] }),
    company:  new FormControl<string>('', { nonNullable: true,  validators: [
          Validators.required,
          Validators.maxLength(21)      
        ]  }),
    location: new FormControl<string>('', { nonNullable: true,  validators: [
          Validators.required,
          Validators.maxLength(21)      
        ]  }),
  });

  onSubmit() {
    if (this.form.valid) {
      const newJob = this.form.getRawValue() as NewJob;
      this.jobCreated.emit(newJob);
        this.snackBar.open('Oferta została dodana 🎉', 'Zamknij', {
        duration: 3000,
      });
      this.form.reset();
    } else {
      this.form.markAllAsTouched();
    }
  }
}