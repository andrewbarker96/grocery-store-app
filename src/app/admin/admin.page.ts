import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

const URL = environment.supabaseURL;
const KEY = environment.supabaseKey;

export const supabase: SupabaseClient = createClient(URL, KEY);

interface GroceryItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  total: number;
  image: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  groceryItems: GroceryItem[] = [];
  groceryForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.groceryForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      image: [''],
    });
  }

  ngOnInit() {
    this.getGroceryItems();
  }

  async getGroceryItems() {
    let { data: groceries, error } = await supabase
      .from('groceries')
      .select('*');

    if (error) console.log('Error fetching groceries: ', error);
    else this.groceryItems = groceries as GroceryItem[];
  }

  async createGroceryItem(item: GroceryItem) {
    const { data, error } = await supabase.from('groceries').insert([item]);

    if (error) console.log('Error creating grocery item: ', error);
    else {
      console.log(`${item.name} successully added`);
      await this.getGroceryItems();
    }
  }

  async updateGroceryItem(item: GroceryItem) {
    const { data, error } = await supabase
      .from('groceries')
      .update(item)
      .match({ id: item.id });

    if (error) console.log('Error updating grocery item: ', error);
    else await this.getGroceryItems();
  }

  async deleteGroceryItem(id: number) {
    const { data, error } = await supabase
      .from('groceries')
      .delete()
      .match({ id });

    if (error) console.log('Error deleting grocery item: ', error);
    else await this.getGroceryItems();
  }

  async onSubmit() {
    if (this.groceryForm.valid) {
      const formData = this.groceryForm.value;

      if (formData.id) {
        await this.updateGroceryItem(formData);
      } else {
        await this.createGroceryItem(formData);
      }

      this.resetForm();
    }
  }

  resetForm() {
    this.groceryForm.reset();
  }

  editGroceryItem(item: GroceryItem) {
    this.groceryForm.patchValue(item);
  }
}
