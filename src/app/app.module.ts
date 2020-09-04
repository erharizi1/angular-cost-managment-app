import { PageProject } from './class/page-project';
import { ProjectService } from './service/project.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NewProjectComponent } from './modalForms/new-project/new-project.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectCostComponent } from './components/project-cost/project-cost.component';
import { NewExpenseComponent } from './modalForms/new-expense/new-expense.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { authInterceptorProviders } from '../helpers/auth.interceptor';
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    NewProjectComponent,
    ProjectListComponent,
    ProjectCostComponent,
    NewExpenseComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
