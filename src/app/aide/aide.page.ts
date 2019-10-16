import { Component, OnInit } from '@angular/core';
import { ModeleService } from '../services/modele.service';
import {BehaviorSubject} from 'rxjs';
import {LoadingController} from '@ionic/angular';
import {ModalController} from '@ionic/angular';
import * as $ from 'jquery';
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

   playAudio(){
		let x   = <HTMLAudioElement> document.getElementById("myAudio"); 
		x.play(); 
		x.volume =0.1;
			
}
closeModal(){
  this.modalCtrl.dismiss();
  
}

	showme(me, other, col){
		
		this.playAudio();
		$('#' + me).toggle(500);
		$('#' + col).toggleClass('collapsed');
  }
	
}
