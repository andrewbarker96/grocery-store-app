import { Component, OnInit } from '@angular/core';
import { Grocery, groceries } from './shop';
import { CartService } from '../cart.service';
import { environment } from 'src/environments/environment';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const URL = environment.supabaseURL;
const KEY = environment.supabaseKey;

export const supabase: SupabaseClient = createClient(URL, KEY);

interface GroceryItem {
  name: string;
  price: number;
  quantity: number;
  total: number;
  image: string;
}

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {
  groceryItems: GroceryItem[] = []; // Initialize your groceryItems array

  constructor(private cartService: CartService) {}

  async ngOnInit() {
    let { data: groceries, error } = await supabase
      .from('groceries')
      .select('*');

    if (error) console.log('Error fetching groceries: ', error);
    else if (groceries) {
      this.groceryItems = groceries.map((grocery) => ({
        name: grocery.name,
        price: grocery.price,
        quantity: 1, // Default quantity
        total: grocery.price, // Default total
        image: grocery.image,
      }));
    }
  }

  addToCart(groceryItem: GroceryItem) {
    this.cartService.addToCart(groceryItem);
  }

  removeFromCart(groceryItem: GroceryItem) {
    this.cartService.removeFromCart(groceryItem);
  }

  getCartTotal() {
    return this.cartService.getCartTotal();
  }
}
