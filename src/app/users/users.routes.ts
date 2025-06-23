import { Routes } from '@angular/router';

import { TasksComponent, resolveUserTasks } from '../tasks/tasks.component';
import { canLeaveEditGuard, NewTaskComponent } from '../tasks/new-task/new-task.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full',
    },
    {
        path: 'tasks', // <your-domain>/users/<uid>/tasks
        component: TasksComponent,
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