import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome"
import {
  faListAlt,
  faMoneyBillWave,
  faHandshake,
  faUserTie,
  faTags,
  faHome,
  faShoppingCart,
  faBox,
  faChevronRight,
  faChevronLeft,
  faCog,
  faUser,
  faSignOutAlt,
  faChevronDown,
  faChevronUp,
} 
from "@fortawesome/free-solid-svg-icons";
import { RouterModule } from "@angular/router";
// import { ClickOutsideDirective } from "../../directives/click-outside.directive
import { AuthService } from '../../services/auth.service';

interface User {
  name: string
  email: string
  avatar?: string
}

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.css",
})
export class NavbarComponent implements OnInit {
  isCollapsed = false
  showUserMenu = false
  currentUser: User | null = null

  // Iconos
  faHome = faHome
  faShoppingCart = faShoppingCart
  faBox = faBox
  faChevronRight = faChevronRight
  faChevronLeft = faChevronLeft
  faTags = faTags
  faUserTie = faUserTie
  faHandshake = faHandshake
  faMoneyBillWave = faMoneyBillWave
  faListAlt = faListAlt
  faCog = faCog
  faUser = faUser
  faSignOutAlt = faSignOutAlt
  faChevronDown = faChevronDown
  faChevronUp = faChevronUp

  constructor(private _authService: AuthService) {}

  ngOnInit() {
    // Obtener información del usuario actual
    this.currentUser = {
      name: JSON.parse(localStorage.getItem('user') || '{}')?.name || 'Usuario desconocido',
      email: JSON.parse(localStorage.getItem('user') || '{}')?.email || 'email desconocido',
    }
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu
  }

  closeUserMenu() {
    this.showUserMenu = false
  }

  logout() {
    // Implementar lógica de cierre de sesión
    this._authService.logout().subscribe(() => {
      // Redirigir a la página de login
      window.location.href = "/login"
    })
  }
}

