import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Storage} from '@ionic/storage';
import {JwtHelperService} from '@auth0/angular-jwt';

const  TOKEN_KEY = 'access_token';
@Injectable({
  providedIn: 'root'
})
export class ValiderTokenService {
  authenticationState = new BehaviorSubject(false);
  user = null;
  constructor( private storage: Storage,
               private helper: JwtHelperService) {
  }

  checkToken() {
    this.storage.get(TOKEN_KEY).then(token => {
      console.log('token recuperer dans le service valider token:', token);
     
      if (token) {
        let decode = this.helper.decodeToken(token);
        let expirationDate = this.helper.getTokenExpirationDate(token);
        let isExpireToken = this.helper.isTokenExpired(token);
        console.log(expirationDate);
        if (!isExpireToken) {
          this.user = decode;
          this.authenticationState.next(true);
        } else {
          this.storage.remove(TOKEN_KEY);
        }
      }
    });
  }
  isAuthenticated(){
    return this.authenticationState.value;
  }
}
