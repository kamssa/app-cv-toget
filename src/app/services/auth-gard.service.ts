import {Injectable} from '@angular/core';
import {CanActivate,  Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {ValiderTokenService} from './valider-token.service';
import {BehaviorSubject} from 'rxjs';
import {Storage} from '@ionic/storage';
import {JwtHelperService} from '@auth0/angular-jwt';

const TOKEN_KEY = 'access_token';


@Injectable({
    providedIn: 'root'
})
export class AuthGardService implements CanActivate{
    authenticationState = new BehaviorSubject(false);
    user = null;

    constructor(private auth: ValiderTokenService, private router: Router, private storage: Storage,
                private helper: JwtHelperService, private tokenValide: ValiderTokenService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        const urlcurrent = String(state.url);

        if (this.checkToken() == true) {
            if (urlcurrent == '/connexion') {
                this.router.navigate(['tabs/accueil']);
            }

            if (urlcurrent == '/register') {
                this.router.navigate(['tabs/accueil']);
            }
            return true;
        } else {
            if (urlcurrent == '/connexion') {
                return true;
            } else if (urlcurrent == '/register') {
                return true;
            } else {
                this.router.navigate(['/connexion']);
            }
        }

    }

       checkToken():any {

         if (localStorage.getItem(TOKEN_KEY)) {
           let token = localStorage.getItem(TOKEN_KEY);

           let decode = this.helper.decodeToken(token);
           let expirationDate = this.helper.getTokenExpirationDate(token);
           let isExpireToken = this.helper.isTokenExpired(token);

           if (!isExpireToken) {
             this.user = decode;
             this.authenticationState.next(true);
             return true;
           } else {
             this.storage.remove(TOKEN_KEY);
             localStorage.clear();
             return false;
           }
         }else{
             console.log('access denied . security guards');
             return false;
         }
       // });
     }
     isAuthenticated(){

       return this.authenticationState.value;
     }
	 
	 
	 
}




