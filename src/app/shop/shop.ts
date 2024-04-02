// Define the Grocery class
class Grocery {
  name: string;
  price: number;
  total: number;

  constructor(name: string, price: number = 0.0) {
    this.name = name;
    this.price = price;
    this.total = price;
  }
}

class Total {
  total: number;

  constructor(total: number) {
    this.total = total;
  }
}

// Create an array of grocery items
let groceries: Grocery[] = [
  new Grocery('2% Milk', 2.99),
  new Grocery('Bread', 3.99),
  new Grocery('Broccoli', 2.99),
  new Grocery('Butter', 4.99),
  new Grocery('Carrots', 1.99),
  new Grocery('Chicken Breast', 7.99),
  new Grocery('Colby Jack Shredded Cheese', 3.99),
  new Grocery('Ground Beef', 5.99),
  new Grocery('Green Beans', 2.99),
  new Grocery('Marinara Sauce', 5.99),
  new Grocery('Penne Pasta', 2.99),
  new Grocery('Pork Chops', 8.99),
  new Grocery('Potatoes', 3.99),
  new Grocery('Salmon', 9.99),
  new Grocery('Spaghetti', 2.99),
  new Grocery('Tilapia', 7.99),
  new Grocery('White Eggs', 1.99),
];

let total: number = 0;
groceries.forEach((grocery) => {
  total += grocery.total;
});

// Define the GroceryItem class
class GroceryItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
  image: string;

  constructor(
    name: string,
    quantity: number,
    price: number,
    image: string,
    total: number = 0.0
  ) {
    this.name = name;
    this.quantity = quantity;
    this.price = price;
    this.image = image;
    this.total = price * quantity;
  }
}

export { Grocery, GroceryItem, groceries, total };
