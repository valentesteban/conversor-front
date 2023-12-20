import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { CoinService } from '../../services/coin.service';
import { Exchange, Coin, Plan, User } from '../../../lib/types';
import { ExchangeService } from '../../services/exchange.service';
import { ExchangeComponent } from '../../components/exchange/exchange.component';
import { PlanService } from '../../services/plan.service';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    standalone: true,
    imports: [ExchangeComponent, CommonModule],
  })
export class HomeComponent implements OnInit {
  coins: Coin[] = [];
  exchanges: Exchange[] = [];
  user: User | null = null;
  plan: Plan | null = null;

  coinCount: number = 0;
  loading: boolean = true;
  isLoginPage: boolean = false;
  logged: boolean = false;

  constructor(
    private userService: UserService,
    private coinService: CoinService,
    private planService: PlanService,
    private exchangeService: ExchangeService,
    private loginService: LoginService
  ) {}

  async ngOnInit(): Promise<void> {
    const getCoins = await this.coinService.getCoins();
    const count = await this.coinService.getTotalCoins();
    const isLogged = await this.loginService.isLogged();

    if (isLogged) {
      this.logged = isLogged;
    }

    if (getCoins) {
      this.coins = getCoins;
    }

    if (count) {
      this.coinCount = count;
    }

    const getUser = await this.userService.getUserLogged();

    if (!getUser) {
      this.loading = false;

      return;
    }

    this.user = getUser;

    const getExchanges = await this.exchangeService.getExchangeUser(
      this.user.id
    );

    if (getExchanges) {
      this.exchanges = getExchanges;
    }

    const getPlan = await this.planService.findPlan(this.user.plan.id);

    if (getPlan) {
      this.plan = getPlan;
    }

    this.loading = false;
  }

  
}