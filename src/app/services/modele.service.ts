import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { RegisterService } from './register.service';
import {Storage} from '@ionic/storage';
import { tap} from 'rxjs/operators';
import { AppConfig } from '../parametre/config';
const TOKEN_KEY = 'access_token';
@Injectable({
    providedIn: 'root'
})
export class ModeleService {

    static readonly URL =  AppConfig.URL;
    static readonly CARTE_URL = AppConfig.URL + 'Collection/collectionUsers/';
    static readonly CARTE_URL_SINGLE = AppConfig.URL + 'Collection/collectionSingle/';
    static readonly CARTE_URL_SINGLE_PERSONNEL = AppConfig.URL + 'Collection/collectionPersonnel/';
    static readonly CARTE_URL_SINGLE_PERSONNEL_UPDATE = AppConfig.URL + 'Collection/collectionPersoUpdate/';
    static readonly URL_AIDE =  AppConfig.URL+'aides';
    static readonly URL_PAYS =  AppConfig.URL+'Pays';
    static readonly URL_EMAIL_VERIFY =  AppConfig.URL+'Users/reset';
    static readonly URL_CODE_VERIFY =  AppConfig.URL+'Users/resetVerif';
    static readonly URL_PASSWORD_RESET =  AppConfig.URL+'Users/passwordReset';
    static readonly DELETE_ELEMENT =  AppConfig.URL+'Collection/collection/';
    public currentPage:number=0;
    messageErreur:string;
    public size:number=10;
    modeles: any=[];
    jwtToken: any;
    headers:any;
	uploaded : boolean;
	uploaded_val : any;
       constructor(private http: HttpClient,
           private registerService: RegisterService,
           private storage: Storage) {
            this.recupererToken();
       }
       recupererToken() {
        return   this.storage.get(TOKEN_KEY).then(token => {
              this.jwtToken = token;
            this.headers = new HttpHeaders({
                'Content-type': 'application/json',
                'Authorization': `Bearer ${this.jwtToken}`
            });


        });
  
      }
       public search() {
     
           return this.http.get(ModeleService.URL + 'SearchN/searchLimit?'+'current=' + this.currentPage + '&size=' + this.size);
       }


       public param($id) {
     
           return this.http.get(ModeleService.URL + 'Users/param/'+ $id);
       }
   
       public searchAll(keyword: string, current=0, size=5) {
           return this.http.get(ModeleService.URL + 'SearchN/searchLS?search='+ keyword+'&current='+current+'&size='+size)
           .pipe(
            tap(res => {
                this.modeles = res['data'];
                if(res['data'].length === 0){
                   this.messageErreur = 'pas de donnes dans la base';
                   this.modeles = res;
                } else {
                    console.log('donnees trouve', this.modeles.length);
                }

            }),
        );
       }
   
       public searchP(keyword: string, current=0, size=5) {
           
           return this.http.get(ModeleService.URL + 'SearchN/searchP?search=' + keyword+'&current='+current+'&size='+size)
           .pipe(
               tap(res => {
                if(res['data'].length === 0){
                    this.messageErreur = 'pas de donnes dans la base';
                    this.modeles = res;
                 } else {
                     console.log('donnees trouve');
                 }

               }),
   
           );
           }
           public searchE(keyword: string, current=0, size=5) {
               return this.http.get(ModeleService.URL + 'SearchN/searchE?search=' + keyword+'&current='+current+'&size='+size)
               .pipe(
                   tap (res => {
                    if(res['data'].length === 0){
                        this.messageErreur = 'pas de donnes dans la base';
                        this.modeles = res;
                     } else {
                        console.log('donnees trouve');
                     }
 
                    
                   }),
       
               );
           }
        public searchCarte(keyword: number) {
            return this.http.get(ModeleService.CARTE_URL + keyword , { headers: this.headers});

        }


        public searchCarteSingle(id: number, personne: number ) {
            return this.http.get(ModeleService.CARTE_URL_SINGLE + id + '/' + personne , { headers: this.headers});

        }


		public searchCarteSinglePersonnel(id: number) {
            return this.http.get(ModeleService.CARTE_URL_SINGLE_PERSONNEL + id, { headers: this.headers});

        }

		public searchCarteSinglePersonnelUpdate(id: number) {
            return this.http.get(ModeleService.CARTE_URL_SINGLE_PERSONNEL_UPDATE + id, { headers: this.headers});

        }
		
        public searchAide(){
            return this.http.get(ModeleService.URL_AIDE , { headers: this.headers});

        }

        public pays(){
            return this.http.get(ModeleService.URL_PAYS , { headers: this.headers});

        }
        public email(emailVerify:any){
            return this.http.post(ModeleService.URL_EMAIL_VERIFY ,{email:emailVerify}, { headers: this.headers});

        }
        public codeVerify(emailVerify:any, codeVerify:any){
            return this.http.post(ModeleService.URL_CODE_VERIFY ,{email:emailVerify,code:codeVerify}, { headers: this.headers});
        }
        public passWordReset(codeVerify:any,emailVerify:any,newPassword:any,repassword:any){
            return this.http.post(ModeleService.URL_PASSWORD_RESET ,
                {
                 acces:'toget-me@resetPassword_auth_access',
                 code:codeVerify,
                 email:emailVerify,
                 password:newPassword,
                 repassword:repassword
                },
                 { headers: this.headers}
                 );
        }



		dwd(){
		let w = window.confirm("Une mise à jour est disponible pour cette application. Voulez vous mettre à jour cette version ?");
		if(w){

		}else{
			
		}
	}
	getUpload(){

	}
    public delete(id: any) {
        return this.http.delete(ModeleService.DELETE_ELEMENT + id, { headers: this.headers}).pipe(
            tap(res => {
                console.log('delete');
            }),
        );
    }
}
