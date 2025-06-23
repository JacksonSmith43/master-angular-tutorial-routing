import { Routes } from "@angular/router";
import { TasksComponent } from "../tasks/tasks.component";
import { NewTaskComponent } from "../tasks/new-task/new-task.component";

export const routes: Routes = [
    {
        path: "", // This is the default path for the user tasks route, which will be used when the user navigates to <domain>/users/<u1>
        redirectTo: "tasks",
        pathMatch: "prefix"
    },
    {
        path: "tasks", // This path will be appended to the parent path, resulting in <domain>/users/<u1>/tasks
        component: TasksComponent,
    },
    {
        path: "tasks/new",
        component: NewTaskComponent
    }
]