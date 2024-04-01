var  createClient = require('@supabase/supabase-js');
var dotenv = require('dotenv');
dotenv.config();

const SUPABASE_URL = process.env.DB_URL;
const SUPABASE_KEY = process.env.DB_KEY;

const client = createClient(SUPABASE_URL, SUPABASE_KEY);

class Users {

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
        const user = new Users();
        await user.addUser('abarker6@live.maryville.edu', 'password');
    } catch (error) {
        console.error('Error:', error);
    }
}

run();