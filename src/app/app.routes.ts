import { CanMatchFn, RedirectCommand, Router, Routes } from "@angular/router";

import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { resolveTitle, resolveUserName, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { inject } from "@angular/core";

const dummyCanMatch: CanMatchFn = (route, segments) => { // With this function, we can control whether the route can be activated or not. It is a synchronous function that returns true or false, or a RedirectCommand to redirect the user to another route.
    const shouldGetAccesss = Math.random();
    const router = inject(Router); // We inject the Router service to be able to redirect the user if they do not have access to the route.
    if (shouldGetAccesss < 1) {
        return true;
    }
    return new RedirectCommand(router.parseUrl("/unauthorised")); // This will redirect the user to the /unauthorised route if they do not have access to the route.
}

export const routes: Routes = [
    {
        path: "", // This is the default path that will be used when the application loads. 
        component: NoTaskComponent,
        title: 'No task selected'
    },
    {
        path: "users/:userId", // URL: path: <domain>/users/<u1>
        component: UserTasksComponent,
        loadChildren: () => import("./users/users.routes").then(mod => mod.routes), // Lazy loading. 
        canMatch: [dummyCanMatch], // This will check if the user has access to the route before loading the component. If the user does not have access, they will be redirected to the /unauthorised route. canMatch is a synchronous guard that can be used to control whether the route can be activated or not. 
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