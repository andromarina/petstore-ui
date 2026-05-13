import { Component, EventEmitter, inject, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, take } from 'rxjs';
import { UserServiceTs } from '../../services/user.service.ts';
import { PetstoreApiUser } from '../../models/user';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.html',
  styleUrl: './users-list.scss',
  imports: [AsyncPipe]
})
export class UsersList implements OnDestroy {
  protected users: PetstoreApiUser[] =[];

  protected readonly userNames: string[] = ['johndoe', 'alice.moss', 'bob.kane', 'carol.smith', 'dave.lee'];
  protected readonly router = inject(Router);
  protected readonly route = inject(ActivatedRoute);
  protected readonly userService = inject(UserServiceTs);
  protected selectedUserId: number | null = null;
  users$: Observable<PetstoreApiUser[]> = this.userService.getUsersByUserNames(this.userNames);
  protected routeSub$: Subscription;
  @Output() userSelected = new EventEmitter<void>();

  constructor() {
    this.routeSub$ = this.route.queryParams.subscribe(params => {
      const userId = params['id'];
      console.log('Query param id:', userId);
      if (userId) {        
          this.selectedUserId = +userId;
      }
    });
  }
  ngOnDestroy(): void {
    this.routeSub$.unsubscribe();
  }

  createUser() {
      console.log('Create User button clicked');
      this.userSelected.emit(); 
  }
  onRowClick(user: PetstoreApiUser) { 
    this.selectedUserId = user.id;
    this.router.navigate([], { 
      relativeTo: this.route, 
      queryParams: { id: user.id },
      queryParamsHandling: 'merge'});    
  }

}
