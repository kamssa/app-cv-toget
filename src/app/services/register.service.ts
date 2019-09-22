import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { AppConfig } from '../parametre/config';

import { Storage } from '@ionic/storage';
import {ValiderTokenService} from './valider-token.service';
import { Platform} from '@ionic/angular';
import {catchError, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {DataProviderService} from './data-provider.service';
const TOKEN_KEY = 'access_token';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

    data: any;
    jwtToken: any;
    headers:any;
    static readonly REGISTER_URL = AppConfig.baseURL + 'Users/user';
    static readonly UPDATE_URL = AppConfig.baseURL + 'Auth/user';
    static readonly UPDATE_URLID = AppConfig.baseURL + 'Auth/userID';
    static readonly URL = AppConfig.URL;
    static readonly DEMANDE_URL = AppConfig.baseURL + 'Demande/demande';
    static readonly COLLECTION_URL = AppConfig.baseURL + 'Collection/collection';
    static readonly DEMANDE_URL_V2 =  AppConfig.baseURL + 'Demande/demandeV2';
    static readonly UPDATE_URL_DELETE = AppConfig.baseURL + 'Auth/compteDelete';
    static readonly UURL_MODELE = AppConfig.baseURL + 'Users/typeCarte';

  constructor(private http: HttpClient,
    private plt: Platform,
    private router: Router,
    private valide: ValiderTokenService,
    private  dataProviderService: DataProviderService,
    private storage: Storage) {
this.plt.ready().then(() => {
this.valide.checkToken();
this.recupererToken();
});
}
public comunication:any=[];
recupererToken() {
    return   this.storage.get(TOKEN_KEY).then(token => {
          this.jwtToken = token;
        this.headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': `Bearer ${this.jwtToken}`
        });


    });

  }

public register(credentials) {
return this.http.post(RegisterService.REGISTER_URL, credentials).pipe(
  tap(res => {
    if(res['status'] === 200){
      this.dataProviderService.updateData(res['data']);
      this.dataProviderService.updateStorageToken(res['token']);
      this.dataProviderService.updateLocalstorage(res['token']);
      this.data = res;
      console.log('connexion de user', res['data']);
      }
  }),
);
}

public login(credentials) {
return this.http.get(RegisterService.URL + 'Users/user?login='
+ credentials.login + '&password=' + credentials.password).pipe(
tap(res => {
    if(res['status'] == 200){
    this.dataProviderService.updateData(res['data']);
    this.dataProviderService.updateStorageToken(res['token']);
    this.dataProviderService.updateLocalstorage(res['token']);
    this.data = res;

    }
}),
);
}


public modele() {
return this.http.get(RegisterService.UURL_MODELE, { headers: this.headers});
}
public getUserId(id: number) {
return this.http.get(RegisterService.UPDATE_URLID+'/'+id, { headers: this.headers});
}

  logout() {
    this.dataProviderService.remove();

  }
    public demande(credentials) {
        return this.http.post(RegisterService.DEMANDE_URL_V2, credentials).pipe(
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

            }),
        );
    }

    public updateProfilDelete(credentials) {
        return this.http.post(RegisterService.UPDATE_URL_DELETE, credentials, { headers: this.headers}).pipe(
            tap(res => {

            }),
        );
    }
}
