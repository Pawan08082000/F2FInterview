import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { ShowProductsComponent } from './show-products/show-products.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'add',
        component: AddProductComponent,

      },
      {
        path: 'show',
        component: ShowProductsComponent,
      },
      {
        path: 'add/:id',
        component: AddProductComponent,
      },
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
