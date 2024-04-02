import { Component, OnInit } from '@angular/core';
import { Grocery, groceries } from './shop';
import { CartService } from '../cart.service';
import { IonicModule } from '@ionic/angular';
import { Supabase } from 'database_client';

interface GroceryItem {
  name: string;
  price: number;
  quantity: number;
  total: number;
  image: string;
}

// async function fetchData() {
//   const supabaseInstance = new Supabase(); 
//   try {
//     const items = await supabaseInstance.getItems(); 
//     console.log('Fetched items:', items);
//   } catch (error) {
//     console.error('Error fetching items:', error);
//   }
// }

@Component({
  selector: 'app-groceries',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {
  groceriesList: Grocery[] = groceries;
  groceryItems: GroceryItem[] = []; // Initialize your groceryItems array

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.groceryItems = this.groceriesList.map((grocery) => ({
      name: grocery.name,
      price: grocery.price,
      quantity: 1, // Default quantity
      total: grocery.price, // Default total
      image: '',
    }));
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

  clearCart() {
    this.cartService.clearCart();
  }

  checkout() {}
}
