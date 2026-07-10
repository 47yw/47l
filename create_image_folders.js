const fs = require('fs');
const path = require('path');

const projectsDataPath = path.join(__dirname, 'data', 'projects.json');
const projects = JSON.parse(fs.readFileSync(projectsDataPath, 'utf8'));

const assetsDir = path.join(__dirname, 'assets', 'projects');

// Create base directory if it doesn't exist
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

projects.forEach(p => {
  const projDir = path.join(assetsDir, `project${p.id}`);
  if (!fs.existsSync(projDir)) {
    fs.mkdirSync(projDir, { recursive: true });
  }
  
  // Write a readme file telling the user to upload their cover.png here
  const readmePath = path.join(projDir, 'instructions.txt');
  fs.writeFileSync(readmePath, `Liam's Portfolio - Project ${p.id}: ${p.title}\n\nUpload your project cover image to this folder as "cover.png".\nIf no image is uploaded, a beautiful minimalist placeholder will be rendered dynamically.\n`);
  
  console.log(`Created folder and instructions for Project ${p.id} (${p.title})`);
});

console.log('All image folders created successfully!');
