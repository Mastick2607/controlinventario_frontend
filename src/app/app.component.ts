import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from './components/navbar/navbar.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // ✅ IMPORTA ESTO

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'controlInventario';

  showNavbar: boolean = true; // Variable para controlar la visibilidad del navbar

  constructor(private router: Router) {
    // Escuchar los cambios de ruta
    this.router.events.subscribe(() => {
      this.showNavbar = this.router.url !== '/login'; // Oculta el navbar en la ruta de login
    });
  }


}
