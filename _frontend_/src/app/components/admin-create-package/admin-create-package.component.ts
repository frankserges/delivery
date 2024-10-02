import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm} from '@angular/forms';
import { PackageService } from '../../services/package.service';
import { Observable } from 'rxjs';
import { Package } from '../../shared/models/package';
import * as uuid from 'uuid';
import {GeolocationService} from '../../services/geolocation.service';

interface PackageInt{
  package_id:string;
  active_delivery_id:string;
  description:string;
  weight:number;// in grams
  width:number; // in cm
  height:number;// in cm
  depth:number; // in cm
  from_name:string;
  from_address:string;
  from_location:object;
  to_name:string;
  to_address:string;
  to_location:object;
}

@Component({
  selector: 'app-admin-create-package',
  templateUrl: './admin-create-package.component.html',
  styleUrl: './admin-create-package.component.css',
  // providers:[PackageService]
})
export class AdminCreatePackageComponent implements OnInit {
  // arr:Package[] = [] ;
  package: PackageInt = {
  package_id:'',
  active_delivery_id:'',
  description:'',
  weight: 0,
  width:0,
  height:0,
  depth:0,
  from_name:'',
  from_address:'',
  from_location:{},
  to_name:'',
  to_address:'',
  to_location:{},

  }

  constructor(private packageService: PackageService,private geolocService:GeolocationService){}


  ngOnInit() {
    this.geolocService.getPosition().then(pos=>{
      console.log(`Position: ${pos.lat}, ${pos.lng}`);
      // this.package.location = {lat:pos.lat, lng: pos.lng};

    });
   }
  submitForm(form:NgForm){
    const myId = uuid.v4();

    console.log(myId)
    console.log(form.value)
    // this.geolocService.getPosition().then(pos=>{
      // console.log(`Position: ${pos.lat}, ${pos.lng}`);
      if(form.valid){

        // console.log(this.package)
        console.log(this.packageService)
        // form.value.package_id = myId;
        form.value.from_location.lat = 11;
        form.value.from_location.lng = 13;
        form.value.to_location.lat = 20;
        form.value.to_location.lng = 20;
          this.packageService.createNewPackage(form.value,myId );

      }
      else{
        console.log("form invalid")
      }
    // })
    form.reset();
  }

}
