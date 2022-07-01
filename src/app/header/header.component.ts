import {Component, Input, OnInit} from '@angular/core';
import {Profile, SupabaseService} from "../supabase.service";
import {Session} from "@supabase/supabase-js";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loading = false;
  profile: Profile | undefined;

  @Input() session: Session | undefined;

  constructor(private readonly supabase: SupabaseService) { }

  ngOnInit() {
    this.getProfile();
  }

  async getProfile() {
    try {
      this.loading = true;
      let {data: profile, error, status} = await this.supabase.profile;

      if (error && status !== 406) {
        throw error;
      }

      if (profile) {
        this.profile = profile;
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
  }
}
