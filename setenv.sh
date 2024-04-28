#!/bin/bash

cat <<EOF > src/environments/environment.ts
export const environment = {
  production: false,
  dbHost: '$DB_HOST',
  dbName: '$DB_NAME',
  dbUser: '$DB_USER',
  dbPassword: '$DB_PASSWORD',
  supabaseURI: '$SUPABASE_URI',
  supabaseUrl: '$SUPABASE_URL',
  supabaseKey: '$SUPABASE_KEY',
  supabaseSecretKey: '$SUPABASE_SECRET_KEY',
};
EOF

cat <<EOF > src/environments/environment.prod.ts
export const environment = {
  production: true,
  dbHost: '$DB_HOST',
  dbName: '$DB_NAME',
  dbUser: '$DB_USER',
  dbPassword: '$DB_PASSWORD',
  supabaseURI: '$SUPABASE_URI',
  supabaseUrl: '$SUPABASE_URL',
  supabaseKey: '$SUPABASE_KEY',
  supabaseSecretKey: '$SUPABASE_SECRET_KEY',
};
EOF

cat <<EOF > src/environments/environment.js
export const environment = {
  production: true,
  dbHost: '$DB_HOST',
  dbName: '$DB_NAME',
  dbUser: '$DB_USER',
  dbPassword: '$DB_PASSWORD',
  supabaseURI: '$SUPABASE_URI',
  supabaseUrl: '$SUPABASE_URL',
  supabaseKey: '$SUPABASE_KEY',
  supabaseSecretKey: '$SUPABASE_SECRET_KEY',
};
EOF