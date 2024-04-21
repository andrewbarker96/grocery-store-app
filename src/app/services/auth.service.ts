import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase: SupabaseClient;
  private currentUser: BehaviorSubject<User | boolean | null> =
    new BehaviorSubject<User | boolean | null>(null);

  constructor(private router: Router) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );

    this.supabase.auth.onAuthStateChange((event, sess) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        console.log('SET USER');

        this.currentUser.next(sess?.user || false);
      } else {
        this.currentUser.next(false);
      }
    });

    // Trigger initial session load
    this.loadUser();
  }

  async loadUser() {
    if (this.currentUser.value) {
      return;
    }
    const user = await this.supabase.auth.getUser();

    if (user?.data?.user) {
      this.currentUser.next(user.data.user);
    } else {
      this.currentUser.next(false);
    }
  }

  signUp(credentials: { email: string; password: string }) {
    return this.supabase.auth.signUp(credentials);
  }

  signIn(credentials: { email: string; password: string }) {
    return this.supabase.auth.signInWithPassword(credentials);
  }

  sendPwReset(email: string) {
    return this.supabase.auth.resetPasswordForEmail(email);
  }

  async signOut() {
    await this.supabase.auth.signOut();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  getCurrentUser(): Observable<User | boolean | null> {
    return this.currentUser.asObservable();
  }

  getCurrentUserId(): string | null {
    if (this.currentUser.value) {
      return (this.currentUser.value as User).id;
    } else {
      return null;
    }
  }

  updateUser(user: User) {
    return this.supabase.auth.updateUser(user);
  }

  signInWithEmail(email: string) {
    return this.supabase.auth.signInWithOtp({ email });
  }

  logout() {
    if (confirm('Are you sure you want to log out?')) {
      this.supabase.auth.signOut();
      this.router.navigateByUrl('/', { replaceUrl: true });
    }
  }
  
  isLoggedIn(): boolean {
    if (this.currentUser.value) {
      return true;
    } else {
      return false;
    }
  }

  checkIfUserExists(email: string) {
    return this.supabase.from('users').select('email').eq('email', email);
  }

  userCart() {
    return this.supabase.from('cart').select().eq('user_id', this.getCurrentUserId());
  }

  addToCart(item: any) {
    return this.supabase.from('cart').insert([{ ...item, user_id: this.getCurrentUserId() }]);
  }

  removeFromCart(id: string) {
    return this.supabase.from('cart').delete().eq('id', id);
  }
}
