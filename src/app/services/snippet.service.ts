import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from '../../../api';
import { Snippet } from '../../types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SnippetService {
  private baseUrl = URL;

  constructor(private http: HttpClient) {}

  getSnippets(userId: number): Observable<any> {
    const url = `${this.baseUrl}/snippets/all/${userId}`;
    return this.http.get<any>(url);
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
}
