import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import { MatTableModule, MatTableDataSource} from '@angular/material/table';
import { ProductsService } from '../../services/products.service';
// import { MatTableModule } from '@angular/material/table';
// import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common'; // ✅ IMPORTA ESTO
import { ActivatedRoute, Router } from '@angular/router';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {AuthService} from '../../services/auth.service'

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatTableModule,MatIconModule,CommonModule,MatPaginatorModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements AfterViewInit,OnInit{

  displayedColumns: string[] = ['id','codigo', 'name', 'description', 'price', 'quantity', 'actions'];
  dataSourceProducts = new MatTableDataSource<any>([]);

   @ViewChild(MatPaginator) paginator!: MatPaginator;
  
    ngAfterViewInit() {
      
    }

  constructor(
    private _productService: ProductsService,
 private _authService:AuthService,
    private router: Router
  ) {}
  products:any;
  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this._productService.getProducts().subscribe((data: any) => {
      this.dataSourceProducts = new MatTableDataSource(data.products); // ✅ CORRECTO
      this.dataSourceProducts.paginator = this.paginator; // ✅ Asigna el paginador aquí   
    });
  }

  addProduct() {
    this.router.navigate(['/createproduct']);
  }

  editProduct(idproduct: number) {
    this.router.navigate(['editProduct/',idproduct]);
  }

  confirmDelete(id: number) {
    if (!this._authService.hasRole('super_admin') ) {
      alert('No tienes permisos para eliminar productos.');
      return; 
    }


    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (confirmacion) {
      this.deleteProduct(id);
    }
  }

  deleteProduct(id:number) {
    this._productService.deleteProduct(id).subscribe((data: any) => {
      alert('Producto eliminado con éxito');

      setTimeout(() => {
        this.loadProducts ();
      }, 1000); 

    }, error => {
        console.error('Error al eliminar el producto', error);
      });
  }

}
