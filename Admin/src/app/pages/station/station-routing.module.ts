import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProductdetailComponent } from "./productdetail/productdetail.component";
import { CustomersComponent } from "./customers/customers.component";

const routes: Routes = [
  {
    path: "product-detail/:id",
    component: ProductdetailComponent,
  },

  {
    path: "customers",
    component: CustomersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StationRoutingModule {}
