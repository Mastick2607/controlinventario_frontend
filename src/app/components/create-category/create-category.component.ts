import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from '../../services/categories.service';
import { CommonModule } from '@angular/common'; // ✅ IMPORTA ESTO
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.css'
})
export class CreateCategoryComponent implements OnInit {

  categories:any[] =[];
form!:FormGroup;

constructor(
  private _categoryService: CategoriesService,
  private router: Router,
  private fb: FormBuilder
) {}
ngOnInit(): void {

  this.form = this.fb.group({
    name: ['', Validators.required],
  });

}


addCategory() {
  if (this.form.invalid) {
    return;
  }

  this._categoryService.addCategory(this.form.value).subscribe(response => {
    alert('Categoria agregada con éxito');
    this.router.navigate(['/categories']);
  }, error => {
    console.error('Error al agregar Categorias', error);
  });
}

goBack() {
  this.router.navigate(['/categories']);
}
}
