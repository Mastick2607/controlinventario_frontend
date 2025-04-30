import {Component, ViewChild,OnInit} from '@angular/core';
import { MatTableModule, MatTableDataSource} from '@angular/material/table';
import { CustomersService  } from '../../services/customers.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {AuthService} from '../../services/auth.service'

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [MatTableModule,MatIconModule,CommonModule,MatPaginatorModule],

  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit  {

  displayedColumns: string[] = ['id','name','phone','email','address','actions'];
  dataSourceCustomers= new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(
    private _customersService: CustomersService,
    private _authService:AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
   }


   loadCustomers() {
    this._customersService.getCustomers().subscribe((data: any) => {
      this.dataSourceCustomers = new MatTableDataSource(data.customer); // ✅ CORRECTO
      this.dataSourceCustomers.paginator = this.paginator; // ✅ Asigna el paginador aquí   
   console.log(data);
   
    });
  }

  addCustomers() {
    this.router.navigate(['createcustomers']);
  }

  editCustomers(idCustomers: string) {
    this.router.navigate(['editcustomers/',idCustomers]);
  }


  confirmDelete(id: string) {
    if (!this._authService.hasRole('super_admin') ) {
      alert('No tienes permisos para eliminar el cliente.');
      return; 
    }
    
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este cliente?');
    if (confirmacion) {
      this.deleteProduct(id);
    }
  }

  deleteProduct(id:string) {
    this._customersService.deleteCustomers(id).subscribe(() => {
      alert('Cliente eliminado con éxito');

      setTimeout(() => {
        this.loadCustomers();
      }, 1000); 

    }, error => {
        console.error('Error al eliminar el cliente', error);
      });
  }

}
