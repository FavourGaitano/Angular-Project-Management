import { Injectable } from '@angular/core';
import {registerDetails} from '../interfaces/register.interfaces';
import {loginDetails} from '../interfaces/login.interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http:HttpClient) { }

  registerUser(user_details:registerDetails ){
    return this.http.post<{message:string, error:string}>('http://localhost:4001/users', user_details)
  }

  loginUser(user_details:loginDetails ){
    return this.http.post<{message:string, token:string, error:string}>('http://localhost:4001/auth', user_details)
  }


  // token: string = JSON.parse(localStorage.getItem('authToken') as string);


  readToken(callback: (response: any) => void, errorCallback: (error: any) => void){

    const token = localStorage.getItem('authToken');

    if (!token) {
      errorCallback('No token found in local storage.');
      return;
    }


    console.log(token)
    this.http.get<{info:{id:string, email: string, role:string}}>('http://localhost:4001/auth/checkdetails', {
      headers: new HttpHeaders( {
        'Content-type': 'application/json',
       token

      })
    }).subscribe(res=>callback(res))
  }
}
