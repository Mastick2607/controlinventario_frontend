import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // ✅ IMPORTA ESTO
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomersService } from '../../services/customers.service';

@Component({
  selector: 'app-create-customer',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './create-customer.component.html',
  styleUrl: './create-customer.component.css'
})
export class CreateCustomerComponent {
  customers:any[] =[];
form!:FormGroup;

constructor(
  private _customersService:CustomersService,
  
  private router: Router,
  private fb: FormBuilder
) {}

ngOnInit(): void {

  this.form = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', Validators.required],
    address: ['', Validators.required],
  });

}


addCustomers() {
  if (this.form.invalid) {
    return;
  }

  this._customersService.addCustomers(this.form.value).subscribe(response => {
    alert('Cliente agregado con éxito');
    this.router.navigate(['/customers']);
  }, error => {
    console.error('Error al agregar Cliente', error);
  });
}

goBack() {
  this.router.navigate(['/customers']);
}
  
}
