import { Expenses } from './../../class/expenses';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/service/project.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-new-expense',
  templateUrl: './new-expense.component.html',
  styleUrls: ['./new-expense.component.css']
})
export class NewExpenseComponent implements OnInit {
  closeResult: string;
  subscriptionForm: FormGroup;
  expense: Expenses;
  id: any;
  expid: any;

  constructor(private modalService: NgbModal, private fb: FormBuilder, private activatedRoute: ActivatedRoute,
              private projectService: ProjectService) {
    this.subscriptionForm = fb.group({
      name: ['', Validators.required],
      cost: ['', Validators.required],
      notes: ['', Validators.required],
      });
   }

  ngOnInit(): void {

    
    this.activatedRoute.params.subscribe(params => {
      
      console.log(params);
      this.id = params.id;
      this.expid = params.expid;
      
      if (params.expid) {
        const element: HTMLElement = document.getElementById('openmodal') as HTMLElement;
        element.click();
        this.getExpensesByid(params.expid);
      }
    });
  }


  // tslint:disable-next-line:typedef
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  // tslint:disable-next-line:typedef
  getExpensesByid(id: any) {
    console.log('hyrri');
    this.projectService.getExpensesbyId(id).subscribe(data => {
      console.log(data);
      this.editExpenses(data);
    });
  }

  // tslint:disable-next-line:typedef
  editExpenses(data: any) {
    this.subscriptionForm.patchValue({
      cost: data.cost,
      name: data.name,
      notes: data.notes,
    });
  }

  // tslint:disable-next-line:typedef
  save() {
    // this.activatedRoute.params.subscribe(params => {
    //   console.log(params);
    //   this.id = params.id;
    //   this.expid = params.expid;
    //   });
    if (this.expid) {
      this.expense = this.subscriptionForm.value;
      console.log(this.expense);
      this.projectService.updateExpenses(this.expid, this.expense).subscribe(data => {
        console.log(data);
        });
      }
      else {
        console.log(this.id);
        this.expense = this.subscriptionForm.value;
        this.expense.projectId = this.id;
        this.projectService.createExpenses(this.expense).subscribe(data => {
          console.log(data);
          });
      }

  }


}
