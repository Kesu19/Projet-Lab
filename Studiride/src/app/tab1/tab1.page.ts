import { Component, IterableDiffers, OnInit } from '@angular/core';
import { UserConnect } from '../service/userConnect';
import { Router } from '@angular/router';
import { GetUserService } from '../service/getAllUser.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  constructor(private userConnect : UserConnect,private router : Router, private getUserService: GetUserService) {}

  userName = '';
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

  items: String[] = [];
  avatarUrl: string = 'https://www.w3schools.com/howto/img_avatar.png';

  ngOnInit(): void {
    this.userName = this.userConnect.getUtilisateurConnecte().identifiant
    console.log(this.userConnect.getUtilisateurConnecte())
    this.getUserService.getAllUser(this.userConnect.getUtilisateurConnecte().statuts).subscribe((data)=>{
      console.log(data,this.userConnect.getUtilisateurConnecte().status)
      for(const user of data){
        this.items.push(user.identifiant)
      }

    })
  }
  selectedDistance: string = '10'; // Ajout de la variable selectedDistance
  maxPrice: number=3; // Ajout de la variable maxPrice
  filteredItems: String[]=["Covoite 1", "Covoite 2"];


  sendMessage(index: String) {
    console.log("Send a message to covoiturage with index:", index);
  }

  desconnect(){
    this.userConnect.deconnecter()
    this.router.navigate(['/login']);
  }
}
