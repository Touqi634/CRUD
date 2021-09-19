import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from  './user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_SERVER = "http://localhost:3000";

  public readUsers(){
    return this.httpClient.get<User[]>(`${this.API_SERVER}/users`);
  }

  public createUser(user: User){
    return this.httpClient.post<User>(`${this.API_SERVER}/users`, user);
  }

  public updateUser(user: User){
    return this.httpClient.put<User>(`${this.API_SERVER}/users/${user.id}/`, user);
  }

  public deleteUser(userId: string){
    return this.httpClient.delete(`${this.API_SERVER}/users/${userId}/`);
  }

  constructor(private httpClient: HttpClient) { }  
}