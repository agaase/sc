import {Component, OnInit, Input} from '@angular/core';
import {SupabaseService} from "../supabase.service";
import {Session} from "@supabase/supabase-js";
import {MatSnackBar} from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';


import { createClient } from '@supabase/supabase-js'
const supabase = createClient("https://dlbrbebmncqhakkrgtiq.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsYnJiZWJtbmNxaGFra3JndGlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTY3ODA3NzIsImV4cCI6MTk3MjM1Njc3Mn0.0r5FAD8MgIFGJ3CjLNUkGTwgbrivYdNJxD_zuoOtEQ0")

declare const google: any;

interface Item {
  name: String;
  address: String;
}


@Component({
  selector: 'app-newitem',
  templateUrl: './newitem.component.html',
  styleUrls: ['./newitem.component.scss']
})
export class NewItemComponent implements OnInit {
  session = this.supabase.session!;
  selItem!: Item;
  msgDisplay = false;

  constructor(private readonly supabase: SupabaseService, private toastr: ToastrService) { }

  ngOnInit() {
    this.supabase.authChanges((_, session) => this.session = session!);
    this.initAutocomplete();
  }
  
  
  async addToDB() {
    // this._snackBar.open("Successfully added", "close");
    this.toastr.error('Hello world!', 'Toastr fun!', {
      timeOut: 20000,
      positionClass: "toast-bottom-center",
      closeButton: false,
      preventDuplicates: true
    });

    /**
    try {
      let { data, error } = await supabase
      .from('curated_items')
      .insert([
        { name: this.selItem.name, address: this.selItem.address }
      ]);
      
      this._snackBar.open("Successfully added", "close");

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
          // ✅ TypeScript knows err is Error
          alert(error.message)
        } else {
          console.log('Unexpected error', error);
        }
    } finally {
      //
    }
    **/
  }
  
  onAdd() {
    this.addToDB();
  }
   
  initAutocomplete() {
    const map = new google.maps.Map(document.getElementById("map"), {
      center: {
        lat: 37.474765,
        lng: -122.248617
      },
      zoom: 9,
      mapTypeId: "roadmap",
    });
    // Create the search box and link it to the UI element.
    const input:HTMLInputElement = document.getElementById("pac-input") as HTMLInputElement;
    const searchBox = new google.maps.places.SearchBox(input);
  
    // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds());
    });
  
    let markers:any[] = [];
  
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", () => {
      
      const places = searchBox.getPlaces();
  
      if (places.length == 0) {
        return;
      }
      input!.value = "";
      this.selItem = {
        name: places[0].name,
        address: places[0].formatted_address
      }
      
  
      // Clear out the old markers.
      markers.forEach((marker) => {
        marker.setMap(null);
      });
      markers = [];
  
      // For each place, get the icon, name and location.
      const bounds = new google.maps.LatLngBounds();
  
      places.forEach((place:any) => {
        if (!place.geometry || !place.geometry.location) {
          console.log("Returned place contains no geometry");
          return;
        }
  
        const icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };
  
        // Create a marker for each place.
        markers.push(
          new google.maps.Marker({
            map,
            icon,
            title: place.name,
            position: place.geometry.location,
          })
        );
        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
  }
}


/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
// @ts-nocheck TODO remove when fixed
// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.
// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
