import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Coin, CoinsService } from '../coins.service';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.css']
})
export class CoinsComponent implements OnInit, OnDestroy {
  constructor(private readonly coinsService: CoinsService) {}

  private destroy$: Subject<void> = new Subject<void>();

  coins$: Observable<Coin[]> = this.coinsService.coins$;

  ngOnInit(): void {
    this.coinsService
      .list()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {});
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
