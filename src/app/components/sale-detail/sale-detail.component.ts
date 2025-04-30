import { Component } from '@angular/core';
import {SalesService} from '../../services/sales.service';
import { ActivatedRoute,Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // ✅ IMPORTA ESTO

@Component({
  selector: 'app-sale-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sale-detail.component.html',
  styleUrl: './sale-detail.component.css'
})
export class SaleDetailComponent {

sale:any;
idSale:number = 0;

   constructor(
    private activatedroute: ActivatedRoute,
      private router: Router,
      private _salesservice: SalesService
     ){
    }

    ngOnInit(): void {
      // this.getlowStockProducts();
     this.idSale = Number(this.activatedroute.snapshot.paramMap.get('id'));

   if( this.idSale){
    this.getSalesByIdP(this.idSale);
   }

     }
     goToDashboard() {
      this.router.navigate(['/dashboard']);
    }
   
     getSalesByIdP(id:number) {
      this._salesservice.getSalesById(id).subscribe((data: any) => {
        this.sale = data.sale;
        console.log(data);
      
      })
    }

}
