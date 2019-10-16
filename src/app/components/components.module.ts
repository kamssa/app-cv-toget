import { NgModule } from '@angular/core';
import { ModeleCarteComponent } from './modele-carte/modele-carte.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ExampleCarteComponent } from './example-carte/example-carte.component';
import { ExpandableComponent } from './expandable/expandable.component';

import { ZoomCarteDirective } from '../directives/zoom-carte.directive';
import { FilterPipeModule } from 'ngx-filter-pipe';
@NgModule({
    imports: [
        CommonModule,
        IonicModule, FilterPipeModule
    ],
    declarations: [ModeleCarteComponent,ExampleCarteComponent,ExpandableComponent, ZoomCarteDirective],
    exports:[ModeleCarteComponent,ExampleCarteComponent, ExpandableComponent],entryComponents: [ExpandableComponent]
  })
  export class ComponentsModule {}
