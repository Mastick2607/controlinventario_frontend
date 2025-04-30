import { Component,OnInit } from '@angular/core';
import {ProductsService} from '../../services/products.service';
import { ActivatedRoute,Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // ✅ IMPORTA ESTO
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {
  product:any[] =[];
  categories:any[] =[];
  idPro:number =0;
  form!: FormGroup;
 constructor(
    private activatedroute: ActivatedRoute,
      private router: Router,
      private _productsService: ProductsService,
      private _categoryService: CategoriesService,
     private fb: FormBuilder
      
     ){
    }

  ngOnInit(): void {

    this.idPro = Number(this.activatedroute.snapshot.paramMap.get('id'));

    this.form = this.fb.group({
      sku: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      quantity: ['', [Validators.required, Validators.min(1)]],
      category_id: ['', Validators.required]
    });
    this.getCategoriesP();

    
   this.getProductByIdP(this.idPro);
  }


  getCategoriesP() {
    this._categoryService.getCategories().subscribe((data: any) => {
      this.categories = data.categories;
      console.log(data);
    
    })
  }

  getProductByIdP(id:number) {
    this._productsService.getProductById(id).subscribe((data: any) => {
      this.form.patchValue(data.product);
      console.log('Producto obtenido:', data.product); 
    
    })
  }

  updateProduct() {
    if (this.form.invalid) {
      return;
    }
    this._productsService.updateProduct(this.idPro, this.form.value).subscribe(() => {
      alert('Producto actualizado con éxito');
      this.router.navigate(['/products']);
    }, error => {
      console.error('Error al actualizar el producto', error);
    });
  }

  goBack() {
    this.router.navigate(['/products']);
  }
}
