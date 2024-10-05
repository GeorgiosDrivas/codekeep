import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { URL } from './../../api';
import { Snippet, User } from '../types';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
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

  getSnippets(userId: number): Observable<any> {
    const url = `${this.baseUrl}/snippets/all/${userId}`;
    return this.http.get<any>(url);
  }

  signUp(name: string, username: string, password: string): Observable<string> {
    const url = `${this.baseUrl}/users/add-user`;
    const body = { name, username, password };
    return this.http.post(url, body, { responseType: 'text' });
  }

  addSnippet(
    title: string,
    language: string,
    content: string,
    userid: number
  ): Observable<Snippet> {
    const url = `${this.baseUrl}/snippets/add-snippet`;
    const body = { title, language, content, userid };
    return this.http.post<Snippet>(url, body);
  }

  removeSnippet(id: number): Observable<void> {
    const url = `${this.baseUrl}/snippets/delete/${id}`;
    return this.http.delete<void>(url);
  }

  editSnippet(
    id: number,
    title: string,
    language: string,
    content: string
  ): Observable<Snippet> {
    const url = `${this.baseUrl}/snippets/update/${id}`;
    const body = { title, language, content };
    return this.http.put<Snippet>(url, body);
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
    console.log('Payload being sent to server:', body); // Debug log
    return this.http.put<User>(url, body);
  }
}
