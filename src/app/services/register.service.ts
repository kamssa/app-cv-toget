import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { AppConfig } from '../parametre/config';
import {UserModel} from '../models/user.model';
import { Storage } from '@ionic/storage';
import {ValiderTokenService} from './valider-token.service';
import {AlertController, Platform} from '@ionic/angular';
import {catchError, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
const TOKEN_KEY = 'access_token';
const DATA_KEY = 'access_data';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  
    data : any;
    static readonly REGISTER_URL = AppConfig.baseURL + 'Users/user';
    static readonly UPDATE_URL = AppConfig.baseURL + 'Auth/user';
    static readonly URL = AppConfig.URL;
    static readonly DEMANDE_URL = AppConfig.baseURL + 'Demande/demande';
    static readonly COLLECTION_URL = AppConfig.baseURL + 'Collection/collection';
    jwtToken : any;
    headers : any;

  credentials: UserModel;

  constructor(private http: HttpClient,
              private storage: Storage,
              private plt: Platform,private router: Router,
              private valide: ValiderTokenService) {
      this.plt.ready().then(() => {
          this.valide.checkToken();
          this.recupererToken();
      });
  }
    recupererToken() {
        return   this.storage.get(TOKEN_KEY).then(token => {
            this.jwtToken = token;
            this.headers = new HttpHeaders({
                'Content-type': 'application/json',
                'Authorization': `Bearer ${this.jwtToken}`
            });
            console.log('token dans le modeles modele', this.jwtToken);
        });

    }
  public register(credentials) {
      return this.http.post(RegisterService.REGISTER_URL, credentials).pipe(
        tap(res => {
            console.log('verifier',res['token']);
          }),
      );
  }

  public login(credentials) {

      return this.http.get(RegisterService.URL + 'Users/user?login='
          + credentials.login + '&password=' + credentials.password).pipe(
          tap(res => {
			  if(res['status'] == 200){
              this.storage.set(TOKEN_KEY, res['token']);
			  localStorage.setItem(TOKEN_KEY, res['token']);
              this.storage.set(DATA_KEY, res['data']);
              this.valide.authenticationState.next(true);
              this.data = res;
			  this.router.navigate(['/ma-collection']) ;
			  }
          }),
      );
  }

  logout() {
		   // if (localStorage.getItem(TOKEN_KEY)) {
					localStorage.clear();
		   // }
      this.storage.remove(TOKEN_KEY).then(() => {
        this.storage.remove(DATA_KEY).then(() => {
            this.valide.authenticationState.next(false);
            console.log(this.valide.authenticationState.value);
        });
      });
      
  }
    public demande(credentials) {
        return this.http.post(RegisterService.DEMANDE_URL, credentials).pipe(
            tap(res => {
              console.log('verifier');
            }),
        );
    }
    public collection(credentials) {
        return this.http.post(RegisterService.COLLECTION_URL, credentials, { headers: this.headers}).pipe(
            tap(res => {
                console.log('verifier');
              }),
        );
    }
    public updateProfil(credentials) {
        return this.http.post(RegisterService.UPDATE_URL, credentials, { headers: this.headers}).pipe(
            tap(res => {
                //console.log('verifier',res['token']);
            }),
        );
    }
}
