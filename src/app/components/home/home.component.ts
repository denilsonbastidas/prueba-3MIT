import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { CoinsService } from 'src/app/services/coins.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  coinSelected!: object;
  searchCrypto: FormControl = new FormControl('');
  coinsMarket$: Observable<any> = this.coinsService
    .getCoins()
    .pipe(
      switchMap((coins) =>
        this.searchCrypto.valueChanges
          .pipe(startWith(''))
          .pipe(
            map((inputValue) =>
              coins.filter(
                (coin: any) =>
                  coin.name.toLowerCase().includes(inputValue.toLowerCase()) ||
                  coin.symbol.toLowerCase().includes(inputValue.toLowerCase())
              )
            )
          )
      )
    );

  constructor(private coinsService: CoinsService) {}

  ngOnInit(): void {}
}
