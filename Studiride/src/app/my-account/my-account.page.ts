import { Component, OnInit } from '@angular/core';
import { UserConnect } from '../service/userConnect';
import { Router } from '@angular/router';
import { GetUserService } from '../service/getAllUser.service';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.page.html',
  styleUrls: ['./my-account.page.scss'],
})

export class MyAccountPage implements OnInit {
  constructor(private userConnect : UserConnect,private router : Router, private getUserService: GetUserService,private alertController: AlertController,private toastController: ToastController) {}
  userName = '';
  email = '';
  tel = '';
  ngOnInit(): void {
    this.userName = this.userConnect.getUtilisateurConnecte().identifiant;
    this.email = this.userConnect.getUtilisateurConnecte().email;
    this.tel = this.userConnect.getUtilisateurConnecte().tel;
    console.log(this.userName)
  }

  isEditing: boolean = false;
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
  
    toast.present();
  }
  toggleEditMode(input: any) {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      input.disabled = false;
    } else {
      input.disabled = true;
    }
  }
  
  async openChangePasswordDialog() {
    const alert = await this.alertController.create({
      header: 'Change Password',
      inputs: [
        {
          name: 'currentPassword',
          type: 'password',
          placeholder: 'Current password',
        },
        {
          name: 'newPassword',
          type: 'password',
          placeholder: 'New password',
        },
        {
          name: 'confirmPassword',
          type: 'password',
          placeholder: 'Confirm new password',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Change',
          handler: (data) => {
            if (data.newPassword !== data.confirmPassword) {
              // The new password and the confirmation do not match, show an error message
              console.log('The new password and the confirmation do not match');
              return false; // Keep the alert dialog open
            }
          
            // Call the changePassword method here
            this.userConnect.changePassword(this.userName, data.newPassword).subscribe(
              response => {
                this.presentToast('Password changed successfully');
              },
              error => {
                this.presentToast('Failed to change password');
              }
            );
          
            return true; // Close the alert dialog
          },
        },
      ],
    });
  
    await alert.present();
  }

}
