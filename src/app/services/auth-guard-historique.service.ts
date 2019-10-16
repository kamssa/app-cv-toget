import {Injectable} from '@angular/core';
import {CanActivate,  Router,   ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute} from '@angular/router';
import {ValiderTokenService} from './valider-token.service';
import {BehaviorSubject} from 'rxjs';
import {Storage} from '@ionic/storage';
import {JwtHelperService} from '@auth0/angular-jwt';

const HISTORIQUE_KEY = 'access_Historique';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardHistoriqueService  implements CanActivate {

    userlink = null;

    constructor(private auth: ValiderTokenService, private router: Router, private storage: Storage,
                private helper: JwtHelperService, private tokenValide: ValiderTokenService, private route: ActivatedRoute) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        this.userlink = String(state.url);

		return true;
    }
	
	
	saveHistorique(rech="Globale", type="Toutes cartes"){
		let ladate = new Date();
		let heure = ladate.getHours()+":"+ladate.getMinutes()+":"+ladate.getSeconds();
		let date1 = ladate.getDate();
		let date2 = ladate.getMonth();
		let date3 = ladate.getFullYear();
		let dataGlobal:any=[];
		this.storage.get(HISTORIQUE_KEY).then(val => {
			if(val){
			let data: any = [{lien: this.userlink, recherche : rech, type: type, date: date1+'/'+(date2+1)+'/'+date3, heure: heure }];
				dataGlobal = val.concat(data);
				this.storage.set(HISTORIQUE_KEY, dataGlobal);
				dataGlobal = [];
			}else{
				let data: any = [{id: 1 , lien: this.userlink, recherche : rech, type: type, date: date1+'/'+(date2+1)+'/'+date3, heure: heure }];

				console.log(data);
				this.storage.set(HISTORIQUE_KEY, data);
			}
        }, error=>{


			
		});
	}

	 
	 
}
