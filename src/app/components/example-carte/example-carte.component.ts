import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-example-carte',
  templateUrl: './example-carte.component.html',
  styleUrls: ['./example-carte.component.scss'],
})
export class ExampleCarteComponent implements OnInit {

  @Input('_id') _id: number;
  @Input('code') code : string;
  @Input('content') content : string;
  @Input('image_fond') image_fond: string;
  @Output() share = new  EventEmitter<any>();
  @Output() ajouter = new  EventEmitter<any>();

 // @ViewChild('innerHtml') innerHtml: ElementRef;
  @ViewChild('innerHtml', {static: false}) innerHtml : ElementRef;

  link:any;

  constructor() { }

  ngOnInit() {}

  onPartager(){
    this.link = 'http://192.168.8.200:8100/share/'+this._id+'/'+this.code;
    this.share.emit({value:this.link});

  }
  onAjouter(){
    this.ajouter.emit({value:this._id});
   }

   

}
