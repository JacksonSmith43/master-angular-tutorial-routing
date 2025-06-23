import { Component, input, inject, computed, OnInit, DestroyRef, signal } from '@angular/core';

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
  order = signal<'asc' | 'desc'>('desc');

  userTasks = computed(() => this.tasksService.allTasks()
    .filter((task) => task.userId === this.userId()) // Filters tasks by userId. computed is used to automatically update when userId changes. 
    .sort((a, b) => { // Sorts tasks by id in ascending or descending order based on the order signal.
      if (this.order() === 'desc') {
        return a.id > b.id ? -1 : 1; // If order is 'desc', sort in descending order. -1 means a comes before b, 1 means b comes before a.

      } else {
        return a.id > b.id ? 1 : -1;
      }
    })
  );

  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const subscription = this.activatedRoute.queryParams.subscribe({ // This is a subscription to the queryParams observable of the ActivatedRoute which will emit whenever the query parameters change.
      next: params => (this.order.set(params['order'])), // params['order'] will contain the current order query parameter value which will be saved in the order input property. 
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
