const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src/pages');
const results = {
  missingH1: [],
  missingH2: [],
  missingDescription: [],
  titleTooLong: [],
  descriptionTooLong: [],
  brokenHierarchy: [],
  pages: []
};

function analyzeFile(filePath, fileName) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extract SEOHead title and description
    const titleMatch = content.match(/title="([^"]+)"/);
    const descriptionMatch = content.match(/description="([^"]+)"/);
    
    const title = titleMatch ? titleMatch[1] : null;
    const description = descriptionMatch ? descriptionMatch[1] : null;
    
    // Count h1, h2, etc.
    const h1Count = (content.match(/<h1[^>]*>/gi) || []).length;
    const h2Count = (content.match(/<h2[^>]*>/gi) || []).length;
    const h3Count = (content.match(/<h3[^>]*>/gi) || []).length;
    
    // Extract heading hierarchy
    const headingRegex = /<(h[1-6])[^>]*>.*?<\/\1>/gi;
    const headings = [];
    let match;
    while ((match = headingRegex.exec(content)) !== null) {
      headings.push(parseInt(match[1][1]));
    }
    
    // Check for hierarchy issues
    let hasHierarchyIssue = false;
    for (let i = 1; i < headings.length; i++) {
      if (headings[i] - headings[i-1] > 1) {
        hasHierarchyIssue = true;
        break;
      }
    }
    
    const page = {
      file: fileName,
      path: filePath,
      title,
      titleLength: title ? title.length : 0,
      description,
      descriptionLength: description ? description.length : 0,
      h1Count,
      h2Count,
      h3Count,
      headingHierarchy: headings.join(' -> '),
      hasHierarchyIssue
    };
    
    results.pages.push(page);
    
    // Check for issues
    if (h1Count === 0) results.missingH1.push(page);
    if (h2Count === 0) results.missingH2.push(page);
    if (!description) results.missingDescription.push(page);
    if (title && title.length > 60) results.titleTooLong.push(page);
    if (description && description.length > 160) results.descriptionTooLong.push(page);
    if (hasHierarchyIssue) results.brokenHierarchy.push(page);
    
  } catch (err) {
    console.error(`Error analyzing ${fileName}:`, err.message);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (file.endsWith('.tsx')) {
      analyzeFile(filePath, file);
    }
  }
}

walkDir(pagesDir);

console.log('=== SEO ANALYSIS REPORT ===\n');
console.log(`Total Pages: ${results.pages.length}`);
console.log(`Missing H1: ${results.missingH1.length}`);
console.log(`Missing H2: ${results.missingH2.length}`);
console.log(`Missing Description: ${results.missingDescription.length}`);
console.log(`Title Too Long (>60 chars): ${results.titleTooLong.length}`);
console.log(`Description Too Long (>160 chars): ${results.descriptionTooLong.length}`);
console.log(`Broken Hierarchy: ${results.brokenHierarchy.length}`);

console.log('\n=== Missing H1 Pages ===');
results.missingH1.forEach(p => console.log(`- ${p.file}`));

console.log('\n=== Missing H2 Pages (first 10) ===');
results.missingH2.slice(0, 10).forEach(p => console.log(`- ${p.file}`));

console.log('\n=== Missing Description (first 10) ===');
results.missingDescription.slice(0, 10).forEach(p => console.log(`- ${p.file}`));

console.log('\n=== Title Too Long (first 10) ===');
results.titleTooLong.slice(0, 10).forEach(p => 
  console.log(`- ${p.file}: ${p.titleLength} chars`)
);

console.log('\n=== Description Too Long (first 10) ===');
results.descriptionTooLong.slice(0, 10).forEach(p => 
  console.log(`- ${p.file}: ${p.descriptionLength} chars`)
);

console.log('\n=== Broken Hierarchy (first 10) ===');
results.brokenHierarchy.slice(0, 10).forEach(p => 
  console.log(`- ${p.file}: ${p.headingHierarchy}`)
);
