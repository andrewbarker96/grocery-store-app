
module.exports = {
  production: true,
  dbHost: process.env['DB_HOST'],
  dbName: process.env['DB_NAME'],
  dbUser: process.env['DB_USER'],
  dbPassword: process.env['DB_PASSWORD'],
  supabaseURI: process.env['SUPABASE_URI'],
  supabaseUrl: process.env['SUPABASE_URL'],
  supabaseKey: process.env['SUPABASE_KEY'],
  supabaseSecretKey: process.env['SUPABASE_SECRET_KEY'],
};

