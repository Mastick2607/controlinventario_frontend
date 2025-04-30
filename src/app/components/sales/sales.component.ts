import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { SalesService } from '../../services/sales.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common'; // ✅ IMPORTA ESTO
import { Router } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {AuthService} from '../../services/auth.service'


@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [MatTableModule, MatIconModule, CommonModule, MatPaginatorModule],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css',
})
export class SalesComponent implements OnInit {
  displayedColumns: string[] = [
    'customer',
    'transfer_type',
    'document_type',
    'document_number',
    'product',
    'quantity',
    'sale_price',
    'subtotal',
    'iva',
    'total_price',
    'sale_date',
    'actions',
  ];

  dataSourceSales = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _authService:AuthService,
    private _salesService: SalesService, 
    private router: Router) {}

  ngOnInit(): void {
    this.loadSales();
  }

  loadSales() {
    this._salesService.getSales().subscribe((data: any) => {
      this.dataSourceSales = new MatTableDataSource(data.sales);
      this.dataSourceSales.paginator = this.paginator;
      console.log(this.dataSourceSales);
      console.log(data);
    });
  }

  addPurchases() {
    this.router.navigate(['createsale']);
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
      '¿Estás seguro de que deseas eliminar este registro?'
    );
    if (confirmacion) {
      this.deleteSales(id);
    }
  }

  deleteSales(id: string) {
    this._salesService.deleteSales(id).subscribe(
      () => {
        alert('Venta eliminada con éxito');

        setTimeout(() => {
          this.loadSales();
        }, 1000);
      },
      (error) => {
        console.error('Error al eliminar el cliente', error);
      }
    );
  }
}
