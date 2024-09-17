import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { Observable } from 'rxjs';
import { URL } from './../../api';
import { Snippet, User } from '../types';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private baseUrl = URL;

  constructor(private http: HttpClient) {}

  private userDataSource = new BehaviorSubject<any>(null);
  userData$ = this.userDataSource.asObservable();

  setUserData(data: User) {
    this.userDataSource.next(data);
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
    const url = `${this.baseUrl}/addUser`;
    const body = { name, username, password };
    return this.http.post(url, body, { responseType: 'text' });
  }

  addSnippet(
    title: string,
    language: string,
    content: string,
    userid: number
  ): Observable<Snippet> {
    const url = `${this.baseUrl}/addSnippet`;
    const body = { title, language, content, userid };
    return this.http.post<Snippet>(url, body);
  }

  removeSnippet(id: number): Observable<void> {
    const url = `${this.baseUrl}/snippets/${id}`;
    return this.http.delete<void>(url);
  }

  editSnippet(
    id: number,
    title: string,
    language: string,
    content: string
  ): Observable<Snippet> {
    const url = `${this.baseUrl}/snippets/${id}`;
    const body = { title, language, content };
    return this.http.put<Snippet>(url, body);
  }
}
