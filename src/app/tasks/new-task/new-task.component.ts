import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TasksService } from '../tasks.service';
import { CanDeactivateFn, Router } from '@angular/router';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})

export class NewTaskComponent {
  userId = input.required<string>();
  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDate = signal('');
  submitted = false;
  private tasksService = inject(TasksService);
  private router = inject(Router);

  onSubmit() {
    this.tasksService.addTask(
      {
        title: this.enteredTitle(),
        summary: this.enteredSummary(),
        date: this.enteredDate(),
      },
      this.userId()
    );
    this.submitted = true;

    this.router.navigate(["/users", this.userId(), "tasks"], { // This is used to navigate to the tasks page of the user after adding a new task.
      replaceUrl: true, // replaceUrl is used to prevent the user from going back to the new task page using the back button.
    });
  }
}

export const canLeaveEditGuard: CanDeactivateFn<NewTaskComponent> = (component) => {
  if (component.submitted) {
    return true;
  }

  if (component.enteredTitle() || component.enteredDate() || component.enteredSummary()) {
    return window.confirm("Do you wish to leave the page. Entered data will be lost.");
  }
  return true;
}
