import { Component, OnInit } from '@angular/core';
import {AlertController} from '@ionic/angular';
import {RegisterService} from '../../services/register.service';
import {UserModel} from '../../models/user.model';
import { Router } from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {MessageAlerteService} from '../../services/message-alerte.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  createSuccess = false;
  user: UserModel;
    password: string = '';
    repassword: string = '';
    passwordShow: boolean = false;
    tooltipsMessage: string ='';
    repasswordShow: boolean = false;
  
 registerForm = this.fb.group({
        tel: ['', Validators.required ],
        email: ['' , Validators.compose([
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])],
        password: ['',  Validators.required],
        repassword: ['', Validators.required],
        level:[0]
    });

  constructor( private auth: RegisterService,
               private alertCtrl: AlertController,
               private router: Router,
               private fb: FormBuilder,
               private  message: MessageAlerteService
               ) {
      this.togglePassword();
      this.toggleRePassword();
  }

  ngOnInit() {
  }
  public register() {
    if (this.registerForm.value.password !== this.registerForm.value.repassword) {
        this.message.presentAlert('Erreur', 'Le mot de passe ne correspond pas à la confirmation.');
    } else {
      console.log(this.registerForm.value);
      this.auth.register(this.registerForm.value).subscribe(data => {
        if (data['status'] === 200) {
          this.user = data;
          console.log(data['status']);
          this.createSuccess = true;
          this.message.presentAlert('Success', 'Compte crée avec succes.');
          this.router.navigate(['/connexion']);
        } else {
          let message = this.user = data['message'];
          this.message.presentAlert('', message);
        }
      },
        error => {
          console.log("erreur ");
        });
    }
  }

validation_messages = {
 'email': [
            { type: 'required', message: 'Ce champ est obligatoire.' },
            { type: 'pattern', message: 'Entrer un mail valid.' }
        ],
        'tel': [
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
}
