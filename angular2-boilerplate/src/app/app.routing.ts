import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UserComponent } from './users/user.component';

const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UserComponent }
]

export const routing = RouterModule.forRoot(ROUTES);
