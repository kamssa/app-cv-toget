import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.page.html',
  styleUrls: ['./presentation.page.scss'],
})
export class PresentationPage implements OnInit {
@ViewChild('slides', {static: false}) slides : IonSlides;
  splash = true;

  image = [{
    image: 'assets/logo/logo.png',
    title: '',
    dev: ' Application mobile de Gestion de Cartes de Visite.',
}, {
    image: 'assets/logo/logo.png',
    title: '',
    dev: 'Permet à toute personne de gérer, collecter et diffuser ses cartes de visite à plusieurs individus quel que soit sa situation géographique.',
 }, 

{
    image: 'assets/logo/logo.png',
    title: 'Avec Toget-me,',
    dev: 'vos clients, partenaires, collègues et amis ne vous perdent jamais.',
    url: '/accueil',

}];

public hide:number;
  constructor
  ( 
    private router: Router,
    private storage: Storage,
    public navCtrl: NavController 
  ) { }
  

  ngOnInit() {
  }
  goTo(){
    this.router.navigate(['./tabs/accueil']);
    this.storage.set('ACCESS_BEGIN', 1);
  }
  
  next(slide, index) {
    slide.slideTo(index);
	this.hide = index;
}

slideChanged() { 
this.slides.getActiveIndex().then(index => {
   // console.log(index);
   this.hide = index;
});
}
  

}
