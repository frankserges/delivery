import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrackerComponent } from './components/tracker/tracker.component';
import { AdminComponent } from './components/admin/admin.component';
import { DriverComponent } from './components/driver/driver.component';
import { AdminCreatePackageComponent } from './components/admin-create-package/admin-create-package.component';
import { AdminCreateDeliveryComponent } from './components/admin-create-delivery/admin-create-delivery.component';
import {MapComponent}  from './map/map.component';

const routes: Routes = [
  {path: '', component:MapComponent},
  {path: 'admin', component:AdminComponent},
  {path: 'driver', component:DriverComponent},
  {path: 'tracker', component:TrackerComponent},
  {path: 'create-package', component:AdminCreatePackageComponent},
  {path: 'create-delivery', component:AdminCreateDeliveryComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
