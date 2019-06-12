
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-signup-dialog',
  templateUrl: './signup-dialog.component.html',
  styleUrls: ['./signup-dialog.component.css']
})
export class SignupDialogComponent implements OnInit {
  signupForm: FormGroup;
  
  constructor(
    public dialogRef: MatDialogRef<SignupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder) { }

  
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.createForm();
  }
  
  createForm() {
    this.signupForm = this.fb.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required],
      Email: ['', [Validators.email, Validators.required]],
      ID: ['', Validators.required],
      Facebook: ['', Validators.required],
      Age: ['', Validators.required],
      Degree: ['', Validators.required],
      University: ['', Validators.required]
    });
  }

  onSubmit(){
    let user = this.getSignupData();
    localStorage.setItem('user', JSON.stringify(user));
    this.dialogRef.close(user);
  }

  getSignupData() : User{
    let signinFormModel = this.signupForm.value;
    let signinMember: User = {
      Username: signinFormModel.Username,
      Password: signinFormModel.Password,
      Age: signinFormModel.Age,
      Degree: signinFormModel.Degree,
      University: signinFormModel.University,
      Email: signinFormModel.Email,
      Facebook: signinFormModel.Facebook,
      ID: signinFormModel.ID,
      rates: []

    };
    return signinMember;
  }

  getEmailErrorMessage(){
    return this.signupForm.controls.Email.hasError('required') ? 'You must enter an email' : 
    this.signupForm.controls.Email.hasError('email') ? 'The email you entered is invalid' : '';
  }


  getUsernameErrorMessage(){
    return this.signupForm.controls.Username.hasError('required') ? 'You must enter a value' : '';
  }

  checkFormStatus(){
    return this.signupForm.status === "INVALID";
  }

  

}

export interface Rate {
  grade: number,
  comment: string
}

export interface User {
  Username: string,
  Password: string,
  ID: string,
  Email: string,
  Facebook: string,
  Age: number
  Degree: string
  University: string,
  rates: Rate[]
}