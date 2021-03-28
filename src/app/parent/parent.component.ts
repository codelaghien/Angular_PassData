import { Component, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss'],
})
export class ParentComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  users = [];
  totalUsers = 0;

  constructor(private dataServiceService: DataServiceService) {}

  ngOnInit(): void {
    // this.refreshData();
  }

  refreshData(): void {
    console.log('Parent: current total users = ' + this.totalUsers);
    this.dataServiceService
      .getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        // console.log('Parent', data);
        this.users = data?.results?.slice(0, 5);
        this.totalUsers = this.users.length;
        console.log('Parent', this.users);
      });
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
