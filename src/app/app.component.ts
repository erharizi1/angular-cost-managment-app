import { Component, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TokenStorageService } from './service/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cost-managment-angular';
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;

 // @Output() messageEvent = new EventEmitter<string>();
  //subject = new EventEmitter<boolean>();

  constructor(private modalService: NgbModal, private fb: FormBuilder, private tokenStorageService: TokenStorageService) {
  }

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

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }


}
