const logger = require('../utils/logger');
const { formatTime } = require('../utils/helpers');

module.exports = {
  name: 'runtime',
  aliases: ['uptime', 'alive'],
  category: 'info',
  description: '⏱️ Check bot uptime and system status',
  usage: 'runtime',
  async execute(sock, message, args, db, sender, isGroup, from) {
    const uptime = process.uptime();
    const days = Math.floor(uptime / 86400);
    const hours = Math.floor((uptime % 86400) / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);
    
    const startTime = new Date(Date.now() - (uptime * 1000));
    
    const runtime = `╭━━━━━━━━━━━━━━━━━━━━━━━━╮
│     ⏱️ BOT RUNTIME       
├────────────────────────┤
│  🕐 *Uptime*
│  ${days}d ${hours}h ${minutes}m ${seconds}s
│
│  🚀 *Started*
│  ${startTime.toLocaleString()}
│
│  💚 *Status*
│  ✅ Online & Active
│
│  📊 *Performance*
│  ├ CPU: ${(process.cpuUsage().user / 1000000).toFixed(2)}%
│  └ Memory: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
│
╰────────────────────────╯`;
    
    await sock.sendMessage(from, { text: runtime });
    logger.cmd('runtime', from, sender);
    db.addPoints(sender, 2);
  }
};
