import { Routes } from "@angular/router";

import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { routes as userRoutes } from "./users/users.routes";

export const routes: Routes = [
    {
        path: "", // This is the default path that will be used when the application loads. 
        component: NoTaskComponent
    },
    {
        path: "users/:userId", // URL: path: <domain>/users/<u1>
        component: UserTasksComponent,
        children: userRoutes, // This will load the user-specific routes defined in users.routes.ts. 
    },
    {
        path: "**", // This is a wildcard path that will match any path that is not defined above. It is used to show a 404 page. 
        component: NotFoundComponent
    }
];