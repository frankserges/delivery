import { NgModule , ViewEncapsulation } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './components/admin/admin.component';
import { TrackerComponent } from './components/tracker/tracker.component';
import { DriverComponent } from './components/driver/driver.component';
import { provideHttpClient, withFetch } from "@angular/common/http";
import { AdminCreatePackageComponent } from './components/admin-create-package/admin-create-package.component';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AdminCreateDeliveryComponent } from './components/admin-create-delivery/admin-create-delivery.component';
import { TableModule } from 'primeng/table';
import { MapComponent } from './map/map.component';
import { DropdownModule } from 'primeng/dropdown';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
// import { LeafletModule } from '@asymmetrik/ngx-leaflet';



@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    TrackerComponent,
    DriverComponent,
    AdminCreatePackageComponent,
    AdminCreateDeliveryComponent,
    MapComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    TableModule,
    ReactiveFormsModule,
    DropdownModule,
    CommonModule,
    ButtonModule,
    DialogModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimations()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
