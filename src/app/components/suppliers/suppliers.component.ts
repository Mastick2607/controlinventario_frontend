import {Component, ViewChild,OnInit} from '@angular/core';
import { MatTableModule, MatTableDataSource} from '@angular/material/table';
import { SuppliersService  } from '../../services/suppliers.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common'; 
import { ActivatedRoute, Router } from '@angular/router';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {AuthService} from '../../services/auth.service'

@Component({
  selector: 'app-suppliers',
  standalone: true,
  imports: [MatTableModule,MatIconModule,CommonModule,MatPaginatorModule],
  templateUrl: './suppliers.component.html',
  styleUrl: './suppliers.component.css'
})
export class SuppliersComponent implements OnInit {


  displayedColumns: string[] = [ 'id','name','phone','email','address','country','actions'];
  dataSourceSuppliers = new MatTableDataSource<any>([]);


  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(
    private _suppliersService: SuppliersService,
    private _authService:AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSuppliers();
   }

   loadSuppliers() {
    this._suppliersService.getSuppliers().subscribe((data: any) => {
      this.dataSourceSuppliers = new MatTableDataSource(data.suppliers); // ✅ CORRECTO
      this.dataSourceSuppliers.paginator = this.paginator; // ✅ Asigna el paginador aquí   
   console.log(data);
   
    });
  }

  addSupplier() {
    this.router.navigate(['createsuppliers']);
  }

  
  editsupplier(idsupplier: string) {
    this.router.navigate(['editsupplier/',idsupplier]);
  }


  confirmDelete(id: string) {
   
    if (!this._authService.hasRole('super_admin') ) {
      alert('No tienes permisos para eliminar el proveedor.');
      return; 
    }
    
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar esta categoria?');
    if (confirmacion) {
      this.deleteProduct(id);
    }
  }

  deleteProduct(id:string) {
    this._suppliersService.deleteSuppliers(id).subscribe((data: any) => {
      alert('Proveedor eliminado con éxito');

      setTimeout(() => {
        this.loadSuppliers();
      }, 1000); 

    }, error => {
        console.error('Error al eliminar la proveedor', error);
      });
  }


}



