const { formatUptime } = require('../utils/helpers');
const config = require('../config/config');
const logger = require('../utils/logger');
const os = require('os');

module.exports = {
  name: 'info',
  aliases: ['botinfo', 'about'],
  category: 'info',
  description: 'Show bot information',
  usage: 'info',
  async execute(sock, message, args, db, sender, isGroup, from) {
    const uptime = formatUptime(process.uptime());
    const memoryUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
    const totalMemory = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
    
    const info = `╭━━━〔 ${config.botName} Info 〕━━━⬣
│
├─🤖 *BOT INFORMATION*
│  • Name: ${config.botName}
│  • Version: 1.0.0
│  • Owner: ${config.ownerName}
│  • Prefix: ${config.prefix}
│  • Status: 🟢 Active
│
├─💻 *SYSTEM INFO*
│  • Uptime: ${uptime}
│  • Memory: ${memoryUsage} MB / ${totalMemory} GB
│  • Platform: ${os.platform()}
│  • Node: ${process.version}
│
├─📊 *STATISTICS*
│  • Commands: ${fs.readdirSync('./commands').length}
│  • Users: ${Object.keys(db.data.users).length}
│  • Groups: ${Object.keys(db.data.groups).length}
│
├─🔗 *LINKS*
│  • Owner: wa.me/${config.ownerNumber}
│
╰━━━━━━━━━━━━━━━━⬣`;
    
    await sock.sendMessage(from, { text: info });
    logger.cmd('info', from, sender);
    db.addPoints(sender, 3);
  }
};
