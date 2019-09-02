import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModeleService } from 'src/app/services/modele.service';

@Component({
  selector: 'app-mes-cartes',
  templateUrl: './mes-cartes.component.html',
  styleUrls: ['./mes-cartes.component.scss'],
})
export class MesCartesComponent implements OnInit {
  public cartes: any;

  constructor(private modalCtrl: ModalController,private modelService: ModeleService) { }

  ngOnInit() {
    this.cartes = [];
  }
  
  closeModal(){
    this.modalCtrl.dismiss();
  }

}
