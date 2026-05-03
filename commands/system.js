const logger = require('../utils/logger');
const config = require('../config/config');
const os = require('os');
const { exec } = require('child_process');

module.exports = {
  name: 'system',
  aliases: ['sys', 'status'],
  category: 'info',
  description: 'Show bot system information',
  usage: 'system',
  async execute(sock, message, args, db, sender, isGroup, from) {
    const uptime = process.uptime();
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);
    
    const memory = process.memoryUsage();
    const heapUsed = (memory.heapUsed / 1024 / 1024).toFixed(2);
    const heapTotal = (memory.heapTotal / 1024 / 1024).toFixed(2);
    
    // Get git info
    exec('git rev-parse --short HEAD', (err, commit) => {
      exec('git log -1 --format=%cd', (err2, date) => {
        const sysInfo = `╭━━━〔 System Information 〕━━━⬣
│
├─🤖 *BOT INFO*
│  • Name: ${config.botName}
│  • Owner: ${config.ownerName}
│  • Prefix: ${config.prefix}
│
├─⏱️ *UPTIME*
│  • ${hours}h ${minutes}m ${seconds}s
│
├─💾 *MEMORY*
│  • Used: ${heapUsed} MB
│  • Total: ${heapTotal} MB
│
├─📦 *GIT INFO*
│  • Commit: ${commit ? commit.trim() : 'N/A'}
│  • Date: ${date ? date.trim().substring(0, 25) : 'N/A'}
│
├─🖥️ *SYSTEM*
│  • Platform: ${os.platform()}
│  • Node: ${process.version}
│
╰━━━━━━━━━━━━━━━━⬣`;
        
        sock.sendMessage(from, { text: sysInfo });
      });
    });
    
    logger.cmd('system', from, sender);
    db.addPoints(sender, 3);
  }
};
