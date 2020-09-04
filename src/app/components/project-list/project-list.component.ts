import { PageProject } from './../../class/page-project';
import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/service/project.service';
import { Project } from 'src/app/class/project';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  projects: Project[];
  pageProject: PageProject ;
  selectedPage = 0;
  private subscription: Subscription;

  constructor(private projectService: ProjectService, private router: Router) { }

  ngOnInit(): void {
  //  this.listProjects();
    this.getPageProject(0);

    this.subscription = this.projectService.notifyObservable$.subscribe((res) => {
        this.searchByName(res);
        // perform your other action from here

    });
  }

  // tslint:disable-next-line:typedef
  delete() {
    console.log('works');
  }

  // tslint:disable-next-line:typedef
  edit(projectId: number) {
    this.router.navigate(['edit' , projectId]);
  }

  // tslint:disable-next-line:typedef
  listProjects() {
    console.log('aisdjkasjdaskd');
    this.projectService.getProjectList().subscribe(
      data => {
        console.log(data);
        this.projects = data;
        console.log(this.projects);
      }
      , error => {
        console.log('error: ', error);
      });
    }

    getPageProject(page: number): void {
      this.projectService.getPageProject(page)
          // tslint:disable-next-line:no-shadowed-variable
          .subscribe(page => {
            this.pageProject = page;
            this.projects = page.content;
          } );
    }

    searchByName(value: any): void {
      console.log(value);
      console.log(this.selectedPage);

      this.projectService.getProjectListByName(value).subscribe(
        data => {
          console.log(data);
          this.projects = data;
          console.log(this.projects);
        }
        , error => {
          console.log('error: ', error);
        });

    }

    onSelect(page: number): void {
      console.log(page);
      this.selectedPage = page;
      this.getPageProject(page);
    }

}
