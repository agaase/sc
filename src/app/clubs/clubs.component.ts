import {Component, OnInit, Input} from '@angular/core';
import {SupabaseService} from "../supabase.service";
import {Session} from "@supabase/supabase-js";


@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.scss']
})
export class ClubsComponent implements OnInit {
  session = this.supabase.session!;

  constructor(private readonly supabase: SupabaseService) { }

  ngOnInit() {
    this.supabase.authChanges((_, session) => this.session = session!);
  }
}
