import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {HttpHeaders} from '@angular/common/http';
import {ValiderTokenService} from './valider-token.service';
import {BehaviorSubject, Subject} from 'rxjs';

const TOKEN_KEY = 'access_token';
const DATA_KEY = 'access_data';
const DATA_MACOLLECTION = 'access_maCollection';
const HISTORIQUE_KEY = 'access_Historique';
const PHOTOS_KEY = 'access_photos';
const IMAGES_KEY = 'access_imagePhotos';

@Injectable({
    providedIn: 'root'
})
export class DataProviderService {
    data: any = [];
    dataToken: any;
    jwtToken: any;
    headers: any;
    dataMaCollection: any = [];
    dataPhoto: any;
    valueState = new BehaviorSubject(false);
    valeurPhoto = new BehaviorSubject(false);

    constructor(private storage: Storage,
                private tokenValide: ValiderTokenService) {
    }

    loadData() {
        return this.storage.get(DATA_KEY).then(value => {
            if (value) {
                this.data = JSON.parse(value);
            }
        });
    }
    loadDataAccueil() {
        return this.storage.get(DATA_KEY);
    }

    updateData(data: []) {
        this.storage.set(DATA_KEY, JSON.stringify(data));
        this.valueState.next(true);
    }

    loadDataMaCollection() {
        return this.storage.get(DATA_MACOLLECTION);
    }

    updateDataMaCollection(data: []) {
        this.storage.set(DATA_MACOLLECTION, JSON.stringify(data));
        this.valueState.next(true);
    }



    updateStorageToken(data) {
        this.storage.set(TOKEN_KEY, data);
        this.tokenValide.authenticationState.next(true);
    }

    updateLocalstorage(data) {
        localStorage.setItem(TOKEN_KEY, data);
        this.tokenValide.authenticationState.next(true);
    }

    loadDataPhotos() {
        return this.storage.get(PHOTOS_KEY).then(value => {
            if (value) {
                this.dataPhoto = JSON.parse(value);
            }
        });
    }

    updateDataPhotos(data) {
        this.storage.set(PHOTOS_KEY, data);
        this.valeurPhoto.next(true);

    }


    recupererToken() {
        return this.storage.get(TOKEN_KEY).then(token => {
            this.jwtToken = token;
            this.headers = new HttpHeaders({
                'Content-type': 'application/json',
                'Authorization': `Bearer ${this.jwtToken}`
            });
            console.log('token dans le dataprovider', this.jwtToken);
        });

    }

    recupererValeurPhoto() {
        return this.storage.get(PHOTOS_KEY).then(token => {
            this.valeurPhoto.next(true);
        });

    }

    remove() {

        localStorage.clear();

        this.storage.remove(TOKEN_KEY).then(() => {
            this.tokenValide.authenticationState.next(false);
        });
        this.storage.remove(DATA_KEY).then(() => {
            this.updateData(null);
        });
        this.storage.remove(DATA_MACOLLECTION).then(() => {
            this.updateDataMaCollection(null);
        });
        this.storage.remove(HISTORIQUE_KEY).then(() => {


        });
        this.storage.remove(PHOTOS_KEY).then(() => {
            this.updateDataPhotos(null);
        });
    }

    isValue() {
        return this.valueState.value;
    }

    isValuePhoto() {
        return this.valeurPhoto.value;
    }


}
