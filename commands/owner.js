const config = require('../config/config');
const logger = require('../utils/logger');

module.exports = {
  name: 'owner',
  aliases: ['creator'],
  category: 'info',
  async execute(sock, message, args, db, sender, isGroup, from) {
    const text = `╭━━━〔 Owner Information 〕━━━⬣
│
├─👑 *OWNER DETAILS*
│  • Name: ${config.ownerName}
│  • Number: ${config.ownerNumber}
│  • Bot: ${config.botName}
│
├─📞 *CONTACT*
│  WhatsApp: wa.me/${config.ownerNumber}
│
╰━━━━━━━━━━━━━━━━⬣`;
    
    await sock.sendMessage(from, { text: text });
    logger.cmd('owner', from, sender);
    db.addPoints(sender, 3);
  }
};
