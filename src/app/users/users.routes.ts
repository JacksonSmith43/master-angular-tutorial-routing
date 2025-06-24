import { ResolveFn, Routes } from '@angular/router';
import { inject } from '@angular/core';

import { canLeaveEditGuard, NewTaskComponent } from '../tasks/new-task/new-task.component';
import { Task } from '../tasks/task/task.model';
import { TasksService } from '../tasks/tasks.service';


const resolveUserTasks: ResolveFn<Task[]> = (activatedRouteSnapshot, routerState) => {

    const order = activatedRouteSnapshot.queryParams['order'];
    const tasksService = inject(TasksService);

    const tasks = tasksService
        .allTasks()
        .filter(
            (task) => task.userId === activatedRouteSnapshot.paramMap.get('userId')
        );

    if (order && order === 'asc') {
        tasks.sort((a, b) => (a.id > b.id ? 1 : -1));

    } else {
        tasks.sort((a, b) => (a.id > b.id ? -1 : 1));
    }

    return tasks.length ? tasks : [];
};


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full',
    },
    {
        path: 'tasks', // <your-domain>/users/<uid>/tasks
        loadComponent: () => import("../tasks/tasks.component").then(mod => mod.TasksComponent),
        runGuardsAndResolvers: "always", // This ensures that the component is reloaded when the query parameters change. Otherwise, the component would not be reloaded when the query parameters change and only when the route parameters change. Route parameters are the parameters defined in the path, such as userId in users/:userId. Query parameters are the parameters defined in the URL after the question mark, such as ?order=asc. 
        resolve: {
            userTasks: resolveUserTasks,
        },
    },
    {
        path: 'tasks/new',
        component: NewTaskComponent,
        canDeactivate: [canLeaveEditGuard]
    },
];