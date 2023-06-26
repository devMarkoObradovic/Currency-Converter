import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Currency } from '../models/currency.model';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private baseUrl = 'https://api.getgeoapi.com/v2/currency';
  private KEY = '7a1ee266d0aeae063465f7863f229d8798c33766';

  constructor(private http: HttpClient) {}

  getData(
    currencyTo: string,
    currencyFrom: string,
    amount: string
  ): Observable<Currency> {
    const url = `${this.baseUrl}/convert?api_key=${this.KEY}`;
    const params = new HttpParams()
      .set('format', 'json')
      .set('from', currencyFrom)
      .set('to', currencyTo)
      .set('amount', amount);
    return this.http.get<Currency>(url, { params: params });
  }

  getList(): Observable<any> {
    const url = `${this.baseUrl}/list?api_key=${this.KEY}`;
    return this.http.get(url);
  }
}
