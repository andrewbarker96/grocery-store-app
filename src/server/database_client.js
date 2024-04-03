const { createClient } = require('@supabase/supabase-js');
const environment = require('../environments/environment');

const client = createClient(environment.supabaseURL, environment.supabaseKey);

class Supabase {
 
    async getItems() {
        try {
            const { data: items, error } = await client
                .from('groceries')
                .select('*');

            if (error) throw error;

            console.log('Fetched grocery items:', items);
            return items;
        } catch (error) {
            console.error('Error fetching grocery items:', error.message);
            throw error;
        }
    }

    async addItem(name, price, image) {
      try {
          // Check if the item already exists
          const { data: existingItems } = await client
              .from('groceries')
              .select('*')
              .eq('name', name);
  
          if (existingItems.length > 0) {
              // Update existing item
              const existingItem = existingItems[0];
              await client
                  .from('groceries')
                  .update({ price, image })
                  .eq('id', existingItem.id);
              console.log('Item already existed. It has been updated:', existingItem.id);
          } else {
              // Insert new item
              const { error } = await client
                  .from('groceries')
                  .insert([{ name, price, image }]);
              if (error) throw error;
              console.log('Item added successfully:', name);
          }
      } catch (error) {
          console.error('Error adding item:', error.message);
          throw error;
      }
  }  

    async deleteItem(id) {
        try {
            const { error } = await client
                .from('groceries')
                .delete()
                .eq('id', id);

            if (error) throw error;

            console.log('Item deleted successfully:', id);
        } catch (error) {
            console.error('Error deleting item:', error.message);
            throw error;
        }
    }

    async updateItem(id, name, price, image) {
        try {
            const { error } = await client
                .from('groceries')
                .update({ name, price, image })
                .eq('id', id);

            if (error) throw error;

            console.log('Item updated successfully:', id);
        } catch (error) {
            console.error('Error updating item:', error.message);
            throw error;
        }
    }

    async addUser(email, password) {
      try {
          // Check if the email already exists
          const { data: existingUsers, error: fetchError } = await client
              .from('users')
              .select('id')
              .eq('email', email);

          if (fetchError) throw fetchError;

          // If email already exists, do not proceed
          if (existingUsers && existingUsers.length > 0) {
              console.log("User with this email already exists:", email);
              return;
          }

          // Add the user if email doesn't exist
          const { error: insertError } = await client
              .from('users')
              .insert([{ email, password }])
              .single();

          if (insertError) throw insertError;

          console.log("User added successfully for", email);
      } catch (error) {
          console.error('Error adding user:', error.message);
          throw error;
      }
  }

  async changePassword(email, password) {
    try {
        // Check if the email exists
        const { data: existingUsers, error: fetchError } = await client
            .from('users')
            .select('id')
            .eq('email', email);

        if (fetchError) throw fetchError;

        // If email doesn't exist, do not proceed
        if (!existingUsers || existingUsers.length === 0) {
            console.log("User with this email does not exist:", email);
            return;
        }

        // Change the password if email exists
        const { error: updateError } = await client
            .from('users')
            .update({ password })
            .eq('email', email);

        if (updateError) throw updateError;

        console.log("Password changed successfully for", email);
    } catch (error) {
        console.error('Error changing password:', error.message);
        throw error;
    }
}
}

async function run() {
    try {
        const supabase = new Supabase();
        await supabase.getItems();
        await supabase.addItem('Red Grapes (3lb)', 4.99, 'https://via.placeholder.com/150');
        await supabase.deleteItem(5);
        await supabase.addItem('Green Grapes (3lb)', 4.99, 'https://via.placeholder.com/150');
        await supabase.addUser('johndoe@live.maryville.edu', 'password');
        await supabase.changePassword('johndoe@live.maryville.edu', 'newpassword');
    } catch (error) {
        console.error('Error:', error);
    }
}

run();