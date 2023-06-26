import { Component, OnInit } from '@angular/core';

import { CurrencyService } from './services/currency.service';
import { Currency } from './models/currency.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Currency-Converter';
  currencyData!: Currency;
  currencyFrom: string = 'EUR';
  currencyTo: string = 'USD';
  amount: string = '1';
  currencies: any;
  excangeForm!: FormGroup;

  constructor(private currencyservice: CurrencyService) {}

  getExchage(currencyTo: string, currencyFrom: string, amount: string) {
    this.currencyservice
      .getData(currencyTo, currencyFrom, amount)
      .subscribe((res) => {
        this.currencyData = res;
        console.log(res);
      });
  }

  getCurrencyList() {
    this.currencyservice.getList().subscribe((res) => {
      this.currencies = res.currencies;
      console.log(this.currencies);
    });
  }

  ngOnInit(): void {
    this.getCurrencyList();
    this.onConvert();
    this.excangeForm = new FormGroup({
      amount: new FormControl(null, Validators.required),
      currencyFrom: new FormControl('EUR', Validators.required),
      currencyTo: new FormControl('USD', Validators.required),
    });
  }

  onConvert() {
    this.getExchage(this.currencyTo, this.currencyFrom, this.amount);
  }

  onSubmit() {
    if (this.excangeForm.valid) this.amount = this.excangeForm.value.amount;
    this.currencyFrom = this.excangeForm.value.currencyFrom.slice(0, 3);
    this.currencyTo = this.excangeForm.value.currencyTo.slice(0, 3);
    console.log(this.excangeForm.value);
    this.onConvert();
  }
}
