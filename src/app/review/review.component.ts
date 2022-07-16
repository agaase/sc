import {Component, OnInit, Input} from '@angular/core';
import {SupabaseService} from "../supabase.service";
import {Session} from "@supabase/supabase-js";


@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  session = this.supabase.session!;

  constructor(private readonly supabase: SupabaseService) { }

  ngOnInit() {
    this.supabase.authChanges((_, session) => this.session = session!);
  }
}
