import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { PurchasesService } from '../../services/purchases.service';
import { SuppliersService } from '../../services/suppliers.service';
import { CommonModule } from '@angular/common'; // ✅ IMPORTA ESTO
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-purchase',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],

  templateUrl: './create-purchase.component.html',
  styleUrl: './create-purchase.component.css'
})
export class CreatePurchaseComponent implements OnInit {

  suppliers:any[] =[];
  products:any[] =[];
  form!:FormGroup;
  ivaRate = 0.19; // IVA del 19%

  constructor(
    private _productService: ProductsService,
    private _purchasesService : PurchasesService,
    private _suppliersService : SuppliersService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {

    this.form = this.fb.group({
      suppliers_id: ['', Validators.required],
      transfer_type: ['', Validators.required],
      document_type: ['', [Validators.required]],
      document_number: ['', [Validators.required]],
      entry_date: ['', Validators.required],
      product_id: ['', [Validators.required]],
      purchase_price: ['', [Validators.required, Validators.min(1)]],
      quantity: ['', Validators.required],
      subtotal: [{ value: '', disabled: true }, Validators.required],
      iva: [{ value: '', disabled: true }, Validators.required],
      total_price: [{ value: '', disabled: true }, Validators.required]
    }); 

this.getSuppliersP();
this.getProductP();

this.setupAutoCalculation();
 }

 setupAutoCalculation() {
  this.form.get('purchase_price')?.valueChanges.subscribe(() => {
    this.calculateTotal();
  });

  this.form.get('quantity')?.valueChanges.subscribe(() => {
    this.calculateTotal();
  });
}


calculateTotal() {
  const purchasePrice = this.form.get('purchase_price')?.value || 0;
  const quantity = this.form.get('quantity')?.value || 0;

  const subtotal = purchasePrice * quantity;
  const iva = subtotal * this.ivaRate;
  const totalPrice = subtotal + iva;

  this.form.patchValue({
    subtotal: subtotal.toFixed(2),
    iva: iva.toFixed(2),
    total_price: totalPrice.toFixed(2)
  });
}



 getSuppliersP() {
  this._suppliersService.getSuppliers().subscribe((data: any) => {
    this.suppliers = data.suppliers;
    console.log(data);
  })
}

getProductP() {
  this._productService.getProducts().subscribe((data: any) => {
    this.products = data.products;
    console.log(data);
  
  })
}




addPurchases() {
  if (this.form.invalid) {
    return;
  }

  this.form.get('subtotal')?.enable();
  this.form.get('iva')?.enable();
  this.form.get('total_price')?.enable();
  console.log('Datos enviados:', this.form.value);

  this._purchasesService.addpurchases(this.form.value).subscribe(response => {
    alert('Se registro el ingreso con éxito');
    this.router.navigate(['/purchases']);
  }, error => {
    console.error('Error al agregar el ingreso', error);
  });
}

goBack() {
  this.router.navigate(['/purchases']);
}

}
