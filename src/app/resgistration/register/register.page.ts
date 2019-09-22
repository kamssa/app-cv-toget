import { Component, OnInit, ViewChild } from '@angular/core';
import {AlertController} from '@ionic/angular';
import {RegisterService} from '../../services/register.service';
import {PaysComponent} from '../../pays/pays.component';
import {UserModel} from '../../models/user.model';
import { Router } from '@angular/router';
import { ModeleService } from '../../services/modele.service';
// import {FormBuilder, Validators} from '@angular/forms';
import {MessageAlerteService} from '../../services/message-alerte.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';
import { CountryPickerService, ICountry } from 'ngx-country-picker';
import * as $ from 'jquery';
class Port {
	public pays_id: number;
	public pays_code :any;
	public pays_indicatif:any;
	public pays_libelle:any;
	public status: number;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  createSuccess = false;
  indicatif: string;
  user: UserModel;
  password: string = '';
  repassword: string = '';
  passwordShow: boolean = false;
  tooltipsMessage: string ='';
  repasswordShow: boolean = false;
  pays:any=[];
  //registerForm: FormGroup;
  @ViewChild('numero', { static: false }) numero: any;
    // @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll :IonInfiniteScroll;
  public countries: ICountry[] = [];
  
   registerForm : FormGroup = this.fb.group({
        tel: ['', Validators.required ],
        email: ['' , Validators.compose([
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])],
        password: ['',  Validators.required],
        repassword: ['', Validators.required],
        indicatif: [''],
        level:[0]
    });



  constructor( private auth: RegisterService,
               private alertCtrl: AlertController,
               private router: Router,
               private fb: FormBuilder,
               private  messageAlerte: MessageAlerteService,
               private modelService: ModeleService
               ) {
      this.togglePassword();
      this.toggleRePassword();
	  this.registerPays();
	  

  }

  ngOnInit() {
	  
  }
  
  public register() {
    if (this.registerForm.value.password !== this.registerForm.value.repassword) {
        this.messageAlerte.presentAlert('Erreur', 'Le mot de passe ne correspond pas à la confirmation.');
    } else {
      // this.registerForm.setValue({'tel':this.registerForm.value.indicatif+''+this.registerForm.value.tel});
      this.registerForm = this.fb.group({
        // id_user: new FormControl(this.registerForm.value.id_user),
          tel: new FormControl(this.registerForm.value.tel),
          email: new FormControl(this.registerForm.value.email),
          password: new FormControl(this.registerForm.value.password),
          repassword: new FormControl(this.registerForm.value.repassword),
          indicatif: new FormControl(this.indicatif),
          level: new FormControl(0),
  
      });
      console.log(this.registerForm.value);
      this.auth.register(this.registerForm.value).subscribe(data => {
        if (data['status'] === 200) {
          this.user = data;
          console.log(data['status']);
          this.createSuccess = true;
          this.messageAlerte.presentToast("Compte crée avec succes");
           //this.message.presentAlert('Success', 'Compte crée avec succes.');
          // this.router.navigate(['tabs/accueil']);
        } else {
          let message = this.user = data['message'];
          this.messageAlerte.presentAlert('', message);
        }
      },
        error => {
          console.log("erreur ");
        });
    }
  }

  public registerPays() {


      this.modelService.pays().subscribe(data => {
        if (data['status'] === 200) {
          this.pays = data;
		  // this.ports = data;
        } else {
          let message = data['message'];
          this.messageAlerte.presentAlert('', message);
        }
      },
        error => {
          console.log("erreur ");
        });
   
  }

validation_messages = {
 'email': [
            { type: 'required', message: 'Ce champ est obligatoire.' },
            { type: 'pattern', message: 'Entrer un mail valid.' }
        ],
        'tel': [
            { type: 'required', message: 'Ce champ est obligatoire.' },

        ],
        'indicatif': [
          { type: 'required', message: 'Ce champ est obligatoire.' },

      ],
        'password': [
            { type: 'required', message: 'Ce champ est obligatoire.' },
            { type: 'minlength', message: 'Ce champ doit contenir au moins 5 caractaire.' },
            { type: 'pattern', message: 'Votre mot de passe doit contenir au moins une majuscule une minuscule et un nombre.' }
        ],

    };
    public togglePassword(){
        if (!this.passwordShow){
            this.passwordShow = true;
            this.password = 'password';

            this.tooltipsMessage = 'afficher';

        } else {
            this.passwordShow = false;
            this.password = '';

            this.tooltipsMessage = 'cacher';
        }

    }
    public toggleRePassword(){
        if (!this.repasswordShow){
            this.repasswordShow = true;
            this.repassword = 'password';
            this.tooltipsMessage = 'afficher';

        } else {
            this.repasswordShow = false;
            this.repassword = '';
            this.tooltipsMessage = 'cacher';
        }

    }

    setNumeroFocus(event){
		console.log(event.pays_indicatif);
		$('#numero_me_toget').focus();
      // this.numero.focus = true;
	  // this.registerForm.setValue({indicatif : event.pays_indicatif});
	 // this.registerForm.value.indicatif = event.pays_indicatif;
      this.indicatif = event.pays_indicatif;
      
    }
}
