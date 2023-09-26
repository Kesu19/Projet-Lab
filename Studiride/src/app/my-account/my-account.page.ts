import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.page.html',
  styleUrls: ['./my-account.page.scss'],
})
export class MyAccountPage implements OnInit {
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  currentPasswordVisible: boolean = false;
  newPasswordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;
  constructor() { }

  ngOnInit() {
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

  fullName: string = 'John Doe'; 
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
