import { element } from 'protractor';
import { Project } from 'src/app/class/project';
import { Expenses } from './../../class/expenses';
import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/service/project.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-project-cost',
  templateUrl: './project-cost.component.html',
  styleUrls: ['./project-cost.component.css']
})
export class ProjectCostComponent implements OnInit {

  numbers = 5;
  id: number;
  expenses: Expenses[];
  projectDetails: Project;
  sumPaid: number;
  constructor(private projectService: ProjectService, private route: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      console.log(params);
      this.id = params.id;
      this.getProjectByid(this.id);
      });
    this.listOfExpenses();
  }

  // tslint:disable-next-line:typedef
  editExpenses(id: any) {
    this.route.navigate(['editexpense' , id]);
  }

    // tslint:disable-next-line:typedef
  getProjectByid(id: number) {
      this.projectService.getProjectbyId(id).subscribe( data => {
          this.projectDetails = data;
      });
    }

    // tslint:disable-next-line:typedef
    calculatePaidSum() {
      let sum = 0;
      // tslint:disable-next-line:prefer-const
      for (let exp of this.expenses) {
        sum += exp.cost;
     }
      this.sumPaid = sum;
    }

  // tslint:disable-next-line:typedef
  listOfExpenses() {
    this.projectService.getExpensesList(this.id).subscribe(
      data => {
        this.expenses = data;
        this.calculatePaidSum();
      }
      , error => {
        console.log('error: ', error);
      });
  }


}
