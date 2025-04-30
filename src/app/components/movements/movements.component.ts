import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MovementsService } from '../../services/movements.service';
import { PurchasesService } from '../../services/purchases.service';
import { SalesService } from '../../services/sales.service';

import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common'; //  IMPORTA ESTO
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { faEye } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-movements',
  standalone: true,
  imports: [MatTableModule, MatIconModule, CommonModule, MatPaginatorModule,FontAwesomeModule],
  templateUrl: './movements.component.html',
  styleUrl: './movements.component.css'
})
export class MovementsComponent  implements OnInit {
  faEye = faEye;

  selectedMovement: any = null;
  displayedColumns: string[] = [
    'id',






    
    'product',
    // 'purchase',
    // 'sale',
    'quantity',
    'unit_price',
    'subtotal_movements',
    'iva',
    'totalprice',
    'transfer_type',
    'document_type',
    'document_number',
    'movement_date',
    'actions',

  ];

  dataSourceMovements = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    
     private _purchasesService:PurchasesService,
    private _salesService:SalesService,
    private _movementsService: MovementsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMovements();
  }

  loadMovements() {
    this._movementsService.getMovements().subscribe((data: any) => {
      this.dataSourceMovements = new MatTableDataSource(data.movements);
      this.dataSourceMovements.paginator = this.paginator;
      console.log(this.dataSourceMovements);
      console.log(data);
    });
  }


  openDetailsModal(element: any) {
    if (element.purchase_id) {
      this._purchasesService.getpurchasesById(element.purchase_id).subscribe(data => {
        this.selectedMovement = { type: 'purchase', details: data };
    console.log(data);
    
      });
    } else if (element.sale_id) {
      this._salesService.getSalesById(element.sale_id).subscribe(data => {
        this.selectedMovement = { type: 'sale', details: data };
        console.log(data);
      });
    }
  }

  closeModal() {
    this.selectedMovement = null; // Cierra el modal limpiando la variable
  }
 
}
