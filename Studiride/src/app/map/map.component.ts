import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { UserConnect } from '../service/userConnect';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit {
  private map!: L.Map;
  user = '';
  latitude = 0;
  longitude = 0;
  constructor(private userConnect : UserConnect) {}

  ngOnInit() {
    this.user = this.userConnect.getUtilisateurConnecte();
    this.latitude = this.userConnect.getUtilisateurConnecte().latitude
    this.longitude = this.userConnect.getUtilisateurConnecte().longitude
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map').setView([this.latitude, this.longitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    // Remplacez les coordonnées [latitude, longitude] par les coordonnées de votre maison
    const houseIcon = L.icon({

      iconUrl: '../../assets/icon/maison.png', // Chemin vers votre icône personnalisée
      iconSize: [25, 41], // Taille de l'icône [largeur, hauteur]
      iconAnchor: [12, 41], // Position de l'ancre de l'icône [horizontal, vertical]
      popupAnchor: [1, -34] // Position de la popup [horizontal, vertical] par rapport à l'ancre de l'icône
    });

    const houseMarker = L.marker([this.latitude, this.longitude], { icon: houseIcon }).addTo(this.map);

    houseMarker.bindPopup("<b>Votre Maison</b>").openPopup();

    // Appeler invalidateSize après un délai pour s'assurer que le modal s'est affiché correctement
    setTimeout(() => {
      this.map.invalidateSize();
    }, 500); // Vous pouvez ajuster la durée en fonction de vos besoins
  }
}
