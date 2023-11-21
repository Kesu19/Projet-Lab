import { Component, OnInit } from '@angular/core';
import { UserConnect } from '../service/userConnect';
import { Router } from '@angular/router';
import { GetUserService } from '../service/getAllUser.service';
@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.page.html',
  styleUrls: ['./my-account.page.scss'],
})

export class MyAccountPage implements OnInit {
  constructor(private userConnect : UserConnect,private router : Router, private getUserService: GetUserService) {}
  userName = '';
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  currentPasswordVisible: boolean = false;
  newPasswordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;

  ngOnInit(): void {
    this.userName = this.userConnect.getUtilisateurConnecte().identifiant
    console.log(this.userName)
  }
  togglePasswordVisibility(field: string) {
    if (field === 'currentPassword') {
      this.currentPasswordVisible = !this.currentPasswordVisible;
    } else if (field === 'newPassword') {
      this.newPasswordVisible = !this.newPasswordVisible;
    } else if (field === 'confirmPassword') {
      this.confirmPasswordVisible = !this.confirmPasswordVisible;
    }
  }


  isEditing: boolean = false;

  toggleEditMode(input: any) {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      input.disabled = false;
    } else {
      input.disabled = true;
    }
  }
  
  

}
