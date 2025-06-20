import { Routes } from "@angular/router";
import { TasksComponent } from "./tasks/tasks.component";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";

export const routes: Routes = [
    {
        path: "", // This is the default path that will be used when the application loads. 
        component: NoTaskComponent
    },
    {
        path: "tasks", // This is is the path that will be used in the URL.
        component: TasksComponent,
    }
]