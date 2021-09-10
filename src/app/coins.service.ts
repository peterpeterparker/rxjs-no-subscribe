import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export type Coin = Record<string, string | number | boolean>;

@Injectable({
  providedIn: 'root'
})
export class CoinsService implements OnDestroy {
  constructor(private httpClient: HttpClient) {}

  private coins: Coin[] = [];

  private destroy$: Subject<void> = new Subject();

  list() {
    this.httpClient
      .get<Coin[]>(`https://api.coinpaprika.com/v1/coins`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((allCoins: Coin[]) => {
        if (allCoins.length > 10) {
          this.coins = allCoins.filter(
            (coin: Coin) =>
              !coin.is_new && coin.rank > 0 && coin.rank < 100
          );
        }
      });
  }

  getCoins(): Coin[] {
    return this.coins;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
