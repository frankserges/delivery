
import { Injectable , AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MapService implements AfterViewInit{

  public map!: L.Map;


    public initMap(): void {

    this.map = L.map('map', {
      center: [ 39.8282, -98.5795],
      zoom: 3
    });

        const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }




  constructor() { }
  ngAfterViewInit(): void {
    // this.initMap();

  }

}
