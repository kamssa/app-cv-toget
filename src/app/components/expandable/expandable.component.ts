import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-expandable',
  templateUrl: './expandable.component.html',
  styleUrls: ['./expandable.component.scss'],
})
export class ExpandableComponent implements OnInit {
@Input('boucle') boucle: boolean;
@Input('boucleSmall') boucleSmall = false;
@Input('boucleSmallLeft') boucleSmallLeft = false;
 

  constructor() { }


  ngOnInit() {}

}
