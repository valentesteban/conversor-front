import { Injectable } from '@angular/core';
import { API_URL } from '../../lib/constants';
import { CookieService } from 'ngx-cookie-service';
import { User, UserForUpdate } from '../../lib/types';

@Injectable({
  providedIn: 'root',
})

export class UserService {
  constructor(private cookieService: CookieService) {}

  async getUserLogged(): Promise<User | null> {
    if (!this.cookieService.get('token')) {
      return null;
    }

    const token = this.cookieService.get('token').split('.');
    const user = JSON.parse(atob(token[1]));
    const id = user.userId;

    const get = await fetch(API_URL + '/api/User/id/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.cookieService.get('token'),
      },
    });

    if (get.status !== 200) {
      return null;
    }

    const response: User = await get.json();

    return response;
  }

  async existEmail(email: string): Promise<boolean> {
    const get = await fetch(API_URL + '/api/User/check/' + email, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (get.status !== 200) {
      return false;
    }

    const response: boolean = await get.json();

    return response;
  }

  async getUsers(): Promise<User[] | null> {
    if (!this.cookieService.get('token')) {
      return null;
    }

    const get = await fetch(API_URL + '/api/User/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.cookieService.get('token'),
      },
    });

    if (get.status !== 200) {
      return null;
    }

    const response: User[] = await get.json();

    return response;
  }

  async getUsersPage(page: number): Promise<User[] | null> {
    if (!this.cookieService.get('token')) {
      return null;
    }

    const get = await fetch(API_URL + '/api/User/page/' + page, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.cookieService.get('token'),
      },
    });

    if (get.status !== 200) {
      return null;
    }

    const response: User[] = await get.json();

    return response;
  }

  async findUser(input: string): Promise<User[] | null> {
    if (!this.cookieService.get('token')) {
      return null;
    }

    const get = await fetch(API_URL + '/api/User/find/' + input, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.cookieService.get('token'),
      },
    });

    if (get.status !== 200) {
      return null;
    }

    const response: User[] = await get.json();

    return response;
  }

  async getUsersCount(): Promise<number | null> {
    if (!this.cookieService.get('token')) {
      return null;
    }

    const get = await fetch(API_URL + '/api/User/counter', {
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

    return response;
  }

  async updateUser(user: UserForUpdate): Promise<boolean> {
    if (!this.cookieService.get('token')) {
      return false;
    }

    //update user
    const putUser = await fetch(API_URL + '/api/User/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.cookieService.get('token'),
      },
      body: JSON.stringify({
        id: user.id,
        userName: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      }),
    });

    if (putUser.status !== 200) {
      return false;
    }

    //update plan
    const putPlan = await fetch(API_URL + '/api/User/plan/' + user.id + "?planId=" + user.planId , {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.cookieService.get('token'),
      },
    });

    if (putPlan.status !== 200) {
      return false;
    }

    return true;
  }

  async deleteUser(id: number): Promise<boolean> {
    if (!this.cookieService.get('token')) {
      return false;
    }

    const deleteUser = await fetch(API_URL + '/api/User/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.cookieService.get('token'),
      },
    });

    if (deleteUser.status !== 200) {
      return false;
    }

    return true;
  }
}