import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { environment } from 'src/environments/environment';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Keyboard } from '@capacitor/keyboard';

const URL = environment.supabaseUrl;
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
  groceryItems: GroceryItem[] = [];
  filteredItems: GroceryItem[] = [];
  searchTerm: string = '';
  searchActive: boolean = false;

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

    Keyboard.show(); // show the keyboard
    Keyboard.setAccessoryBarVisible({ isVisible: true }); // show the accessory bar
  }

  addToCart(groceryItem: GroceryItem) {
    this.cartService.addToCart(groceryItem);
    Keyboard.hide(); // hide the keyboard
  }

  removeFromCart(groceryItem: GroceryItem) {
    this.cartService.removeFromCart(groceryItem);
  }

  getCartTotal() {
    return this.cartService.getCartTotal();
  }
  filterItems() {
    this.searchActive = true;
    if (this.searchTerm.trim() === '') {
      this.filteredItems = this.groceryItems;
    } else {
      this.filteredItems = this.groceryItems.filter((item) => {
        return item.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      });
    }
  }
  onSearchBlur() {
    this.searchActive = false;
  }
}
