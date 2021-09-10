import { Component, OnDestroy, OnInit } from '@angular/core';
import { CoinsService } from '../coins.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.css']
})
export class CoinsComponent implements OnInit, OnDestroy {
  constructor(private readonly coinsService: CoinsService) {}

  private destroy$: Subject<void> = new Subject<void>();

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

  get coins() {
    return this.coinsService.getCoins();
  }
}
