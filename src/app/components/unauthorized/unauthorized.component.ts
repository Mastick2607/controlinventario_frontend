import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome"
import { faExclamationTriangle, faHome, faArrowLeft } from "@fortawesome/free-solid-svg-icons"

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [CommonModule, RouterModule,FontAwesomeModule],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.css'
})
export class UnauthorizedComponent {

  faExclamationTriangle = faExclamationTriangle
  faHome = faHome
  faArrowLeft = faArrowLeft

  goBack() {
    window.history.back()
  }
}
