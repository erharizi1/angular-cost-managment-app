import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NewExpenseComponent } from './modalForms/new-expense/new-expense.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectCostComponent } from './components/project-cost/project-cost.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { NewProjectComponent } from './modalForms/new-project/new-project.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
    {
      path: 'project-list', component: ProjectListComponent,
    },
    {path: '', component: NewProjectComponent},
    {path: 'allexpenses/:id', component: ProjectCostComponent},
    {path: 'edit/:id', component: NewProjectComponent},
    {path: 'editexpense/:expid', component: NewExpenseComponent},
  ]
  },
 // {path: 'project-list', component: ProjectListComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
