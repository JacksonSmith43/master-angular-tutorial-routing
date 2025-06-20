import { Component, input, inject, computed, OnInit, DestroyRef } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})

export class UserTasksComponent implements OnInit {
  userName = "";
  private usersService = inject(UsersService);
  private activeRoute = inject(ActivatedRoute); // ActivatedRoute is used to access the route parameters. 
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    console.log(this.activeRoute);
    const subscription = this.activeRoute.paramMap.subscribe({ // This is a subscription to the paramMap observable of the ActivatedRoute which will emit whenever the route parameters change.
      next: paramMap => { // This will be called whenever the route parameters change meaning when the userId changes. 
        this.userName = this.usersService.users.find((u) => u.id === paramMap.get("userId"))?.name || ""; // We are using the userId from the route parameters to find the user in the users array and get the name of the user. If the user is not found, we set the userName to an empty string.
      }
    })
    this.destroyRef.onDestroy(() => subscription.unsubscribe())
  }
}
