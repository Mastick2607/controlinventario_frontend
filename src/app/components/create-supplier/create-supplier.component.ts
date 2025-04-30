import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // ✅ IMPORTA ESTO
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SuppliersService } from '../../services/suppliers.service';

@Component({
  selector: 'app-create-supplier',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './create-supplier.component.html',
  styleUrl: './create-supplier.component.css'
})
export class CreateSupplierComponent implements OnInit {
  suppliers:any[] =[];
form!:FormGroup;

constructor(
  private _suppliersService:SuppliersService,
  
  private router: Router,
  private fb: FormBuilder
) {}

ngOnInit(): void {

  this.form = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', Validators.required],
    address: ['', Validators.required],
    country: ['', Validators.required],
  });

}


addSuppliers() {
  if (this.form.invalid) {
    return;
  }

  this._suppliersService.addSupplier(this.form.value).subscribe(response => {
    alert('Proveedor agregado con éxito');
    this.router.navigate(['/suppliers']);
  }, error => {
    console.error('Error al agregar Proveedor', error);
  });
}

goBack() {
  this.router.navigate(['/products']);
}

}
