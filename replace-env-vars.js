const replaceInFile = require('replace-in-file');

const options = {
  files: 'src/environments/environment.ts',
  from: [
    /supabaseURI: 'REPLACE_WITH_REAL_VALUE'/g,
    /supabaseUrl: 'REPLACE_WITH_REAL_VALUE'/g,
    /supabaseKey: 'REPLACE_WITH_REAL_VALUE'/g,
    /supabaseSecretKey: 'REPLACE_WITH_REAL_VALUE'/g,
  ],
  to: [
    `supabaseURI: '${process.env.SUPABASE_URI}'`,
    `supabaseUrl: '${process.env.SUPABASE_URL}'`,
    `supabaseKey: '${process.env.SUPABASE_KEY}'`,
    `supabaseSecretKey: '${process.env.SUPABASE_SECRET_KEY}'`,
  ],
};

replaceInFile(options)
  .then(results => {
    console.log('Replacement results:', results);
  })
  .catch(error => {
    console.error('Error occurred:', error);
  });