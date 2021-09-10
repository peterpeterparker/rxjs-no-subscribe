import { Component, OnInit } from '@angular/core';
import { CoinsService } from '../coins.service';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.css']
})
export class CoinsComponent implements OnInit {
  constructor(private readonly coinsService: CoinsService) {}

  ngOnInit(): void {
    this.coinsService.list();
  }

  get coins() {
    return this.coinsService.getCoins();
  }
}
