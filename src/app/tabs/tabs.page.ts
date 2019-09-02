import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import {PlusInfoComponent} from '../components/plus-info/plus-info.component';
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor(private poperCtrl: PopoverController) { }

  ngOnInit() {
  }
  async presentPopover(ev: any) {
    //console.log(ev);
      const popover = await this.poperCtrl.create({
          component: PlusInfoComponent,
          event: ev,
          mode: 'ios',
          //backdropDismiss: false
          //translucent: true
      });
      return await popover.present();
  }
}
