#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
  if (!fs.existsSync(src)) {
    console.warn(`⚠ Source directory not found: ${src}`);
    return;
  }

  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const files = fs.readdirSync(src);
  files.forEach(file => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    if (fs.statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
  console.log(`✓ Copied ${src} to ${dest}`);
}

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
  console.log('Sample files:', files);
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

// Copy Prisma client to Next.js output for serverless functions
console.log('\nCopying Prisma client to .next output...');
const nextServerDir = path.join(process.cwd(), '.next', 'server');
if (fs.existsSync(nextServerDir)) {
  const destPrismaDir = path.join(nextServerDir, '.prisma', 'client');
  copyDir(prismaClientDir, destPrismaDir);
} else {
  console.warn('⚠ .next/server directory not found');
}

console.log('\n=== Build Complete ===');
