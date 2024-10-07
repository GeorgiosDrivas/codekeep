import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { URL } from '../../../api';
import { User } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = URL;
  userData: User | null = null;
  constructor(private http: HttpClient) {}

  private userDataSource = new BehaviorSubject<User | null>(null);
  userData$ = this.userDataSource.asObservable();

  setUserData(data: User) {
    this.userDataSource.next(data);
    this.userData = data;
  }

  login(username: string, password: string): Observable<User> {
    const url = `${this.baseUrl}/login`;
    const body = { username, password };
    return this.http.post<User>(url, body);
  }

  signUp(name: string, username: string, password: string): Observable<string> {
    const url = `${this.baseUrl}/users/add-user`;
    const body = { name, username, password };
    return this.http.post(url, body, { responseType: 'text' });
  }

  editUser(
    id: number,
    name: string,
    username: string,
    password: string
  ): Observable<User> {
    const url = `${this.baseUrl}/users/update/${id}`;
    const body: User = {
      id: this.userData!.id,
      name: name,
      username: username,
      password: password,
    };
    // console.log('Payload being sent to server:', body);
    return this.http.put<User>(url, body);
  }
}
