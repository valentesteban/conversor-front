import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Exchange, Coin, Plan, User } from '../../../lib/types';
import { getColorFromMax, getFillFromMax } from '../../../lib/util';
import { CoinsComponent } from '../coins/coins.component';
import { ExchangeService } from '../../services/exchange.service';

@Component({
  selector: 'app-exchange',
  standalone: true,
  templateUrl: './exchange.component.html',
  imports: [
    CommonModule,
    FormsModule,
    CoinsComponent,
    ReactiveFormsModule,
  ],
})
export class ExchangeComponent implements OnInit {
  @Input() coins: Coin[] = [];
  @Input() exchanges: Exchange[] = [];
  @Input() user: User | null = null;
  @Input() plan: Plan | null = null;

  from: Coin | null = null;
  to: Coin | null = null;
  amount = new FormControl('', [Validators.required, Validators.min(0)]);
  result: number = 0;

  color: string = '#000000';
  fill: string = '#000000';
  error: string = '';

  logged: boolean = false;
  loading: boolean = false;
  exchangeSuccess: boolean = false;

  constructor(private exchangeService: ExchangeService) {}

  parseErrors(errors: ValidationErrors) {
    if (errors == null) {
      return;
    }

    if (errors?.['required']) {
      return 'Completa este campo';
    }

    if (errors?.['min']) {
      return 'El campo debe tener un valor mínimo de ' + errors?.['min'].min;
    }

    return '';
  }

  exchangesLimit(): boolean {
    return this.exchangesRemaining() == 0;
  }

  setColors(){
    this.color = getColorFromMax(
      this.plan!.limit - this.totalExchanges(),
      this.plan!.limit
    );

    this.fill = getFillFromMax(
      this.plan!.limit - this.totalExchanges(),
      this.plan!.limit
    );
  }

  swapCoins() {
    const aux = this.from;
    this.from = this.to;
    this.to = aux;
    this.result = 0;
  }

  totalExchanges(): number {
    return this.exchanges.length;
  }

  exchangesRemaining() {
    if (this.plan == null) {
      return 0;
    }

    if (this.plan.limit == -1) {
      return -1;
    }

    return this.plan.limit - this.totalExchanges();
  }

  reachedLimit() {
    if (this.plan == null) {
      return false;
    }

    if (this.plan.limit == -1) {
      return false;
    }

    return this.totalExchanges() >= this.plan.limit;
  }

  canConvert(): boolean {
    if (this.from != null && this.to != null && this.amount != null && !this.reachedLimit()) {
      return this.from && this.to && Number(this.amount.value) > 0;
    } else {
      return false;
    }
  }

  setFrom(foreing: Coin): void {
    this.from = foreing;
    this.result = 0;
  }

  setTo(foreing: Coin): void {
    this.to = foreing;
    this.result = 0;
  }

  async convert() {
    if (
      !this.logged ||
      this.loading ||
      !this.canConvert() ||
      !this.amount.valid ||
      this.reachedLimit()
    ) {
      return;
    }

    if (
      this.from == null ||
      this.to == null ||
      this.amount == null ||
      this.user == null
    ) {
      return;
    }

    if (this.from.id == this.to.id) {
      this.error = 'No se puede convertir entre la misma moneda';
      return;
    }

    this.loading = true;

    const exchangePost = await this.exchangeService.postExchange(
      this.user.id,
      this.from.id,
      this.to.id,
      Number(this.amount.value)
    );

    setTimeout(() => {
      if (!exchangePost) {
        this.error = 'No se pudo realizar la conversión';
        return;
      }

      this.exchanges.push(exchangePost);
      this.result =
        (Number(this.amount.value) * this.from?.value!) / this.to!.value;
      this.error = '';

      this.setColors();

      this.loading = false;
      this.exchangeSuccess = true;
    }, 1000);

    setTimeout(() => {
      this.exchangeSuccess = false;
    }, 5000);
  }

  ngOnInit(): void {
    if (this.plan != null) {
      this.setColors();
    }

    if (this.user != null) {
      this.logged = true;
    }

    this.to = this.coins[0];
    this.from = this.coins[1];

    this.coins = this.coins.sort((a, b) => {
      if (a.code < b.code) {
        return -1;
      }

      if (a.code > b.code) {
        return 1;
      }

      return 0;
    });
  }
}