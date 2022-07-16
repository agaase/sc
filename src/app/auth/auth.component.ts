import { Component } from '@angular/core';
import {SupabaseService} from "../supabase.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  loading = false;

  constructor(private readonly supabase: SupabaseService) { }

  async handleLogin(input: string) {
    try {
      this.loading = true;
      await this.supabase.signIn(input);
      alert('Check your email for the login link!');
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
