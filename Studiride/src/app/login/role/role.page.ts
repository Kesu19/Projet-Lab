import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-role',
  templateUrl: './role.page.html',
  styleUrls: ['./role.page.scss'],
})
export class RolePage  {
  
  selectedRole: string | undefined;

  constructor(private modalController: ModalController) {}

  dismiss() {
    // Fermez la boîte de dialogue modale et passez la valeur sélectionnée
    this.modalController.dismiss({ selectedRole: this.selectedRole });
  }
}
