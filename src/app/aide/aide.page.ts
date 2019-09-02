import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { MbscFormOptions, MbscListviewOptions } from '@mobiscroll/angular';
import { Input } from '@mobiscroll/angular/src/js/classes/input';
import { ModeleService } from '../services/modele.service';
import {BehaviorSubject} from 'rxjs';
import {LoadingController} from '@ionic/angular';
import {ModalController} from '@ionic/angular';
@Component({
  selector: 'app-aide',
  templateUrl: './aide.page.html',
  styleUrls: ['./aide.page.scss'],
})
export class AidePage implements OnInit {

  public items: any = [];
  verifierRetour = new BehaviorSubject(false);

  constructor(private modeService: ModeleService,
    private loadingCtl: LoadingController,
    private modalCtrl: ModalController) { 
    this.items = [
      { expanded: false },
      { expanded: false },
      { expanded: false },
      { expanded: false },
      { expanded: false },
      { expanded: false },
      { expanded: false },
      { expanded: false },
      { expanded: false }
    ];
    this.showLoading();
  }

  expandItem(item): void {
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.items.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }

  ngOnInit() { 
    this.modeService.searchAide().subscribe(response => {
      this.items = response;
      if (response['status']===200) {
       this.verifierRetour.next(true);
    }
    })
  }
  async showLoading(){
    let loading = await this.loadingCtl.create({
        message:"Chargement...",
        duration: 2000,
        showBackdrop: false,
        spinner: "lines-small"
    });
    loading.present().then(() => {
        if (this.verifierRetour.value){
         loading.dismiss();
        }
    });


}
closeModal(){
  this.modalCtrl.dismiss();
  
}


}
