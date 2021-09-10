import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { Coin, CoinsService } from '../coins.service';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.css']
})
export class CoinsComponent {
  constructor(private readonly coinsService: CoinsService) {}

  readonly coins$: Observable<Coin[]> = this.coinsService.coins$;
}
