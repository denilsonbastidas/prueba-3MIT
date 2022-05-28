import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CoinsService } from 'src/app/services/coins.service';

@Component({
  selector: 'app-portafoly',
  templateUrl: './portafolio.component.html',
  styleUrls: ['./portafolio.component.css'],
})
export class PortafolioComponent implements OnInit {
  operations: any[] = JSON.parse(localStorage.getItem('operations')!);

  wallet: string[] = JSON.parse(localStorage.getItem('wallet')!);

  totalWallet: string = '0';

  coinsOperations$: Observable<any> = this.coinsService
    .getCoins()
    .pipe(
      map((coins) =>
        coins.filter((coin: any) => this.coinSelectedName.includes(coin.name))
      )
    );

  constructor(private coinsService: CoinsService) {}

  get coinSelectedName() {
    return this.operations.map((coin) => coin.name);
  }
  ngOnInit(): void {
    if (this.wallet?.length) {
      this.totalWallet = this.wallet.reduce((acc, curr) => acc + curr);
    }
  }

  removeOperations(cointName: string) {
    const operations = JSON.parse(localStorage.getItem('operations')!);
    for (let i = 0; i < operations.length; i++) {
      if (this.operations[i]?.name === cointName) {
        operations.splice(i, 1);
      }
    }
    localStorage.setItem('operations', JSON.stringify(operations));
  }
}
