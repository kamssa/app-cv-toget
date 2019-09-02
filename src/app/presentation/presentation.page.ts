import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.page.html',
  styleUrls: ['./presentation.page.scss'],
})
export class PresentationPage implements OnInit {

  splash = true;
  secondPage = PresentationPage;

  sliderViewOpts={
    // zoom: false,
    slidesPreview: 1.5,
    centerSlides: true,
    spaceBetween: 20,
    itemWidth:500,
    // snap: false,
  }

  image = [{
    image: 'assets/logo/logo.png',
    title: 'Toget-me,',
    dev: ' Application de Gestion de Cartes de Visite',
}, {
    image: 'assets/image/part.png',
    title: 'TOGET-ME ',
    dev: 'permet à toute personne de gérer,collecter et diffuser ses cartes de visite à plusieurs individu(s) quelque soit sa situation géographie.',
 }, 
// {
//   image: 'assets/image/model3.svg',
//   title: 'Candy Crush Saga',
//   dev: 'King',
// },
{
    image: 'assets/image/3.png',
    title: 'Toget',
    dev: 'Trouver une carte de visite',
    url: '/accueil',
    // rank: 'Suivant'
    // rank: 'suivant ->',
}];
  constructor
  ( 
    private router: Router,
    public navCtrl: NavController 
  ) { }
  
  // ionViewDidLoad() {
  //   setTimeout(() => this.splash = false, 4000);
  // }
  ngOnInit() {
  }
  goTo(){
    this.router.navigate(['./tabs/accueil']);
  }
  

}
