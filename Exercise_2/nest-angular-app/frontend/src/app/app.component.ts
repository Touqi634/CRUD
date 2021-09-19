import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { ApiService } from './api.service';
import { User } from './user';
// export interface User {
//   id: number;
//   name: string;
//   address: string;
//   email: string;
// }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name: string;
  address: string;
  email: string;

  constructor(public dialog: MatDialog, private apiService: ApiService) {}
  title = 'frontend';
  displayedColumns: string[] = ['email', 'name', 'address' ,'btnActions'];
  dataSource = [];
  user = {}

  refreshUsers(){
    this.apiService.readUsers().subscribe((result)=>{   
      this.dataSource  =  result;
     })
  }

  ngOnInit() {
    this.refreshUsers();
  }

  selectUser(user){
    this.user = user;
  }

  editUser(user){
    const dialogRef = this.dialog.open(UserDialogComponent, {
      panelClass: 'EditUser-form',
      width: '380px',
      data      : {
        id: user._id,
        name: user.name,
        address: user.address,
        email: user.email,
        action: 'edit',
        source: this.dataSource
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refreshUsers();
    });
    
  }

  newUser(){
    this.user = {};
  }

  createUser(f){
    this.apiService.createUser(f.value).subscribe((result)=>{
    });
    
  }

  deleteUser(id){
    this.apiService.deleteUser(id).subscribe((result)=>{
      this.refreshUsers();
    });
  }

  addUser() {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      panelClass: 'AddUser-form',
      width: '380px',
      data      : {
        name: this.name,
        address: this.address,
        email: this.email,
        action: 'create',
        source: this.dataSource
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refreshUsers();
    });
  }
}

