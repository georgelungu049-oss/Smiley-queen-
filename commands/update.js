const logger = require('../utils/logger');
const config = require('../config/config');
const { exec } = require('child_process');
const fs = require('fs');

module.exports = {
  name: 'update',
  aliases: ['upgrade', 'pull'],
  category: 'owner',
  description: 'Update bot from GitHub repository',
  usage: 'update',
  async execute(sock, message, args, db, sender, isGroup, from) {
    // Check if sender is owner
    if (sender !== config.ownerNumberJid && sender !== config.ownerNumber) {
      await sock.sendMessage(from, { 
        text: `${config.emoji.error} *Owner Only Command*\n\nThis command can only be used by the bot owner.` 
      });
      return;
    }
    
    await sock.sendMessage(from, { 
      text: `🔄 *Checking for updates...*\n\nPlease wait while I check for updates from GitHub...` 
    });
    
    // Check for updates
    exec('git fetch origin', (fetchErr) => {
      if (fetchErr) {
        return sock.sendMessage(from, { 
          text: `${config.emoji.error} *Update Check Failed*\n\nError: ${fetchErr.message}` 
        });
      }
      
      exec('git rev-parse HEAD', (err1, localHash) => {
        exec('git rev-parse origin/main', (err2, remoteHash) => {
          if (err1 || err2) {
            return sock.sendMessage(from, { 
              text: `${config.emoji.error} *Error*\n\nCould not check repository status.` 
            });
          }
          
          if (localHash.trim() === remoteHash.trim()) {
            return sock.sendMessage(from, { 
              text: `✅ *Bot is Up to Date!*\n\nCurrent version: ${localHash.substring(0, 7)}\n\nNo updates available.` 
            });
          }
          
          // There are updates available
          sock.sendMessage(from, { 
            text: `🔄 *Updates Available!*\n\nLocal: ${localHash.substring(0, 7)}\nRemote: ${remoteHash.substring(0, 7)}\n\nStarting update process...` 
          });
          
          // Pull updates
          exec('git pull origin main', (pullErr, stdout, stderr) => {
            if (pullErr) {
              return sock.sendMessage(from, { 
                text: `${config.emoji.error} *Update Failed*\n\n${pullErr.message}` 
              });
            }
            
            sock.sendMessage(from, { 
              text: `✅ *Update Successful!*\n\n${stdout}\n\n🔄 Restarting bot to apply changes...` 
            });
            
            // Restart bot after 2 seconds
            setTimeout(() => {
              process.exit(0);
            }, 2000);
          });
        });
      });
    });
    
    logger.cmd('update', from, sender);
    db.addPoints(sender, 5);
  }
};
