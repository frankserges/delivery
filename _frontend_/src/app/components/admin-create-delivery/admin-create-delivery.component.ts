import { Component, OnInit } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, NgForm,FormGroup,FormControl,ReactiveFormsModule } from '@angular/forms';
import {DeliveryService} from '../../services/delivery.service';
import { PackageService } from '../../services/package.service';
import { Package } from '../../shared/models/package';
import * as uuid from 'uuid';
import {GeolocationService} from '../../services/geolocation.service';
const  currDate = new Date();
// interface PackageInt{
//   package_id:string;
//   active_delivery_id:string;
//   description:string;
//   weight:number;// in grams
//   width:number; // in cm
//   height:number;// in cm
//   depth:number; // in cm
//   from_name:string;
//   from_address:string;
//   from_location:object;
//   to_name:string;
//   to_address:string;
//   to_location:object;
// }
  //  const  dateStr: string = currDate.toDateString();
interface DeliveryInt{
  delivery_id:string;
  package_id:string;
  pickup_time:Date;
  start_time:Date;
  end_time:Date;
  location:object;
  status:string;
}
@Component({
  selector: 'app-admin-create-delivery',
  templateUrl: './admin-create-delivery.component.html',
  styleUrl: './admin-create-delivery.component.css',

})
export class AdminCreateDeliveryComponent implements OnInit {
  // packageForm: FormGroup ;
  packages: Package[] | undefined;
  formGroup!: FormGroup  ;


  delivery: DeliveryInt = {
    delivery_id: '',
    package_id: '',
    pickup_time: currDate,
    start_time: currDate,
    end_time: currDate,
    location: {},
    status: ''
  }

  constructor(private deliveryService: DeliveryService,
    private packageService: PackageService,
    private geolocService:GeolocationService){
    // this.packageForm = new FormGroup({pack_: new FormControl({})});
  }
  ngOnInit() {
    this.packageService.getAll()
    .subscribe((res) => {
          console.log(res);
          this.packages = res;
      }, (err) => {
          //handle error
          // console.log("+++++",err)
      });

    this.formGroup = new FormGroup({
      selectedPackage: new FormControl<Package | null>(null)
  });
  this.geolocService.getPosition().then(pos=>{
    console.log(`Position: ${pos.lat}, ${pos.lng}`);
    this.delivery.location = {lat:pos.lat, lng: pos.lng};
    // this.delivery.from_location.lng = pos.lng;

  });
  }

  submitDelForm(form:NgForm){
    const myId = uuid.v4();
      console.log(form.value)
        console.log(this.formGroup.value.selectedPackage.package_id)

      if(form.valid && this.formGroup.value.selectedPackage){


        form.value.location= this.delivery.location ;
        form.value.package_id = this.formGroup.value.selectedPackage.package_id;

          this.deliveryService.createNewDelivery(form.value,myId);
          form.reset();

      }
    }
}
