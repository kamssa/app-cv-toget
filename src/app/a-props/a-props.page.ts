import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-a-props',
  templateUrl: './a-props.page.html',
  styleUrls: ['./a-props.page.scss'],
})
export class APropsPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  closeModal(){
    this.modalCtrl.dismiss();
    
  }
}
