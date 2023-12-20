import { Injectable } from '@angular/core';
import { API_URL } from '../../lib/constants';
import { Coin } from '../../lib/types';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})

export class CoinService {
  constructor(private cookieService: CookieService) {}

  async getCoins(): Promise<Coin[] | null> {
    const get = await fetch(API_URL + '/api/Coin/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (get.status !== 200) {
      return null;
    }

    const response: Coin[] = await get.json();

    return response;
  }

  async getCoin(id: string): Promise<Coin | null> {
    const get = await fetch(API_URL + '/api/Coin/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (get.status !== 200) {
      return null;
    }

    const response: Coin = await get.json();

    return response;
  }

  async getCoinByCode(code: string): Promise<Coin | null> {
    const get = await fetch(API_URL + '/api/Coin/code/' + code, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (get.status !== 200) {
      return null;
    }

    const response: Coin = await get.json();
    console.log(response)

    return response;
  }

  async createCoin(coin: Coin): Promise<Coin | null> {
    if (!this.cookieService.get('token')) {
      return null;
    }

    const post = await fetch(API_URL + '/api/Coin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.cookieService.get('token'),
      },
      body: JSON.stringify({
        name: coin.name,
        code: coin.code,
        value: coin.value,
      }),
    });

    if (post.status !== 200) {
      return null;
    }

    const response: Coin = await post.json();

    return response;
  }

  async updateCoin(coin: Coin): Promise<boolean> {
    if (!this.cookieService.get('token')) {
      return false;
    }

    const put = await fetch(API_URL + '/api/Coin/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.cookieService.get('token'),
      },
      body: JSON.stringify({
        coinId: coin.id,
        name: coin.name,
        code: coin.code,
        value: coin.value,
      }),
    });

    if (put.status !== 200) {
      return false;
    }

    return true;
  }

  async deleteCoin(id: number): Promise<boolean> {
    if (!this.cookieService.get('token')) {
      return false;
    }

    const del = await fetch(API_URL + '/api/Coin/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.cookieService.get('token'),
      },
    });

    if (del.status !== 200) {
      return false;
    }

    return true;
  }

  async getTotalCoins(): Promise<number> {
    const get = await fetch(API_URL + '/api/Coin/count', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response: number = await get.json();

    return response;
  }

  async getCoinsPage(page: number): Promise<Coin[] | null> {
    if (!this.cookieService.get('token')) {
      return null;
    }

    const get = await fetch(API_URL + '/api/Coin/page/' + page, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (get.status !== 200) {
      return null;
    }

    const response: Coin[] = await get.json();

    return response;
  }
}