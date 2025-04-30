import { Component,OnInit } from '@angular/core';
import {ProductsService} from '../../services/products.service';
import { ActivatedRoute,Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // ✅ IMPORTA ESTO
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomersService } from '../../services/customers.service';

@Component({
  selector: 'app-edit-customer',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './edit-customer.component.html',
  styleUrl: './edit-customer.component.css'
})
export class EditCustomerComponent implements OnInit {

  customer:any[] =[];
  idcustomer:any;
  form!: FormGroup;


  constructor(
    private activatedroute: ActivatedRoute,
      private router: Router,
      private _customersService: CustomersService,
     private fb: FormBuilder
      
     ){
    }

    ngOnInit(): void {

      this.idcustomer= this.activatedroute.snapshot.paramMap.get('id');
  
      this.form = this.fb.group({
        name: ['', Validators.required],
        phone: ['', Validators.required],
        email: ['', Validators.required],
        address: ['', [Validators.required, Validators.min(1)]],
      });
  
      
     this.getCustomerByIdP(this.idcustomer);
    }

    

    getCustomerByIdP(id:string) {
      this._customersService.getCustomersById(id).subscribe((data: any) => {
        this.form.patchValue(data.customer);
        console.log('Cliente obtenido:', data.customer); 
      
      })
    }


    updateCustomers() {
      if (this.form.invalid) {
        return;
      }
      this._customersService.updateCustomers(this.idcustomer, this.form.value).subscribe(() => {
        alert('Cliente actualizado con éxito');
        this.router.navigate(['/customers']);
      }, error => {
        console.error('Error al actualizar el Cliente', error);
      });
    }
  
    goBack() {
      this.router.navigate(['/customers']);
    }

}
