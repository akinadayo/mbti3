#!/usr/bin/env node

/**
 * Node.js script for API key injection
 * Alternative method if sed fails
 */

const fs = require('fs');
const path = require('path');

function injectApiKey() {
    const apiKey = process.env.API_KEY || process.env.OPENROUTER_API_KEY;
    
    if (!apiKey) {
        console.error('❌ Error: No API key found in environment');
        console.error('Expected: API_KEY or OPENROUTER_API_KEY environment variable');
        process.exit(1);
    }
    
    if (!apiKey.startsWith('sk-or-v1-')) {
        console.error('❌ Error: API key format incorrect');
        console.error(`Expected format: sk-or-v1-... but got: ${apiKey.substring(0, 10)}...`);
        process.exit(1);
    }
    
    const indexPath = path.join(process.cwd(), 'index.html');
    
    if (!fs.existsSync(indexPath)) {
        console.error('❌ Error: index.html not found');
        process.exit(1);
    }
    
    console.log('🔍 Reading index.html...');
    let content = fs.readFileSync(indexPath, 'utf8');
    
    const placeholder = '{{OPENROUTER_API_KEY}}';
    const placeholderCount = (content.match(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
    
    console.log(`🔍 Found ${placeholderCount} placeholders to replace`);
    
    if (placeholderCount === 0) {
        console.error('❌ Error: No placeholders found in index.html');
        process.exit(1);
    }
    
    // Replace all placeholders
    content = content.replace(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), apiKey);
    
    // Verify replacement
    const remainingPlaceholders = (content.match(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
    
    if (remainingPlaceholders > 0) {
        console.error(`❌ Error: ${remainingPlaceholders} placeholders still remain after replacement`);
        process.exit(1);
    }
    
    // Write back to file
    fs.writeFileSync(indexPath, content, 'utf8');
    
    console.log('✅ API key injection completed successfully');
    console.log(`✅ Replaced ${placeholderCount} placeholders`);
    
    // Verify API key exists in file
    const apiKeyCount = (content.match(/sk-or-v1-/g) || []).length;
    console.log(`✅ API key appears ${apiKeyCount} times in final file`);
}

injectApiKey();