import { Component, input, inject, OnInit, DestroyRef } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterOutlet, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})

export class UserTasksComponent {
  userName = input.required<string>();
  message = input.required<string>();
}


export const resolveUserName: ResolveFn<string> = (activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) => {
  const usersService = inject(UsersService);
  const userName = usersService.users.find((u) => u.id === activatedRoute.paramMap.get("userId"))?.name || "";
  return userName;
}

export const resolveTitle: ResolveFn<string> = (activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) => { // The first parameter is the ActivatedRouteSnapshot, which contains the information about the route that is being activated. The second parameter is the RouterStateSnapshot, which contains the information about the state of the router at the time of activation.
  return resolveUserName(activatedRoute, routerState) + '\'s Tasks' // This will return the title for the user tasks page.
}