import { Routes } from "@angular/router";

import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { resolveTitle, resolveUserName, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { routes as userRoutes } from "./users/users.routes";

export const routes: Routes = [
    {
        path: "", // This is the default path that will be used when the application loads. 
        component: NoTaskComponent,
        title: 'No task selected'
    },
    {
        path: "users/:userId", // URL: path: <domain>/users/<u1>
        component: UserTasksComponent,
        children: userRoutes, // This will load the user-specific routes defined in users.routes.ts. 
        data: {
            message: 'Hola.'
        },
        resolve: { // This ensures that the userName input property in UserTasksComponent is resolved before the component is loaded. 
            userName: resolveUserName
        },
        title: resolveTitle // This does not have to be within a resolve object, because it is not an asynchronous operation. One knows that one can do this because the resolve function does not return an observable or a promise, but a string.
    },
    {
        path: "**", // This is a wildcard path that will match any path that is not defined above. It is used to show a 404 page. 
        component: NotFoundComponent
    }
];