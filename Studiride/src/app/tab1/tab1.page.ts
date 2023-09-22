import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public alertButtons = [
    {
      text: 'Non',
      cssClass: 'alert-button-cancel',
    },
    {
      text: 'Oui',
      cssClass: 'alert-button-confirm',
    },
  ];
  items: String[] = ["Covoite 1", "Covoite 2", "Covoite 3", "Covoite 4", "Covoite 5", "Covoite 6", "Covoite 7"]
  avatarUrl: string = 'https://www.w3schools.com/howto/img_avatar.png';
  constructor() {}

  sendMessage(index: String) {
    console.log("Send a message to covoiturage with index:", index);
  }
}
