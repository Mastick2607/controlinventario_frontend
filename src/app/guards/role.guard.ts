import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
 
  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRole : string[] = route.data['role'] || [route.data['role']];  // Obtiene el rol esperado desde la configuración de la ruta
  
console.log(expectedRole);


  const userHasRole = expectedRole.some(role => authService.hasRole(role));
  // const userHasRole = authService.hasRole(expectedRole); // Verifica si el usuario tiene el rol

  // console.log(userHasRole);

  if (!userHasRole) {
    router.navigate(['/unauthorized']); // Redirige si el usuario no tiene el rol
    // console.log('No autorizado');
    
    return false;
  }

  return true;
 
 
};
