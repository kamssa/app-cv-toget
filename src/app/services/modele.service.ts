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
    static readonly URL_AIDE =  AppConfig.URL+'aides';
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
		
        public searchAide(){
            return this.http.get(ModeleService.URL_AIDE , { headers: this.headers});

        }



		dwd(){
		let w = window.confirm("Une mise à jour est disponible pour cette application. Voulez vous mettre à jour cette version ?");
		if(w){
			// this.storage.set('UPLOAD', this.uploaded_val);
			 // this.uploaded = false;
			 // window.location="http://play.google.com/store/search?q=maps&c=apps";
		}else{
			
		}
	}
	getUpload(){
	/*	this.storage.get('UPLOAD').then(resp => {
            if(resp >= 0){
                this.uploaded = false;
				this.param(1).subscribe((respis:any) => {
						   if(respis){
							   if(respis.status == 200){
								   // console.log(0);
								   if(respis.data[0].status_param > resp){
									   // console.log(1);
									   this.uploaded_val = respis.data[0].status_param;
											this.uploaded = true;
								   }
							   }
						   }
				},err => {
					console.log(err);
				});
            }else{
				this.storage.set('UPLOAD', 0);
				// console.log(2);
			}
        },(error)=>{ 
		
		console.log('error', error);
		this.storage.set('UPLOAD', 0);
		});*/
	}
    public delete(id: any) {
        return this.http.delete(ModeleService.DELETE_ELEMENT + id, { headers: this.headers}).pipe(
            tap(res => {
                console.log('delete');
            }),
        );
    }
}
