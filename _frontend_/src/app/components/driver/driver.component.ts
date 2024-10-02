import { Component, OnDestroy,AfterViewInit ,AfterViewChecked } from '@angular/core';
import { Package } from '../../shared/models/package';
import { Delivery } from '../../shared/models/delivery';
import { PackageService } from '../../services/package.service';
import { DeliveryService } from '../../services/delivery.service';
import { Subscription } from 'rxjs';
import { SocketService } from './../../services/socket.service';
import {GeolocationService} from '../../services/geolocation.service';

import { MapComponent } from '../../map/map.component';
import * as L from 'leaflet';


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
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrl: './driver.component.css'
})
export class DriverComponent implements  OnDestroy, AfterViewInit, AfterViewChecked{
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
    from_location:{lat:0,lng:0},
    to_name:'',
    to_address:'',
    to_location:{lat:0,lng:0},

    }
  pickedupBtnisDisabled: boolean = true;
  intransitBtnisDisabled: boolean = true;
  deliveredBtnisDisabled: boolean = true;
  failedBtnisDisabled: boolean = true;
  _package_: Package = new Package();
  _delivery_: Delivery = new Delivery();
  num1FromlocLat: number = 0;
  num1FromlocLng : number = 0;
  num2TolocLat : number = 0;
  num2TolocLng : number = 0;
  inputIdData = "";
  map!: L.Map
  markers: L.Marker[] = [
    // L.marker([31.9539, 35.9106]), // Amman
    // L.marker([32.5568, 35.8469]) // Irbid
    L.marker([3.864418073715902, 11.496293192865616]) // Irbid

  ];
  // private locationChangedSubscription: Subscription;
  private deliveryUpdatedSubscription: Subscription;
  messages: string[] = [];
  newMessage: string = '';
  obj: object = {};
   getarr!:Package   ;


  constructor(private packageService: PackageService,
    private deliveryService: DeliveryService,
    private socketService: SocketService,
    private geolocService:GeolocationService){
    // this.locationChangedSubscription = this.socketService
    // .on('location_changed')
    // .subscribe((data) => {
    //   this.messages.push(data.text);
    //   console.log("message comming from server");
    //   console.log(data);
    // });

    this.deliveryUpdatedSubscription = this.socketService
    .on('delivery_updated')
    .subscribe((data) => {
      this.messages.push(data.text);
      console.log("delivery_updated event comming from server @driver component");
      console.log(data);
      this._delivery_.pickup_time = data.pickup_time;
      this._delivery_.start_time = data.start_time;
      this._delivery_.end_time = data.end_time;
      console.log("(this._delivery_.location as any).lat");
      console.log((this._delivery_.location as any).lat);
      // this.markers.forEach(marker => marker.remove());
      this.map.removeLayer(this.markers[2].unbindTooltip())
      this.markers = [
        L.marker([this.num1FromlocLat, this.num1FromlocLng]).bindTooltip("package source",{permanent: true}), // pack source
        L.marker([this.num2TolocLat, this.num2TolocLng]).bindTooltip("package destination",{permanent: true}), // package destination
        L.marker([(this._delivery_.location as any).lat, (this._delivery_.location as any).lng]).bindTooltip("current position",{permanent: true}) // current position

      ];

      this.addMarkers();
      this.centerMap();
    });
  }
  ngOnInit() {

  }
  initializeMap() {
    const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    this.map = L.map('map');
    L.tileLayer(baseMapURl).addTo(this.map);
  }


   addMarkers() {
    // Add your markers to the map
    this.markers.forEach(marker => marker.addTo(this.map));
  }

   centerMap() {
    // Create a LatLngBounds object to encompass all the marker locations
    const bounds = L.latLngBounds(this.markers.map(marker => marker.getLatLng()));

    // Fit the map view to the bounds
    this.map.fitBounds(bounds);
  }
  searchItem(): void {
    console.log(this.inputIdData);
    if(this.inputIdData)
    {
      this.pickedupBtnisDisabled = true;
      this.intransitBtnisDisabled = true;
      this.deliveredBtnisDisabled  = true;
      this.failedBtnisDisabled = true;
      this.deliveryService.getOneDeliveryById(this.inputIdData)
      .subscribe((res) => {
        console.log(res);
        this._delivery_ = res;
        console.log(this._delivery_)
            this.packageService.getOnePackageById(res.package_id as string)
            .subscribe((packRes) => {

              this._package_=packRes
              if(res.status == "open")
              {
                this.pickedupBtnisDisabled = false;
              }
              else if(res.status == "picked-up")
              {
                this.intransitBtnisDisabled = false;
              }
              else if(res.status == "in-transit")
              {
                this.deliveredBtnisDisabled = false;
                this.failedBtnisDisabled = false;
              }
              this.geolocService.getPosition().then(pos=>{
                console.log(`Position: ${pos.lat}, ${pos.lng}`);
                this.num1FromlocLat = (this._package_.from_location as any).lat;
                this.num1FromlocLng = (this._package_.from_location as any).lng;
                this.num2TolocLat = (this._package_.to_location as any).lat;
                this.num2TolocLng = (this._package_.to_location as any).lng;
                this.markers = [
                  L.marker([(this._package_.from_location as any).lat, (this._package_.from_location as any).lng]).bindTooltip("package source",{permanent: true}), // pack source
                  L.marker([(this._package_.to_location as any).lat, (this._package_.to_location as any).lng]).bindTooltip("package destination",{permanent: true}), // package destination
                  L.marker([pos.lat, pos.lng]).bindTooltip("current position",{permanent: true}) // current position

                ];
              })


              setInterval(() => {
                this.geolocService.getPosition().then(pos=>{
                  console.log(`Position: ${pos.lat}, ${pos.lng}`);
                  this.obj = {lat:pos.lat , lng:pos.lng};
                  this.sendLocationChangedEvent(this._delivery_.delivery_id as string , this.obj);

                })
                }, 20000)

            }, (err) => {
              //handle error
              // console.log("+++++",err)
          });

        }, (err) => {
            //handle error
            // console.log("+++++",err)
        });
    }
    else{
      let obj1 = new Package();
      let obj2 = new Delivery();
      this._package_ = obj1;
      this._delivery_ = obj2;
      this.pickedupBtnisDisabled = true;
      this.intransitBtnisDisabled = true;
      this.deliveredBtnisDisabled  = true;
      this.failedBtnisDisabled = true;
      console.log(this._package_);
      console.log(this._delivery_);
    }


  }
  pickedUp(): void {
    if(this.pickedupBtnisDisabled == false)
    {

      console.log(this._delivery_.delivery_id);
      this._delivery_.status = 'picked-up';
      // this.deliveryService.updateDelivery(this._delivery_.delivery_id as string, this._delivery_)
      // .subscribe((res) => {
      //   console.log(res);
      // });


        this.sendStatusChangedEvent(this._delivery_.delivery_id as string , this._delivery_.status as string)

    }

  }
  inTransit(): void {
    if(this.intransitBtnisDisabled == false)
      {
        this._delivery_.status = 'in-transit';

          this.sendStatusChangedEvent(this._delivery_.delivery_id as string , this._delivery_.status as string)
      }

  }
  delivered(): void {
    if(this.deliveredBtnisDisabled == false)
    {
      this._delivery_.status = 'delivered';

      this.sendStatusChangedEvent(this._delivery_.delivery_id as string , this._delivery_.status as string)
    }

  }
  failed(): void {
    if(this.failedBtnisDisabled == false)
    {
      this._delivery_.status = 'failed';

      this.sendStatusChangedEvent(this._delivery_.delivery_id as string , this._delivery_.status as string)
    }

  }
  sendLocationChangedEvent(id: string, location: object) {
    console.log('inside sendLocationChangedEvent');
    this.socketService.emit('location_changed', { id: id , loc: location});
    // this.newMessage = '';
  }
  sendStatusChangedEvent(id: string, data: string) {
    console.log('inside sendStatusChangedEvent');
    this.socketService.emit('status_changed', { id: id , status: data});

  }
  ngAfterViewInit(): void {

    this.initializeMap();
    this.addMarkers();
    this.centerMap();

  }
  ngAfterViewChecked(): void {
    this.addMarkers();
    this.centerMap();

  }
  ngOnDestroy() {
    // this.locationChangedSubscription.unsubscribe();
    this.deliveryUpdatedSubscription.unsubscribe();
  }
}
