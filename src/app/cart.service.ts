import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { GroceryItem } from "./shop/shop";
import { IonicModule } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private cartItems = new BehaviorSubject<GroceryItem[]>([]);

  getCartItems() {
    return this.cartItems.asObservable();
  }

  addToCart(item: GroceryItem) {
    const currentValue = this.cartItems.value;
    this.cartItems.next([...currentValue, item]);
  }

  removeFromCart(item: GroceryItem) {
    const currentItems = this.cartItems.value;
    const index = currentItems.findIndex((i) => i.name === item.name);
    if (index > -1) {
      currentItems.splice(index, 1);
      this.cartItems.next(currentItems);
    }
  }

  getCartTotal() {
    return this.cartItems.value.reduce((total, item) => total + item.total, 0);
  }

  quantityChange(item: GroceryItem, quantity: number) {
    const currentItems = this.cartItems.value;
    const index = currentItems.findIndex((i) => i.name === item.name);
    if (index > -1) {
      currentItems[index].quantity = quantity;
      currentItems[index].total = quantity * currentItems[index].price;
      this.cartItems.next(currentItems);
    }
  }
  clearCart() {
    this.cartItems.next([]);
  }
}
