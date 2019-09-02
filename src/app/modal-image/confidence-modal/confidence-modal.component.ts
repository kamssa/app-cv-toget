import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { ViewController } from '@ionic/core';

@Component({
  selector: 'app-confidence-modal',
  templateUrl: './confidence-modal.component.html',
  styleUrls: ['./confidence-modal.component.scss'],
})
export class ConfidenceModalComponent implements OnInit {

  // confidence: number;
  @Output('update') update : EventEmitter<number> = new EventEmitter<number>();
  @Input('titre') titre: string;
  @Input('confidence') confidence: number;

  constructor(navParams: NavParams, private popOverCtrl: PopoverController) {}
  
    ngOnInit() {}

    changeConfidence(){
        if (this.confidence) {
          this.update.emit( this.confidence);
          this.closePopover(this.confidence);
        }
    }

    closePopover(data: any){
      this.popOverCtrl.dismiss(data);
    }


}
