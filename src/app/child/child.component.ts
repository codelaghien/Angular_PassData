import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
})
export class ChildComponent implements OnInit, OnChanges, OnDestroy {
  @Input() users: any;
  @Output() usersChange = new EventEmitter();

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private dataServiceService: DataServiceService) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Child ngOnChanges', changes?.users?.currentValue);
  }

  ngOnInit(): void {
    console.log('Child', this.users);
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  refreshData(): void {
    this.dataServiceService
      .getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        // console.log('Child', data);
        this.users = data?.results?.slice(0, 5);
        console.log('Child', this.users);

        this.usersChange.emit(this.users);
      });
  }
}
