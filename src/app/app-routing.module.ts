import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGardService} from './services/auth-gard.service';
import { TabsPage } from './tabs/tabs.page';
const routes: Routes = [
  { path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: '/tabs/accueil',
        pathMatch: 'full'
      },
      {
        path: 'accueil',
        children: [
          { path: '', loadChildren: './accueil/accueil.module#AccueilPageModule' }
        ]
      },
      
      {
        path: 'ma-collection',
        children: [
          {path: '', loadChildren: './ma-collection/ma-collection.module#MaCollectionPageModule',
            canActivate: [ AuthGardService ]},
        ]
      },
      
      {
        path: 'demande',
        children: [
          { path: '', loadChildren: './commentaire/commentaire.module#CommentairePageModule' }
        ]
      },
      
      {
        path: '',
        redirectTo: '/tabs/accueil',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'collection',
    children: [   
      { path: '', loadChildren: './collection/collection.module#CollectionPageModule'
      }
    ]
  },
  { 
    path: 'register',
    loadChildren: './resgistration/register/register.module#RegisterPageModule',
	   canActivate:[AuthGardService]
   },
   { 
	path: 'connexion', 
	loadChildren: './resgistration/connexion/connexion.module#ConnexionPageModule',
	canActivate:[AuthGardService]
     
   },
  {
    path: '',
    redirectTo: '/tabs/accueil',
    pathMatch: 'full'
  },
  { path: 'particulier',
   children:[
     {path: '', loadChildren: './particulier/particulier.module#ParticulierPageModule'
    }
   ]  
  },
  // { path: 'parametres', loadChildren: './components/parametres/parametres.module#ParametresPageModule' },
 // { path: 'a-props', loadChildren: './a-props/a-props.module#APropsPageModule' },
  //{ path: 'param', loadChildren: './param/param.module#ParamPageModule' },
  //{ path: 'modal-image', loadChildren: './modal-image/modal-image.module#ModalImagePageModule' }

  // {
  //   path: '',
  //   redirectTo: 'accueil',
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'accueil',
  //   loadChildren: './accueil/accueil.module#AccueilPageModule'
  // },
  // { 
  //  path: 'ma-collection',
  //  loadChildren: './ma-collection/ma-collection.module#MaCollectionPageModule',
  //  canActivate:[AuthGardService]
   
  //  },
  // { 
  //   path: 'register',
  //   loadChildren: './resgistration/register/register.module#RegisterPageModule',
	// canActivate:[AuthGardService]
  //  },
  //  { 
  //       path: 'connexion', 
  //       loadChildren: './resgistration/connexion/connexion.module#ConnexionPageModule',
	// 	canActivate:[AuthGardService]
     
  //  },
  // { 
  //   path: 'commentaire', 
  //   loadChildren: './commentaire/commentaire.module#CommentairePageModule'
  //  },
  // { path: 'aide', loadChildren: './aide/aide.module#AidePageModule' },
  // { path: 'collection', loadChildren: './collection/collection.module#CollectionPageModule' },
  // { path: 'entreprise', loadChildren: './entreprise/entreprise.module#EntreprisePageModule' },
  { path: 'presentation', loadChildren: './presentation/presentation.module#PresentationPageModule' },
  // { path: 'single-carte', loadChildren: './single-carte/single-carte.module#SingleCartePageModule' },
  // { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule] 
})
export class AppRoutingModule {}