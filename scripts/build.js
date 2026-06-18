#!/usr/bin/env node
const { execSync } = require('child_process');

console.log('=== Building Project ===');

// Generate Prisma client
console.log('\n1. Generating Prisma client...');
try {
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('✓ Prisma client generated');
} catch (error) {
  console.error('✗ Prisma generate failed:', error.message);
  process.exit(1);
}

// Build Next.js
console.log('\n2. Building Next.js...');
try {
  execSync('next build', { stdio: 'inherit' });
  console.log('✓ Next.js build complete');
} catch (error) {
  console.error('✗ Next.js build failed:', error.message);
  process.exit(1);
}

console.log('\n=== Build Complete ===');
