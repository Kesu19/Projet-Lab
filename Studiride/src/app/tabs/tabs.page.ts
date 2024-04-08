import { Component, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { IonTabs, IonRouterOutlet } from '@ionic/angular';
import { MapComponent } from '../map/map.component';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  @ViewChild(IonTabs) tabs!: IonTabs;
  @ViewChild(IonRouterOutlet) routerOutlet!: IonRouterOutlet;

  constructor(private activatedRoute: ActivatedRoute, private componentFactoryResolver: ComponentFactoryResolver,private router: Router) {}


  ionViewDidEnter() {
    // Vérifiez si l'onglet actif est celui contenant la page de la carte
    const selectedTab = this.tabs?.getSelected() as string | undefined;
    if (selectedTab === 'tab2') {
      // Récupérez le composant de carte à partir de ActivatedRoute
      const componentRef = this.activatedRoute.component as any;
      const factory = this.componentFactoryResolver.resolveComponentFactory(MapComponent);

      // Vérifiez si le composant actif est votre composant de carte
      if (componentRef instanceof factory.componentType) {
        // Appelez la méthode initMap() du composant de carte
        componentRef.initMap(); // Assurez-vous que initMap() est une méthode publique de votre composant de carte
      }
    }
  }

  navigateTab2() {
    this.router.navigate(['/tabs/tab-map']);
  }
}
