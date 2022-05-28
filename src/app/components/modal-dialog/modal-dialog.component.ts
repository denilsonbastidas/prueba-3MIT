import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css'],
})
export class ModalDialogComponent implements OnInit {
  @Input('coinSelected') coinSelected!: any;
  totalSpent: number = 0;
  formTranstation: FormGroup = new FormGroup({
    quantity: new FormControl('', Validators.required),
  });
  wallet: any = localStorage.getItem('wallet');

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.formTranstation.valueChanges.subscribe((form) => {
      this.totalSpent = form.quantity * this.coinSelected?.current_price;
    });
  }

  createOperation() {
    const objectOperations = {
      name: this.coinSelected?.name,
      priceBuy: this.coinSelected?.current_price,
      spent: this.totalSpent,
      quantity: this.formTranstation.value.quantity,
    };

    // almacenamos la informacion en el navegador de manera como si fuera un BD
    if (localStorage.getItem('wallet') == null) {
      const wallet = [];
      wallet.push(this.totalSpent);
      localStorage.setItem('wallet', JSON.stringify(wallet));
    } else {
      const wallet = JSON.parse(localStorage.getItem('wallet')!);
      wallet.push(this.totalSpent);
      localStorage.setItem('wallet', JSON.stringify(wallet));
    }

    if (localStorage.getItem('operations') == null) {
      const operations = [];
      operations.push(objectOperations);
      localStorage.setItem('operations', JSON.stringify(operations));
    } else {
      const operations = JSON.parse(localStorage.getItem('operations')!);
      operations.push(objectOperations);
      localStorage.setItem('operations', JSON.stringify(operations));
    }
    this.router.navigate(['/portafolio']);
    this.formTranstation.reset();
  }
}
