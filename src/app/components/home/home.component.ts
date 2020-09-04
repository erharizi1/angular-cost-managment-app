import { TokenStorageService } from './../../service/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;
  inputSearchValue: any;

  constructor(private modalService: NgbModal, private fb: FormBuilder,
              private tokenStorageService: TokenStorageService, private projectService: ProjectService) { }
  subscriptionForm: FormGroup;

  // tslint:disable-next-line:typedef
  open(content) {
    console.log('111');
    //this.subject.emit(true);
    //this.subject.next('mymodal');
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }
  }

  search(value: any): void {
    console.log(value);
    this.projectService.notifyOther(value);
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }


}
