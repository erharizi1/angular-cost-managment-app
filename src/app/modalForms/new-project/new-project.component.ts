import { Project } from './../../class/project';
import { Component, OnInit, Input, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Observable } from 'rxjs';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ProjectService } from 'src/app/service/project.service';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {
  closeResult: string;
  project: Project =  new Project();
  id: number;
  updateData: Project;


  @Input() notifier: EventEmitter<boolean>;
  subscriptionForm: FormGroup;
  ngOnInit(): any {
    console.log(this.tokenStorageService.getUser());
    this.activatedRoute.params.subscribe(params => {
        if (params.id) {
          const element: HTMLElement = document.getElementById('openmodal') as HTMLElement;
          element.click();
          this.id = params.id;
          this.getProjectByid(params.id);
        }
      });
  }

  constructor(private modalService: NgbModal, private fb: FormBuilder, private projectService: ProjectService,
              private activatedRoute: ActivatedRoute, private tokenStorageService: TokenStorageService) {
    this.subscriptionForm = fb.group({
      name: ['', Validators.required],
      expectedCost: ['', Validators.required],
      notes: ['', Validators.required],
      startingDate: ['', Validators.required],
      endDate: ['', Validators.required],
      });
  }


  receiveMessage($event): void {
    console.log('222');
    console.log($event);
  }

  // tslint:disable-next-line:typedef
  open(content) {
    console.log(content);
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
  onSubmit() {
  //  this.project.name = this.subscriptionForm.value.Name;
    console.log(this.project);
    console.log(this.subscriptionForm.value.Name);
  }

  // tslint:disable-next-line:typedef
  getProjectByid(id: number) {
    this.projectService.getProjectbyId(id).subscribe( data => {
        this.editProject(data);
    });
  }

  // tslint:disable-next-line:typedef
  editProject(data: any) {
    this.subscriptionForm.patchValue({
      endDate: data.endDate,
      expectedCost: data.expectedCost,
      name: data.name,
      notes: data.notes,
      startingDate: data.startingDate,
    });
  }


  // tslint:disable-next-line:typedef
save() {

    if (this.id) {
      this.updateData =  this.subscriptionForm.value;
      this.updateData.lastModified = new Date();
      this.projectService.updateProject(this.id , this.updateData).subscribe(data => {
       console.log(data);
      });
    }
    else {
      console.log(this.project);
      this.project = this.subscriptionForm.value;
      this.project.userId = this.tokenStorageService.getUser().id;
      this.project.lastModified = new Date();
      this.projectService.createProject(this.project).subscribe(data => {
            console.log(this.project);
          },
        error => console.log(error));
    }

  }

}

