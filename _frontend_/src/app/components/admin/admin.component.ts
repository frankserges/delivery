import { Component, OnInit } from '@angular/core';
import { Package } from '../../shared/models/package';
import { Delivery } from '../../shared/models/delivery';
import { PackageService } from '../../services/package.service';
import { DeliveryService } from '../../services/delivery.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import {AdminCreateDeliveryComponent} from './../admin-create-delivery/admin-create-delivery.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',

})
export class AdminComponent  implements OnInit {
  visible: boolean = false;
  packages: Package[] = [];
  deliveries: Delivery[] = [];
  router: any;
  constructor(private packageService: PackageService, private deliveryService: DeliveryService){

  }
  ngOnInit() {
    this.packageService.getAll()
    .subscribe((res) => {
      this.packages = res;
      // console.log(this.packages)

      }, (err) => {
          //handle error
          // console.log("+++++",err)
      });

      this.deliveryService.getAll().subscribe((res) =>{
        this.deliveries = res;
        // console.log(this.deliveries)
      },(error) =>{
        // console.log("****", error)
      })
   }

  onSave(): void{
 
    // this.visible = true;
    // .subscribe({complete: console.info});
  }
  createDelivery(): void{

  }


}
