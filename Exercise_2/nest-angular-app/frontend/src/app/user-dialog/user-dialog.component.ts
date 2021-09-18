import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {

  action: string;
  source: any;
  userForm: FormGroup;
  dialogTitle: string;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService, 
    public matDialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.action = data.action;
      this.source = data.source;
    }

    onNoClick(): void {
      this.matDialogRef.close();
    }

    ngOnInit(): void {
      this.userForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required,Validators.email]],
        address: ['']
      })
      if(this.action == 'edit'){
      this.userForm.controls['email'].disable();
      }
    }
  

    createUser(f){
      if(this.source.some(user => user.email === f.email)){
        alert("user with given email already exists!");
        return;
      }
      this.apiService.createUser(f).subscribe((result)=>{
        this.matDialogRef.close();
      }); 
    }

    updateUser(f){
      this.apiService.updateUser(f).subscribe((result)=>{
        this.matDialogRef.close();
      });
      
    }

}
