import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {SaleDetailComponent} from './components/sale-detail/sale-detail.component';
import{ProductsComponent} from './components/products/products.component';
import{CreateProductComponent} from './components/create-product/create-product.component';
import{EditProductComponent} from './components/edit-product/edit-product.component';
import{CategoriesComponent} from './components/categories/categories.component';
import{EditCategoriesComponent} from './components/edit-categories/edit-categories.component';
import{CreateCategoryComponent} from './components/create-category/create-category.component';
import{SuppliersComponent} from './components/suppliers/suppliers.component';
import { CreateSupplierComponent } from './components/create-supplier/create-supplier.component';
import { EditSupplierComponent } from './components/edit-supplier/edit-supplier.component';
import { CustomersComponent } from './components/customers/customers.component';
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import { EditCustomerComponent } from './components/edit-customer/edit-customer.component';
import { PurchasesComponent } from './components/purchases/purchases.component';
import { CreatePurchaseComponent } from './components/create-purchase/create-purchase.component';
import { SalesComponent } from './components/sales/sales.component';
import { CreateSalesComponent } from './components/create-sales/create-sales.component';
import { MovementsComponent } from './components/movements/movements.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
export const routes: Routes = [

   { path: 'login', component: LoginComponent },
   // { path: '**', redirectTo: 'login' }, // 
{
 path:'',component:DashboardComponent,
 canActivate: [authGuard,roleGuard], 
 data: { role:  ['super_admin','admin'] } 
},

   {
    path:'dashboard',component:DashboardComponent,
    canActivate: [authGuard,roleGuard], 
    data: { role:  ['super_admin','admin'] }   },

   {
    path:'salesdetail/:id',component:SaleDetailComponent,
    canActivate: [authGuard,roleGuard], 
    data: { role:  ['super_admin'] }
   },
   
   {
      path:'products',component:ProductsComponent,
      canActivate: [authGuard,roleGuard], 
      data: { role: ['super_admin','admin']}   
     },
     {
      path:'createproduct',component:CreateProductComponent,
      canActivate: [authGuard,roleGuard], 
      data: { role:  ['super_admin'] }
     },

     {
      path:'editProduct/:id',component:EditProductComponent,
      canActivate: [authGuard,roleGuard], 
      data: { role:  ['super_admin'] }
     
     },

     {
      path:'categories',component:CategoriesComponent,
      canActivate: [authGuard,roleGuard], 
    data: { role:  ['super_admin', 'admin'] }
     },
     {
      path:'editcategory/:id',component:EditCategoriesComponent,
      canActivate: [authGuard,roleGuard], 
      data: { role: ['super_admin']}  
     }, 
     {
      path:'createcategory',component:CreateCategoryComponent,
      canActivate: [authGuard,roleGuard], 
      data: { role: ['super_admin']}  
     
     }, 

     {
      path:'suppliers',component:SuppliersComponent,
      canActivate: [authGuard,roleGuard], 
      data: { role: ['super_admin','admin']}  
     }, 
  
     
     {
      path:'createsuppliers',component:CreateSupplierComponent,
      canActivate: [authGuard,roleGuard], 
      data: { role: ['super_admin']}  
     }, 


     {
      path:'editsupplier/:id',component:EditSupplierComponent,
      canActivate: [authGuard,roleGuard], 
      data: { role: ['super_admin']}  
     }, 


     {
      path:'customers',component:CustomersComponent,
      canActivate: [authGuard,roleGuard], 
      data: { role: ['super_admin','admin']}  
     }, 

     {
      path:'createcustomers',component:CreateCustomerComponent,
      canActivate: [authGuard,roleGuard], 
      data: { role: ['super_admin']}  
     }, 
     
     {
      path:'editcustomers/:id',component:EditCustomerComponent,
      canActivate: [authGuard,roleGuard], 
      data: { role: ['super_admin']}  
      
     }, 
     
         
     {
      path:'purchases',component:PurchasesComponent,
      canActivate: [authGuard,roleGuard], 
      data: { role: ['super_admin','admin']}  
     },  

     {
      path:'createpurchase',component:CreatePurchaseComponent,
      canActivate: [authGuard,roleGuard], 
      data: { role: ['super_admin']}  
     },  
     
     {
      path:'sales',component:SalesComponent,
      canActivate: [authGuard,roleGuard], 
      data: { role: ['super_admin','admin']}  
     },  

     {
      path:'createsale',component:CreateSalesComponent,
      canActivate: [authGuard,roleGuard], 
      data: { role: ['super_admin']}  
     },  

     {
      path:'movements',component:MovementsComponent,
      canActivate: [authGuard,roleGuard], 
      data: { role: ['super_admin','admin']}  
     },
     
     {
      path:'unauthorized',component:UnauthorizedComponent,
    
     },
    
     
     
];
