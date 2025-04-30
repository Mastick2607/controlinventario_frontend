import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { SalesService } from '../../services/sales.service';
import { CustomersService } from '../../services/customers.service';
import { CommonModule } from '@angular/common'; // ✅ IMPORTA ESTO
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-sales',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './create-sales.component.html',
  styleUrl: './create-sales.component.css'
})
export class CreateSalesComponent implements OnInit{
  customers:any[] =[];
  products:any[] =[];
  form!:FormGroup;
  ivaRate = 0.19; // IVA del 19%


  constructor(
    private _productService: ProductsService,
   private _salesService: SalesService,
    private _customersService : CustomersService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {

    this.form = this.fb.group({
      customer_id: ['', Validators.required],
      transfer_type: ['', Validators.required],
      document_type: ['', [Validators.required]],
      document_number: ['', [Validators.required]],
      sale_date: ['', Validators.required],
      product_id: ['', [Validators.required]],
      sale_price: ['', [Validators.required, Validators.min(1)]],
      quantity: ['', Validators.required],
      subtotal: [{ value: '', disabled: true }, Validators.required],
      iva: [{ value: '', disabled: true }, Validators.required],
      total_price: [{ value: '', disabled: true }, Validators.required]
    }); 

this.getCustomersP();
this.getProductP();

this.setupAutoCalculation();
 }

 setupAutoCalculation() {
 
   // Escucha cambios en el producto seleccionado
   this.form.get('product_id')?.valueChanges.subscribe(productId => {
    this.updateSalePrice(productId);
  });

 
  this.form.get('sale_price')?.valueChanges.subscribe(() => {
    this.calculateTotal();
  });

  this.form.get('quantity')?.valueChanges.subscribe(() => {
    this.calculateTotal();
  });
}

updateSalePrice(productId: string) {
  // Busca el producto seleccionado en la lista de productos
  const selectedProduct = this.products.find(product => product.id == productId);
  
  if (selectedProduct) {
    const salePrice = selectedProduct.price * 1.30; // Aplica el margen del 30%
    
    // Autocompleta el campo y recalcula el total
    this.form.patchValue({
      sale_price: salePrice.toFixed(2)
    });
    
    this.calculateTotal(); // Recalcula los totales
  }
}

calculateTotal() {
  const saleprice = this.form.get('sale_price')?.value || 0;
  const quantity = this.form.get('quantity')?.value || 0;

  const subtotal = saleprice * quantity;
  const iva = subtotal * this.ivaRate;
  const totalPrice = subtotal + iva;

  this.form.patchValue({
    subtotal: subtotal.toFixed(2),
    iva: iva.toFixed(2),
    total_price: totalPrice.toFixed(2)
  });

}



 getCustomersP() {
  this._customersService.getCustomers().subscribe((data: any) => {
    this.customers = data.customer;
    console.log(data);
  })
}

getProductP() {
  this._productService.getProducts().subscribe((data: any) => {
    this.products = data.products;
    console.log(data);
  
  })
}




addSales() {
  if (this.form.invalid) {
    return;
  }

  this.form.get('sale_price')?.enable();
  this.form.get('subtotal')?.enable();
  this.form.get('iva')?.enable();
  this.form.get('total_price')?.enable();
  console.log('Datos enviados:', this.form.value);

  this._salesService.addSales(this.form.value).subscribe(response => {
    alert('Se registro la salida con éxito');
    this.router.navigate(['/sales']);
  }, error => {
    console.error('Error al agregar la salida ', error);
  });
}

goBack() {
  this.router.navigate(['/sales']);
}
}
