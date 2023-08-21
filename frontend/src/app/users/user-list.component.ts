import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { GroupService } from '../group/group.service';
import { DataService } from '../auth/data.service';
import { IGroup, IGroupMemberResponse } from './IUser.interface';
import { faHome, faSignOutAlt, faBell } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-list',
  template: `

    <header [ngStyle]="{'display':'flex','justify-content':'space-around'}">
          <h1> Welcome {{ this.dataService.state().fullname }} </h1>
          <a [routerLink]="['', 'users', 'group', 'requests']" 
            [ngStyle]="{color:'#fff'}"
          >
          <fa-icon [icon]="faBell"></fa-icon>
          
          <span [ngStyle]="{color: numberOfRequest>0 ? 'red':'#fff'}">({{ numberOfRequest }})</span>
        </a>
          
    </header>
  <div id="forms">

    <div id="page1">
      <div>
          <h4>Groups</h4>
          <ul *ngFor="let each of groups">
            <li>
              <a [routerLink]="['', 'users', 'group', each._id, each.title]">{{ each.title }}</a>
            </li>
         </ul>
      </div>

    <div>
        <button (click)="createGroup()" class="btn btn-primary">Create new group</button>
    </div>
  </div>
  `,
  styles: [],
})
export class UserListComponent {
  private router = inject(Router);
  private groupService = inject(GroupService);
  dataService = inject(DataService);

  groups: IGroup [] = []
  numberOfRequest: number = 0;
  requestsList: IGroup[]=[];

  faBell = faBell;

  createGroup() {
    this.router.navigate(['', 'users', 'group', 'creategroup'])

  }

  ngOnInit() {
    this.groupService.getGroup().subscribe(
      response => {
        if (response.success) {
          this.groups = response.data;
        }
      }
    )

    this.groupService.getPendingGroups().subscribe(
      response => {
        if (response.success) {
          this.requestsList = response.data;
          this.numberOfRequest = this.requestsList.length;
        }
      }
    );
  }

  request() {
    this.router.navigate(['', 'users', 'group', 'requests']);
  }
}
