import {Component, ViewChild,OnInit} from '@angular/core';
import { MatTableModule, MatTableDataSource} from '@angular/material/table';
import {  CategoriesService } from '../../services/categories.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common'; 
import { ActivatedRoute, Router } from '@angular/router';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {AuthService} from '../../services/auth.service'

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [MatTableModule,MatIconModule,CommonModule,MatPaginatorModule],

  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {

  displayedColumns: string[] = ['id','name','actions'];
  dataSourceCategories = new MatTableDataSource<any>([]);


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  


  constructor(
    private _categoriesService: CategoriesService,
    private _authService:AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
   this.loadCategories();
  }

  loadCategories() {
    this._categoriesService.getCategories().subscribe((data: any) => {
      this.dataSourceCategories = new MatTableDataSource(data.categories); // ✅ CORRECTO
      this.dataSourceCategories.paginator = this.paginator; // ✅ Asigna el paginador aquí   
   console.log(data);
   
    });
  }

  addCategory() {
    this.router.navigate(['/createcategory']);
  }
  editCategory(idproduct: number) {
    this.router.navigate(['editcategory/',idproduct]);
  }

  confirmDelete(id: number) {
    
    if (!this._authService.hasRole('super_admin') ) {
      alert('No tienes permisos para eliminar categorias.');
      return; 
    }
    
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar esta categoria?');
    if (confirmacion) {
      this.deleteProduct(id);
    }
  }

  deleteProduct(id:number) {
    this._categoriesService.deleteCategory(id).subscribe((data: any) => {
      alert('Categoria eliminada con éxito');

      setTimeout(() => {
        this.loadCategories();
      }, 1000); 

    }, error => {
        console.error('Error al eliminar la categoria', error);
      });
  }



}
