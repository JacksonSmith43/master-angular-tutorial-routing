import { Routes } from "@angular/router";
import { TasksComponent } from "./tasks/tasks.component";

export const routes: Routes = [{
    path: "tasks", // This is is the path that will be used in the URL.
    component: TasksComponent,
}]