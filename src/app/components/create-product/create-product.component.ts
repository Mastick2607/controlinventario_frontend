import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { CategoriesService } from '../../services/categories.service';
import { CommonModule } from '@angular/common'; // ✅ IMPORTA ESTO
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent implements OnInit {
categories:any[] =[];
form!:FormGroup;

  constructor(
    private _productService: ProductsService,
    private _categoryService: CategoriesService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {

    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      quantity: ['', [Validators.required, Validators.min(1)]],
      category_id: ['', Validators.required]
    });

this.getCategoriesP();
 }

  getCategoriesP() {
    this._categoryService.getCategories().subscribe((data: any) => {
      this.categories = data.categories;
      console.log(data);
    
    })
  }

  addProduct() {
    if (this.form.invalid) {
      return;
    }

    this._productService.addProduct(this.form.value).subscribe(response => {
      alert('Producto agregado con éxito');
      this.router.navigate(['/products']);
    }, error => {
      console.error('Error al agregar producto', error);
    });
  }

  goBack() {
    this.router.navigate(['/products']);
  }
}
