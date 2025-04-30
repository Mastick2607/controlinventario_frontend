import { Component,OnInit } from '@angular/core';
import {ProductsService} from '../../services/products.service';
import { ActivatedRoute,Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // ✅ IMPORTA ESTO
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SuppliersService } from '../../services/suppliers.service';

@Component({
  selector: 'app-edit-supplier',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],

  templateUrl: './edit-supplier.component.html',
  styleUrl: './edit-supplier.component.css'
})
export class EditSupplierComponent implements OnInit{
  Supplier:any[] =[];
  idSupplier:any;
  form!: FormGroup;



   constructor(
      private activatedroute: ActivatedRoute,
        private router: Router,
        private _suppliersService: SuppliersService,
       private fb: FormBuilder
        
       ){
      }

      ngOnInit(): void {

        this.idSupplier= this.activatedroute.snapshot.paramMap.get('id');
    
        this.form = this.fb.group({
          name: ['', Validators.required],
          phone: ['', Validators.required],
          email: ['', Validators.required],
          address: ['', [Validators.required, Validators.min(1)]],
          country: ['', [Validators.required, Validators.min(1)]],
        });
    
        
       this.getSuppliersByIdP(this.idSupplier);
      }

      

      getSuppliersByIdP(id:string) {
        this._suppliersService.getSupplierById(id).subscribe((data: any) => {
          this.form.patchValue(data.suppliers);
          console.log('Provedoor obtenido:', data.suppliers); 
        
        })
      }


      updateSuppliers() {
        if (this.form.invalid) {
          return;
        }
        this._suppliersService.updateSuppliers(this.idSupplier, this.form.value).subscribe(() => {
          alert('Provedor actualizado con éxito');
          this.router.navigate(['/suppliers']);
        }, error => {
          console.error('Error al actualizar el producto', error);
        });
      }
    
      goBack() {
        this.router.navigate(['/suppliers']);
      }
}
