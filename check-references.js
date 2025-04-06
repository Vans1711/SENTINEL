const fs = require('fs');
const path = require('path');

function searchFiles(dir, searchTerm) {
  const files = fs.readdirSync(dir);
  
  for (let file of files) {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    
    if (stats.isDirectory()) {
      try {
        searchFiles(filePath, searchTerm);
      } catch (err) {
        console.error(`Error accessing directory ${filePath}: ${err.message}`);
      }
    } else {
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        if (content.includes(searchTerm)) {
          console.log(`Found reference to "${searchTerm}" in: ${filePath}`);
        }
      } catch (err) {
        console.error(`Error reading file ${filePath}: ${err.message}`);
      }
    }
  }
}

// Start searching from the current directory
searchFiles('.', 'AIChatAssistant'); 