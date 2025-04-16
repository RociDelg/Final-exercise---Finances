import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Create empty components for routing
class EmptyComponent {}

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: EmptyComponent },
  { path: 'tools', component: EmptyComponent },
  { path: 'auth', component: EmptyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
