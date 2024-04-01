const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

const client = createClient(SUPABASE_URL, SUPABASE_KEY);

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
}

async function run() {
    try {
        const supabase = new Supabase();
        await supabase.getItems();
    } catch (error) {
        console.error('Error:', error);
    }
}

run();