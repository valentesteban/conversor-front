import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Coin } from '../../../lib/types';

@Component({
  selector: 'app-coins',
  standalone: true,
  imports: [],
  templateUrl: './coins.component.html'
})
export class CoinsComponent implements OnInit {
  @Input() coins: Coin[] = [];
  @Input() actual: Coin | null = null;
  @Input() type: string = '';
  @Input() result: number = 0;
  
  @Output() resultChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() actualChange: EventEmitter<Coin> = new EventEmitter<Coin>();

  coinCopy: Coin[] = [];
  find = '';
  
  updateCoin(coin: Coin): void {
    this.actual = coin;
    this.find = '';
    this.coinCopy = this.coins;
    this.actualChange.emit(coin);
    this.resultChange.emit(0);

    window.document.getElementById(this.type + '-dropdown-coin')?.blur();
  }

  constructor() {}

  ngOnInit(): void {
    this.coinCopy = this.coins;
  }

  changeFind(): void {
    this.coinCopy = this.coins.filter((coin) => {
      return coin.code.toLowerCase().includes(this.find.toLowerCase());
    });
  }

  close(){
    this.find = '';
    this.coinCopy = this.coins;
    window.document.getElementById(this.type + '-dropdown-coin')?.blur();
  }
}
