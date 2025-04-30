import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { PurchasesService } from '../../services/purchases.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {AuthService} from '../../services/auth.service'

@Component({
  selector: 'app-purchases',
  standalone: true,
  imports: [MatTableModule, MatIconModule, CommonModule, MatPaginatorModule],

  templateUrl: './purchases.component.html',
  styleUrl: './purchases.component.css',
})
export class PurchasesComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'supplier',
    'transfer_type',
    'document_type',
    'document_number',
    'entry_date',
    'product',
    'purchase_price',
    'quantity',
    'subtotal',
    'iva',
    'total_price',
    'actions',
  ];

  dataSourcePurchases = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _purchasesService: PurchasesService,
    private _authService:AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPurchases();
  }

  loadPurchases() {
    this._purchasesService.getpurchases().subscribe((data: any) => {
      this.dataSourcePurchases = new MatTableDataSource(data.purchases);
      this.dataSourcePurchases.paginator = this.paginator;
      console.log(this.dataSourcePurchases);
      console.log(data);
    });
  }

  addPurchases() {
    this.router.navigate(['createpurchase']);
  }

  // editCustomers(idCustomers: string) {
  //   this.router.navigate(['editcustomers/',idCustomers]);
  // }

  confirmDelete(id: string) {
 
    if (!this._authService.hasRole('super_admin') ) {
      alert('No tienes permisos para eliminar el registro.');
      return; 
    }
 
    const confirmacion = window.confirm(
      '¿Estás seguro de que deseas eliminar esta registro?'
    );
    if (confirmacion) {
      this.deletePurchases(id);
    }
  }

  deletePurchases(id: string) {
    this._purchasesService.deletepurchases(id).subscribe(
      () => {
        alert('Compra eliminada con éxito');

        setTimeout(() => {
          this.loadPurchases();
        }, 1000);
      },
      (error) => {
        console.error('Error al eliminar el cliente', error);
      }
    );
  }
}
