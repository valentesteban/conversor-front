import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { API_URL } from '../../lib/constants';
import { Exchange } from '../../lib/types';

@Injectable({
  providedIn: 'root',
})

export class ExchangeService {
  constructor(private cookieService: CookieService) {}

  async getExchangeUser(id: number): Promise<Exchange[] | null> {
    if (!this.cookieService.get('token')) {
      return null;
    }

    const get = await fetch(API_URL + '/api/Exchange/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.cookieService.get('token'),
      },
    });

    if (get.status !== 200) {
      return null;
    }

    const response: Exchange[] = await get.json();

    if (response.length > 0) {
      response.forEach((exchange) => {
        exchange.date = new Date(exchange.date);
      });
      return response;
    }

    return response;
  }

  async postExchange(
    userId: number,
    from: number,
    to: number,
    amount: number
  ): Promise<Exchange | null> {
    if (!this.cookieService.get('token')) {
      return null;
    }

    const post = await fetch(API_URL + '/api/Exchange', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.cookieService.get('token'),
      },
      body: JSON.stringify({
        userId: userId,
        fromCoinId: from,
        toCoinId: to,
        amount: amount,
      }),
    });

    if (post.status !== 200) {
      return null;
    }

    const response: Exchange = await post.json();

    if (response) {
      response.date = new Date(response.date);
      
      return response;
    }

    return null;
  }

  async getExchanges(): Promise<Exchange[] | null> {
    if (!this.cookieService.get('token')) {
      return null;
    }

    const get = await fetch(API_URL + '/api/Exchange/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.cookieService.get('token'),
      },
    });

    if (get.status !== 200) {
      return null;
    }

    const response: Exchange[] = await get.json();

    if (response.length > 0) {
      response.forEach((exchange) => {
        exchange.date = new Date(exchange.date);
      });
      return response;
    }

    return response;
  }

  async getExchangePage(page: number): Promise<Exchange[] | null> {
    if (!this.cookieService.get('token')) {
      return null;
    }

    const get = await fetch(API_URL + '/api/Exchange/page/' + page, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.cookieService.get('token'),
      },
    });

    if (get.status !== 200) {
      return null;
    }

    const response: Exchange[] = await get.json();

    if (response.length > 0) {
      response.forEach((exchange) => {
        exchange.date = new Date(exchange.date);
      });
      return response;
    }

    return response;
  }

  async getTotalExchanges(): Promise<number | null> {
      if (!this.cookieService.get('token')) {
        return null;
      }
  
      const get = await fetch(API_URL + '/api/Exchange/count', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.cookieService.get('token'),
        },
      });
  
      if (get.status !== 200) {
        return null;
      }
  
      const response: number = await get.json();
      console.log(response);
  
      return response;
    }
}