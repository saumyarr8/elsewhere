#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('=== Prisma Build Setup ===');
console.log('Current directory:', process.cwd());
console.log('Node version:', process.version);

// Generate Prisma client
console.log('\nGenerating Prisma client...');
try {
  execSync('npx prisma generate', { stdio: 'inherit' });
} catch (error) {
  console.error('Prisma generate failed:', error.message);
  process.exit(1);
}

// Check if .prisma/client exists
const prismaClientDir = path.join(process.cwd(), '.prisma', 'client');
if (fs.existsSync(prismaClientDir)) {
  console.log('\n✓ .prisma/client directory found');
  const files = fs.readdirSync(prismaClientDir).slice(0, 10);
  console.log('Files:', files);
} else {
  console.warn('\n⚠ .prisma/client directory NOT found');
}

// Build Next.js
console.log('\nBuilding Next.js...');
try {
  execSync('next build', { stdio: 'inherit' });
} catch (error) {
  console.error('Next.js build failed:', error.message);
  process.exit(1);
}

console.log('\n=== Build Complete ===');
