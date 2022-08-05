import { Component, OnInit } from '@angular/core';
import {ViewChild} from '@angular/core'
declare const google: any;
declare const Microsoft: any;

interface Marker {
lat: number;
lng: number;
label?: string;
draggable?: boolean;
}
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

    @ViewChild('map') myMap; // using ViewChild to reference the div instead of setting an id
    public pageTitle: string = "Jar Assistant Map";
  
    ngAfterViewInit(){  // after the view completes initializaion, create the map
      var map = new Microsoft.Maps.Map("#map", {
          credentials: 'AltZf2Vz8P_Cg9vl1WuLK5prxtmThEinpoQUGf3kzxaVArsHfCwcXBCENsak74BX'
      });
      var pushpin = new Microsoft.Maps.Pushpin(map.getCenter(), null);
      var layer = new Microsoft.Maps.Layer();
      layer.add(pushpin);
      map.layers.insert(layer);
    }

  ngOnInit() {
    }

}
