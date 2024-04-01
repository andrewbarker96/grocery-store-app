import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
dotenv.config();

const db_username = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;
const db_host = process.env.DB_HOST;
const db_cluster = process.env.DB_CLUSTER;

const db_uri = `mongodb+srv://${db_username}:${db_password}@${db_host}/?retryWrites=true&w=majority&appName=${db_cluster}`;

class CreateUser {
    constructor() {
        this.client = new MongoClient(db_uri);
    }

    async create(user) {
        try {
            await this.client.connect();
            console.log('Connected to MongoDB');

            const db = this.client.db('userDB');
            const users = db.collection('users');

            const filter = { username: user.username };

            const update = {
                $set: {
                    username: user.username,
                    password: user.password,
                    email: user.email
                },
            };

            const options = { upsert: true };
            const result = await users.updateOne(filter, update, options);

            if (result.upsertedCount === 1) {
                console.log(`Created user ${user.username}`);
            }
            else {
                console.log(`Updated user ${user.username}`);
            }

            await this.client.close();
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }
}

export default CreateUser;

async function run() {
    try {
        const user = {
            username: 'admin',
            password: 'admin',
            email: '',
        };

        console.log('Creating user:', user);

        await new CreateUser().create(user);
    }
    catch (error) {
        console.error('Error:', error);
    }
}

run().catch(console.error);
