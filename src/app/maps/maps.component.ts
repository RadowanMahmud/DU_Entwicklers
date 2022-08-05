import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {ViewChild} from '@angular/core'
import { Router } from '@angular/router';
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
    
    constructor(private http: HttpClient) { }

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

      this.http.get('http://dev.virtualearth.net/REST/v1/Routes?Driving?o=xml&wp.0=Tongi&vwp.1=Dhaka&avoid=minimizeTolls&key=AltZf2Vz8P_Cg9vl1WuLK5prxtmThEinpoQUGf3kzxaVArsHfCwcXBCENsak74BX')
.subscribe(res => {
    console.log(res)
})
    }

  ngOnInit() {
    }

}
