import fs from 'fs';
import path from 'path';

const SRC_DIR = 'd:/Coding Projects/hospital/Shree-Kalyan-Hospital-real-site/src';

const MAPPINGS = {
  'hero-corridor.jpg': 'corridor.png',
  'hospital-exterior.jpg': 'hospital.png',
  'hospital-lobby.png': 'reception.png',
  'operating-theatre.png': 'lab.png',
  'surgical-theater.jpg': 'ward.jpeg',
  'founder-doctor.png': 'kapilG.jpeg',
  'anjali-sharma.png': 'kapilG.jpeg',
};

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      for (const [oldImg, newImg] of Object.entries(MAPPINGS)) {
        if (content.includes(oldImg)) {
          content = content.replaceAll(oldImg, newImg);
          changed = true;
        }
      }
      if (changed) {
        fs.writeFileSync(fullPath, content);
        console.log('Updated ' + fullPath);
      }
    }
  }
}

walk(SRC_DIR);
