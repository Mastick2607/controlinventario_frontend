import { Component,OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // ✅ IMPORTA ESTO
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-edit-categories',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './edit-categories.component.html',
  styleUrl: './edit-categories.component.css'
})
export class EditCategoriesComponent implements OnInit{
  category:any[] =[];
  idcategory:number =0;
  form!: FormGroup;




   constructor(
      private activatedroute: ActivatedRoute,
        private router: Router,
        private _categoryService: CategoriesService,
       private fb: FormBuilder
        
       ){
      }


      ngOnInit(): void {

        this.idcategory = Number(this.activatedroute.snapshot.paramMap.get('id'));
    
        this.form = this.fb.group({
          name: ['', Validators.required],
        });
    
        
       this.getCategoryBy(this.idcategory);
      }

      getCategoryBy(id:number) {
        this._categoryService.getCategoryById(id).subscribe((data: any) => {
          this.form.patchValue(data.categories);
          console.log('Categoria obtenido:', data.categories); 
        
        })
      }
    
      updateCategory() {
        if (this.form.invalid) {
          return;
        }
        this._categoryService.updateCategory(this.idcategory, this.form.value).subscribe(() => {
          alert('categoria actualizada con éxito');
          this.router.navigate(['/categories']);
        }, error => {
          console.error('Error al actualizar la categoria', error);
        });
      }
    
    
      goBack() {
        this.router.navigate(['/categories']);
      }
}
