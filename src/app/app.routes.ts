import { Routes } from "@angular/router";

import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { UserTasksComponent } from "./users/user-tasks/user-tasks.component";

export const routes: Routes = [
    {
        path: "", // This is the default path that will be used when the application loads. 
        component: NoTaskComponent
    },
    {
        path: "users/:userId", // URL: path: <domain>/users/<u1>
        component: UserTasksComponent,
    }
]