import { PageProject } from './../class/page-project';
import { Expenses } from './../class/expenses';
import { Injectable } from '@angular/core';
import {HttpClientModule, HttpClient, HttpParams, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { Project } from '../class/project';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private notify = new Subject<any>();
  notifyObservable$ = this.notify.asObservable();

  private baseUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) { }

  public notifyOther(data: any): void {
    if (data) {
      this.notify.next(data);
    }
  }

  // tslint:disable-next-line:ban-types
  createProject(project: Project): Observable<Project> {
    console.log(project);
    return this.http.post<Project>('http://localhost:8080/api/newproject', project).pipe(
      map(response => response ));
  }

  updateProject(id: number , value: any): Observable<Project>
  {
    console.log(value);
    return this.http.put<Project>(`http://localhost:8080/api/updateproject/${id}` , value).pipe(
      catchError(this.errorHandler));
  }

  getProjectbyId(id: number): Observable<Project>{
    return this.http.get<Project>(`http://localhost:8080/api/project/${id}`);
  }

  getExpensesbyId(id: number): Observable<Expenses>{
    console.log(id);
    return this.http.get<Expenses>(`http://localhost:8080/api/expenses/${id}`);
  }



  getProjectList(): Observable<Project[]> {
    return this.http.get<Project[]>('http://localhost:8080/api/allprojects').pipe(
      map(response => response )
    );
  }

  getProjectListByName(value: any): Observable<Project[]> {
    let url = 'http://localhost:8080/api/project/name?name=';
    url = url + value;
    return this.http.get<Project[]>(url).pipe(
      map(response => response )
    );
  }

  getPageProject(page: number): Observable<PageProject>{
    let url = 'http://localhost:8080/api/projects/get?page=';
    url = url + page + '&size=3';
    console.log(url);
    return this.http.get<PageProject>(url)
    .pipe(
      map(response => {
        const data = response;
        console.log(data.content);
        return data ;
      }));
  }

  getPageProjectByName(name: string, page: number): Observable<PageProject>{
    let url = 'http://localhost:8080/api/project/name?name=';
    url = url + name + '&page=' +  page + '&size=3';
    console.log(url);
    return this.http.get<PageProject>(url)
    .pipe(
      catchError(this.errorHandler));
  }

  
  // getPageProjectByName(name: string): Observable<any>{
  //   let url = 'http://localhost:8080/api/projects/name?name=';
  //   url = url + name ;
  //   // + '&page=' +  page + '&size=3';
  //   console.log(url);
  //   return this.http.get<any>(url)
  //   .pipe(
  //     catchError(this.errorHandler));
  // }


  createExpenses(expense: Expenses): Observable<Expenses> {
    console.log('aaaaa');
    console.log(expense);
    return this.http.post<Expenses>(`http://localhost:8080/api/newexpenses`, expense).pipe(
      catchError(this.errorHandler));
  }

  updateExpenses(id: number , value: any): Observable<Expenses>
  {
    console.log(value);
    return this.http.put<Expenses>(`http://localhost:8080/api/updateexpenses/${id}` , value).pipe(
      catchError(this.errorHandler));
  }


  getExpensesList(id: any): Observable<Expenses[]> {
    return this.http.get<Expenses[]>(`http://localhost:8080/api/allexpenses/${id}`).pipe(
      catchError(this.errorHandler));
  }

  // tslint:disable-next-line:typedef
  errorHandler(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

}
