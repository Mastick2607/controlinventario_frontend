import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common'; // ✅ IMPORTA ESTO
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome"

import { faUser, faLock } from "@fortawesome/free-solid-svg-icons"

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  errorMessage: string = '';
  faUser = faUser
  faLock = faLock
constructor(
  private _authService: AuthService,
  private router: Router,
  private fb: FormBuilder
) {}

ngOnInit(): void {

  this.loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

}


login() {
  if (this.loginForm.invalid) {
    return;
  }

  const credentials = this.loginForm.value;

  this._authService.login(credentials).subscribe(response => {
    // alert('Categoria agregada con éxito');
    localStorage.setItem('token', response.access_token); // Guarda el token en localStorage
    localStorage.setItem('user', JSON.stringify(response.user)); // Guarda el usuario en localStorage
    localStorage.setItem('roles', JSON.stringify(response.roles)); // Guarda el usuario en localStorage
    this.router.navigate(['/dashboard']);
  }, error => {
    console.error('Error al agregar Categorias', error);
  });
}


// login() {
//   if (this.loginForm.invalid) {
//     return;
//   }

//   const credentials = this.loginForm.value;
// console.log('antes');

//   this._authService.login(credentials).subscribe({
//     next: (response) => {
//       localStorage.setItem('token', response.access_token); // Guarda el token en localStorage
//       localStorage.setItem('user', JSON.stringify(response.user)); // Guarda el usuario en localStorage
//       localStorage.setItem('roles', JSON.stringify(response.roles)); // Guarda el usuario en localStorage
//       console.log('dentro');
//       this.router.navigate(['/categories']); // Redirige al dashboard o a otra ruta
//     },
//     error: (error) => {
//       console.error('Error en el inicio de sesión:', error);
//       this.errorMessage = 'Credenciales incorrectas. Intenta de nuevo.';
//     },
//   });
// }

}




// import { Component, type OnInit } from "@angular/core"
// import type { Router } from "@angular/router"
// import type { AuthService } from "../../services/auth.service"
// import { CommonModule } from "@angular/common"
// import { type FormBuilder, type FormGroup, Validators, ReactiveFormsModule } from "@angular/forms"
// import { FontAwesomeModule } from "@fortawesome/angular-fontawesome"
// import { faUser, faLock } from "@fortawesome/free-solid-svg-icons"

// @Component({
//   selector: "app-login",
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
//   templateUrl: "./login.component.html",
//   styleUrl: "./login.component.css",
// })
// export class LoginComponent implements OnInit {
//   loginForm!: FormGroup
//   errorMessage = ""
//   faUser = faUser
//   faLock = faLock

//   constructor(
//     private _authService: AuthService,
//     private router: Router,
//     private fb: FormBuilder,
//   ) {}

//   ngOnInit(): void {
//     this.loginForm = this.fb.group({
//       email: ["", [Validators.required, Validators.email]],
//       password: ["", [Validators.required, Validators.minLength(6)]],
//     })
//   }

//   login() {
//     if (this.loginForm.invalid) {
//       return
//     }

//     const credentials = this.loginForm.value

//     this._authService.login(credentials).subscribe(
//       (response) => {
//         localStorage.setItem("token", response.access_token)
//         localStorage.setItem("user", JSON.stringify(response.user))
//         localStorage.setItem("roles", JSON.stringify(response.roles))
//         this.router.navigate(["/dashboard"])
//       },
//       (error) => {
//         console.error("Error al iniciar sesión", error)
//         this.errorMessage = "Credenciales incorrectas. Intenta de nuevo."
//       },
//     )
//   }
// }

