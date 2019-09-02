import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
// import { GroupeBy } from '../../pipes/groupe-by.pipe';

export class Activite{
  id?: number;
  type?: number;
  title?: string;
  date_activity?: string;
  time_activity?: string;
}
@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.scss'],
})
export class SearchHistoryComponent implements OnInit {
  activities: Activite[];

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    this.activities = [
      {id:1,type:1, title:'C000111854535555.jpg',date_activity:'Aujourd\'hui',time_activity:'14:45'},
      {id:2,type:0, title:'http://192.168.1.200:8100/tabs/collection?search=toget&type=entreprise',date_activity:'Aujourd\'hui',time_activity:'14:44'},
      {id:3,type:0, title:'http://192.168.1.200:8100/tabs/collection?search=PREPA&type=entreprise',date_activity:'Aujourd\'hui',time_activity:'14:42'},
      {id:4,type:1, title:'C000111854535555.jpg',date_activity:'Hier',time_activity:'20:45'},
      {id:5,type:1, title:'C000111854535555.jpg',date_activity:'Hier',time_activity:'19:58'},
      {id:6,type:0, title:'http://192.168.1.200:8100/tabs/collection?search=IEA&type=entreprise',date_activity:'Hier',time_activity:'19:58'}

    ];
    // console.log(this.activities);
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

}
