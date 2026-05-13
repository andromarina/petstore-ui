import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { forkJoin, Observable, of } from 'rxjs';
import { PetstoreApiUser } from '../models/user';


@Injectable({
  providedIn: 'root',
})

export class UserServiceTs {
  private httpClient: HttpClient = inject(HttpClient);
  private readonly apiUrl = environment.apiBaseUrl + '/user';

  getUsersByUserNames(usernames: string[]): Observable<PetstoreApiUser[]> {
    if(usernames.length === 0) {
      return of([]);
    }
    const userUrls = usernames.map(username => this.getUserByName(username));
    return forkJoin(userUrls); 
  }

  getUserByName(username: string): Observable<PetstoreApiUser> {
    const userUrl =  this.apiUrl + `/${encodeURIComponent(username)}`;
    return this.httpClient.get<PetstoreApiUser>(userUrl);
  }
}
