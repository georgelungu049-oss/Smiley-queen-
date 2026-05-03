const { formatNumber, formatTime } = require('../utils/helpers');
const logger = require('../utils/logger');

module.exports = {
  name: 'stats',
  aliases: ['mystats'],
  category: 'info',
  async execute(sock, message, args, db, sender, isGroup, from) {
    const user = db.getUser(sender);
    const uptime = formatTime(process.uptime() * 1000);
    
    const stats = `╭━━━〔 Your Statistics 〕━━━⬣
│
├─📊 *PERSONAL STATS*
│  • Points: ${formatNumber(user.points)}
│  • Level: ${user.level}
│  • Commands: ${formatNumber(user.commandsUsed)}
│
├─🤖 *BOT STATS*
│  • Uptime: ${uptime}
│
╰━━━━━━━━━━━━━━━━⬣`;
    
    await sock.sendMessage(from, { text: stats });
    logger.cmd('stats', from, sender);
    db.addPoints(sender, 5);
  }
};
