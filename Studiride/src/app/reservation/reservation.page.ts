import { Component, OnInit } from '@angular/core';
import { UserConnect } from '../service/userConnect';
import { Router } from '@angular/router';
import { GetUserService } from '../service/getAllUser.service';
import { ReservationService } from '../service/reservation';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage implements OnInit {

  constructor(private userConnect : UserConnect,private router : Router, private getUserService: GetUserService, private reservationService: ReservationService) {}
  userName = '';
  allReservation = []
  avatarUrl: string = 'https://www.w3schools.com/howto/img_avatar.png';
  ngOnInit(): void {
    this.userName = this.userConnect.getUtilisateurConnecte().identifiant;
    this.reservationService.getAllReservation(this.userConnect.getUtilisateurConnecte().id).then((data: any) => {
      if (data) {
        this.allReservation = data
      } else {
      }
    })
    .catch((error: any) => {
      // this.presentAlert(error.message);
    });

  }

  desconnect(){
    this.userConnect.deconnecter()
    this.router.navigate(['/login']);
  }
  // getUser(item : any) {

  //     const userId = this.userConnect.getUtilisateurConnecte().id === item["idConducteur"]
  //       ? item["idPassager"]
  //       : item["idConducteur"];

  //     this.getUserService.getUserById(userId).subscribe((user) => {
  //       return user.identifiant;
  //     })
  // }
}
