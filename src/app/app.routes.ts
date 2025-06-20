import { Routes } from "@angular/router";

import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { TasksComponent } from "./tasks/tasks.component";
import { NewTaskComponent } from "./tasks/new-task/new-task.component";
import { NotFoundComponent } from "./not-found/not-found.component";

export const routes: Routes = [
    {
        path: "", // This is the default path that will be used when the application loads. 
        component: NoTaskComponent
    },
    {
        path: "users/:userId", // URL: path: <domain>/users/<u1>
        component: UserTasksComponent,
        children: [
            {
                path: "tasks", // This path will be appended to the parent path, resulting in <domain>/users/<u1>/tasks
                component: TasksComponent
            },
            {
                path: "tasks/new",
                component: NewTaskComponent
            }
        ]
    },
    {
        path: "**", // This is a wildcard path that will match any path that is not defined above. It is used to show a 404 page. 
        component: NotFoundComponent
    }
]