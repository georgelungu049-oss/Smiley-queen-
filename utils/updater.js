const { exec } = require('child_process');
const logger = require('./logger');

class Updater {
  static async checkUpdates() {
    return new Promise((resolve) => {
      exec('git fetch origin', (fetchErr) => {
        if (fetchErr) {
          resolve({ error: fetchErr.message });
          return;
        }
        
        exec('git rev-parse HEAD', (err1, localHash) => {
          exec('git rev-parse origin/main', (err2, remoteHash) => {
            if (err1 || err2) {
              resolve({ error: 'Could not check repository status' });
              return;
            }
            
            const isUpdated = localHash.trim() === remoteHash.trim();
            resolve({
              updated: isUpdated,
              local: localHash.trim().substring(0, 7),
              remote: remoteHash.trim().substring(0, 7)
            });
          });
        });
      });
    });
  }
  
  static async pullUpdates() {
    return new Promise((resolve) => {
      exec('git pull origin main', (err, stdout, stderr) => {
        if (err) {
          resolve({ error: err.message });
          return;
        }
        
        exec('npm install', (npmErr, npmOut) => {
          if (npmErr) {
            resolve({ error: npmErr.message });
            return;
          }
          
          resolve({
            success: true,
            output: stdout,
            npmOutput: npmOut
          });
        });
      });
    });
  }
  
  static async getCommitInfo() {
    return new Promise((resolve) => {
      exec('git log -1 --format="%h - %s (%cd)"', (err, output) => {
        if (err) {
          resolve({ error: err.message });
          return;
        }
        resolve({ commit: output.trim() });
      });
    });
  }
}

module.exports = Updater;
