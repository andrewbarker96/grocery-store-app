        await supabase.addItem('Red Grapes (3lb)', 4.99, 'https://via.placeholder.com/150');
        await supabase.deleteItem(5);
        await supabase.addItem('Green Grapes (3lb)', 4.99, 'https://via.placeholder.com/150');
        await supabase.addUser('johndoe@live.maryville.edu', 'password');
        await supabase.changePassword('johndoe@live.maryville.edu', 'newpassword');