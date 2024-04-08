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

  navigateTab2() {
    this.router.navigate(['/tab-map']);
  }
}
