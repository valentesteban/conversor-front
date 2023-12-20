import { Injectable } from '@angular/core';
import { API_URL } from '../../lib/constants';
import { Plan } from '../../lib/types';

@Injectable({
  providedIn: 'root',
})

export class PlanService {
  async findPlan(id: number): Promise<Plan | null> {
    const get = await fetch(API_URL + '/api/Plan/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (get.status !== 200) {
      return null;
    }

    const response: Plan = await get.json();

    return response;
  }
}