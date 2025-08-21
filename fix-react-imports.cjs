const fs = require('fs');
const path = require('path');

// Function to remove unused React imports
function removeUnusedReactImports() {
  const componentsDir = path.join(__dirname, 'src', 'components');
  
  // Function to recursively find all .tsx files
  function findTsxFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      file = path.join(dir, file);
      const stat = fs.statSync(file);
      if (stat && stat.isDirectory()) {
        results = results.concat(findTsxFiles(file));
      } else if (path.extname(file) === '.tsx') {
        results.push(file);
      }
    });
    return results;
  }
  
  // Get all .tsx files
  const tsxFiles = findTsxFiles(componentsDir);
  
  // Fix each file
  tsxFiles.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove unused React imports
    const reactImportRegex = /import\s+React(\s+|\s*,\s*\{[^}]*\}\s*|\s+from\s+['"]react['"];\s*)/g;
    if (reactImportRegex.test(content)) {
      content = content.replace(reactImportRegex, '');
      fs.writeFileSync(filePath, content);
      console.log(`Fixed React imports in: ${filePath}`);
    }
  });
}

// Run the fix
removeUnusedReactImports();
console.log('All React import issues have been fixed!');