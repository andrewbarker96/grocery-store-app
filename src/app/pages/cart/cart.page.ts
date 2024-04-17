import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { IonicModule } from '@ionic/angular';

interface GroceryItem {
  name: string;
  price: number;
  quantity: number;
  total: number;
  image: string;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cartItems$: Observable<GroceryItem[]> = new Observable<GroceryItem[]>();

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartItems$ = this.cartService.getCartItems();
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
}
