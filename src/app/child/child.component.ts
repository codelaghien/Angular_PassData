import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
})
export class ChildComponent implements OnInit, OnChanges {
  @Input() users: any;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Child ngOnChanges', changes?.users?.currentValue);
  }

  ngOnInit(): void {
    console.log('Child', this.users);
  }
}
