import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';
import { CreateUserRequest, PetstoreApiUser, UpdateUserRequest } from '../models/user';

export type UserSearchParams = {
  email?: string;
  firstName?: string;
  lastName?: string;
};

@Injectable({
  providedIn: 'root',
})

export class UserServiceTs {
  private httpClient: HttpClient = inject(HttpClient);
  private readonly apiUrl = environment.apiBaseUrl;

  public getUsers(): Observable<PetstoreApiUser[]> {
    return this.httpClient.get<PetstoreApiUser[]>(`${this.apiUrl}/users`);
  }

  public searchUsers(criteria: UserSearchParams): Observable<PetstoreApiUser[]> {
    let params = new HttpParams();

    if (criteria.email) {
      params = params.set('email', criteria.email);
    }
    if (criteria.firstName) {
      params = params.set('firstName', criteria.firstName);
    }
    if (criteria.lastName) {
      params = params.set('lastName', criteria.lastName);
    }

    return this.httpClient.get<PetstoreApiUser[]>(`${this.apiUrl}/users/search`, { params });
  }

  public createUser(request: CreateUserRequest): Observable<PetstoreApiUser> {
    return this.httpClient.post<PetstoreApiUser>(`${this.apiUrl}/users`, request);
  }

  public updateUser(id: number, request: UpdateUserRequest): Observable<PetstoreApiUser> {
    return this.httpClient.put<PetstoreApiUser>(`${this.apiUrl}/users/${id}`, request);
  }

  public deleteUser(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/users/${id}`);
  }
}
