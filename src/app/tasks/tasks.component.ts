import { Component, input, inject, computed, OnInit, DestroyRef } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { TasksService } from './tasks.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})

export class TasksComponent implements OnInit {
  private tasksService = inject(TasksService);
  userId = input.required<string>();
  order?: 'asc' | 'desc';

  userTasks = computed(() => this.tasksService.allTasks().filter((task) => task.userId === this.userId())); // Filters tasks by userId. computed is used to automatically update when userId changes. 

  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const subscription = this.activatedRoute.queryParams.subscribe({ // This is a subscription to the queryParams observable of the ActivatedRoute which will emit whenever the query parameters change.
      next: params => (this.order = params['order']), // params['order'] will contain the current order query parameter value which will be saved in the order input property. 
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
