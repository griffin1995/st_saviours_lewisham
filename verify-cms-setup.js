const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying St Saviour\'s CMS Setup...\n');

// Check environment file
const envFile = '.env.local';
if (fs.existsSync(envFile)) {
  console.log('✅ Environment file (.env.local) exists');
} else {
  console.log('❌ Missing .env.local file');
}

// Check data directory and files
const dataDir = 'data';
const requiredFiles = [
  'news.json',
  'events.json', 
  'mass-times.json',
  'settings.json',
  'parish-groups.json',
  'gallery.json'
];

if (fs.existsSync(dataDir)) {
  console.log('✅ Data directory exists');
  
  let allFilesExist = true;
  requiredFiles.forEach(file => {
    const filePath = path.join(dataDir, file);
    if (fs.existsSync(filePath)) {
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        JSON.parse(content); // Validate JSON
        console.log(`✅ ${file} - Valid JSON`);
      } catch (error) {
        console.log(`❌ ${file} - Invalid JSON: ${error.message}`);
        allFilesExist = false;
      }
    } else {
      console.log(`❌ Missing ${file}`);
      allFilesExist = false;
    }
  });
  
  if (allFilesExist) {
    console.log('\n🎉 All data files are present and valid!');
  }
} else {
  console.log('❌ Data directory does not exist');
}

// Check admin pages
const adminPages = [
  'src/pages/admin/login.tsx',
  'src/pages/admin/index.tsx', 
  'src/pages/admin/news.tsx',
  'src/pages/admin/events.tsx',
  'src/pages/admin/mass-times.tsx',
  'src/pages/admin/groups.tsx',
  'src/pages/admin/gallery.tsx',
  'src/pages/admin/settings.tsx'
];

let adminPagesExist = true;
adminPages.forEach(page => {
  if (fs.existsSync(page)) {
    console.log(`✅ ${page.split('/').pop()} exists`);
  } else {
    console.log(`❌ Missing ${page}`);
    adminPagesExist = false;
  }
});

// Check API routes
const apiRoutes = [
  'src/pages/api/admin/auth.ts',
  'src/pages/api/admin/news.ts',
  'src/pages/api/admin/events.ts',
  'src/pages/api/admin/mass-times.ts',
  'src/pages/api/admin/groups.ts',
  'src/pages/api/admin/gallery.ts',
  'src/pages/api/admin/settings.ts',
  'src/pages/api/admin/init.ts'
];

let apiRoutesExist = true;
apiRoutes.forEach(route => {
  if (fs.existsSync(route)) {
    console.log(`✅ ${route.split('/').pop()} exists`);
  } else {
    console.log(`❌ Missing ${route}`);
    apiRoutesExist = false;
  }
});

// Final status
console.log('\n📋 Setup Summary:');
console.log(`Environment: ${fs.existsSync(envFile) ? '✅' : '❌'}`);
console.log(`Data Files: ${fs.existsSync(dataDir) && requiredFiles.every(f => fs.existsSync(path.join(dataDir, f))) ? '✅' : '❌'}`);
console.log(`Admin Pages: ${adminPagesExist ? '✅' : '❌'}`);
console.log(`API Routes: ${apiRoutesExist ? '✅' : '❌'}`);

console.log('\n🚀 Next Steps:');
console.log('1. Run: npm run dev');
console.log('2. Visit: http://localhost:3001/admin/login');
console.log('3. Login with: admin / StSaviours2025!');
console.log('4. ⚠️  IMPORTANT: Change the default password in production!');