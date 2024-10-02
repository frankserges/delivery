import { Component ,OnInit, AfterViewInit, ViewEncapsulation} from '@angular/core';


import * as L from 'leaflet';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
  encapsulation: ViewEncapsulation.None
})
export class MapComponent implements AfterViewInit {
   map!: L.Map
  markers: L.Marker[] = [
    // L.marker([31.9539, 35.9106]), // Amman
    // L.marker([32.5568, 35.8469]) // Irbid
    L.marker([3.864418073715902, 11.496293192865616]) // Irbid

  ];


  constructor() { }
  ngOnInit(): void {
    console.log('MapLayerComponent initialized!');

  }

  ngAfterViewInit(): void {

    this.initializeMap();
    this.addMarkers();
    this.centerMap();

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
}
