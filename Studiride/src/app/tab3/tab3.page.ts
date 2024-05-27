import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  genrePassagers: string = 'homme'; 
  filiere: string = '';
  agePassagers: number = 18; 
  animauxAutorises: boolean = false;
  conversationsAutorisees: boolean = true;
  estFumeur: boolean = false;
  preferencesMusique: boolean = false;
  accessibiliteReducedMobility: boolean = false;

  enregistrerPreferences() {
  }
}
