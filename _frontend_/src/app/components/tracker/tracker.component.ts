
import { Component ,OnDestroy,AfterViewInit ,AfterViewChecked} from '@angular/core';
import { PackageService } from '../../services/package.service';
import { DeliveryService } from '../../services/delivery.service';
import { Package } from '../../shared/models/package';
import { Delivery } from '../../shared/models/delivery';
import {GeolocationService} from '../../services/geolocation.service';
import { Subscription } from 'rxjs';
import { SocketService } from './../../services/socket.service';
import {MapComponent} from './../../map/map.component';
import * as L from 'leaflet';


@Component({
  standalone: false,
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrl: './tracker.component.css',

})
export class TrackerComponent implements  OnDestroy, AfterViewInit, AfterViewChecked{
  private deliveryUpdatedSubscription: Subscription;
  currLat:Object = {};
  currLng:Object = {};
  _package_: Package = new Package();
  _delivery_: Delivery = new Delivery();
  inputData = "";
  num1FromlocLat: number = 0;
  num1FromlocLng : number = 0;
  num2TolocLat : number = 0;
  num2TolocLng : number = 0;
  messages: string[] = [];
  map!: L.Map
  markers: L.Marker[] = [
    // L.marker([31.9539, 35.9106]), // Amman
    // L.marker([32.5568, 35.8469]) // Irbid
    L.marker([3.864418073715902, 11.496293192865616]) // Irbid

  ];

  constructor(private packageService: PackageService,
    private deliveryService: DeliveryService,
    private geolocService:GeolocationService,
    private socketService: SocketService){
      this.deliveryUpdatedSubscription = this.socketService
      .on('delivery_updated')
      .subscribe((data) => {
        this.messages.push(data.text);
        console.log("delivery_updated event comming from server @tracker compponent");
        console.log(data);
        this._delivery_.pickup_time = data.pickup_time;
        this._delivery_.start_time = data.start_time;
        this._delivery_.end_time = data.end_time;
        this._delivery_.status = data.status;
        this.map.removeLayer(this.markers[2].unbindTooltip())
        this.markers = [
          L.marker([this.num1FromlocLat, this.num1FromlocLng]).bindTooltip("package source",{permanent: true}), // pack source
          L.marker([this.num2TolocLat, this.num2TolocLng]).bindTooltip("package destination",{permanent: true}), // package destination
          L.marker([(this._delivery_.location as any).lat, (this._delivery_.location as any).lng]).bindTooltip("current position",{permanent: true}) // current position

        ];
      });

  }

  search(): void {
    console.log(this.inputData);
    // this.getCurrentLocation();
    // this.geolocService.getPosition().then(pos=>{
    //   console.log(`Position: ${pos.lat}, ${pos.lng}`);
    // })
    if(this.inputData)
    {
      this.packageService.getOnePackageById(this.inputData)
      .subscribe((res) => {

        this._package_ = res;
        console.log(this._package_)
          if(res.active_delivery_id )
          {
            console.log(res.active_delivery_id)
            this.deliveryService.getOneDeliveryById(res.active_delivery_id)
            .subscribe((delres) => {
              console.log(delres)
              this._delivery_=delres
              this.num1FromlocLat = (this._package_.from_location as any).lat;
              this.num1FromlocLng = (this._package_.from_location as any).lng;
              this.num2TolocLat = (this._package_.to_location as any).lat;
              this.num2TolocLng = (this._package_.to_location as any).lng;
              // this.markers.forEach(marker => marker.remove());
              this.markers = [
                L.marker([(this._package_.from_location as any).lat, (this._package_.from_location as any).lng]).bindTooltip("package source",{permanent: true}), // pack source
                L.marker([(this._package_.to_location as any).lat, (this._package_.to_location as any).lng]).bindTooltip("package destination",{permanent: true}), // package destination
                L.marker([(this._delivery_.location as any).lat, (this._delivery_.location as any).lng]).bindTooltip("current position",{permanent: true}) // current position

              ];
            }, (err) => {
              //handle error
              // console.log("+++++",err)
          });
          }


        }, (err) => {
            //handle error
            // console.log("+++++",err)
        });
    }
    else{
      let obj1 = new Package();
      let obj2 = new Delivery();
      this._package_ = obj1;
      this._delivery_ = obj2
      console.log(this._package_);
      console.log(this._delivery_);
    }


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
