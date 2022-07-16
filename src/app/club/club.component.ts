import {Component, OnInit, Input} from '@angular/core';
import {SupabaseService} from "../supabase.service";
import {Session} from "@supabase/supabase-js";
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { createClient } from '@supabase/supabase-js'
const supabase = createClient("https://dlbrbebmncqhakkrgtiq.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsYnJiZWJtbmNxaGFra3JndGlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTY3ODA3NzIsImV4cCI6MTk3MjM1Njc3Mn0.0r5FAD8MgIFGJ3CjLNUkGTwgbrivYdNJxD_zuoOtEQ0")


interface CuratedItem {
  name: String;
}

@Component({
  selector: 'app-clubs',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.scss']
})
export class ClubComponent implements OnInit {
  curatedItems: CuratedItem[] = [];
  filteredItems: CuratedItem[] = [];
  mapResults:CuratedItem[] = []
  searchQuery = "";
  
  session = this.supabase.session!;
  loading = false;

  constructor(private readonly supabase: SupabaseService, private http: HttpClient) { }

  ngOnInit() {
    this.supabase.authChanges((_, session) => this.session = session!);
    this.getItems();
    
  }
  
  onChangeEvent(event: any) {
    console.log(event.target.value);
    this.searchQuery = event.target.value;
    this.filterItems();
  }
  
  filterItems() {
    this.filteredItems = [];
    if (!this.searchQuery) {
      this.filteredItems = this.curatedItems;
      return;
    }
    this.curatedItems.forEach(item => {
      if (item.name.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1) {
        this.filteredItems.push({
          name: item.name
        })
      }
    });
  }

  
  async getItems() {
    
    try {
      this.loading = true;
      let { data: items, error } = await supabase
      .from('curated_items')
      .select('*');

      if (error) {
        throw error;
      }
      if (items) {
        items.forEach(item => {
          this.curatedItems.push({
            name: item.name
          })
        })
        this.filteredItems = this.curatedItems;
      }
    } catch (error) {
      if (error instanceof Error) {
          // ✅ TypeScript knows err is Error
          alert(error.message)
        } else {
          console.log('Unexpected error', error);
        }
    } finally {
      this.loading = false;
    }
    
    // Make a request
    
  }
}
