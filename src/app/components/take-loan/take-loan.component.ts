import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-take-loan',
  templateUrl: './take-loan.component.html',
  styleUrls: ['./take-loan.component.css']
})
export class TakeLoanComponent implements OnInit {

  about: string;
  constructor(public dialogRef: MatDialogRef<TakeLoanComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

  }

  createForm() {
    
  }
  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onSubmit(){
    this.dialogRef.close(true);
  }

}
