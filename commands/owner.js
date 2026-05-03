const config = require('../config/config');
const logger = require('../utils/logger');

module.exports = {
  name: 'owner',
  aliases: ['creator', 'dev', 'master'],
  category: 'info',
  description: '👑 Get bot owner contact information',
  usage: 'owner',
  async execute(sock, message, args, db, sender, isGroup, from) {
    const text = `╭━━━━━━━━━━━━━━━━━━━━━━━━╮
│     👑 BOT OWNER 👑      
├────────────────────────┤
│  📛 *Name*: ${config.ownerName}
│  📱 *WhatsApp*: wa.me/${config.ownerNumber}
│  🤖 *Bot*: ${config.botName}
│  💖 *Status*: Available 24/7
│
│  📋 *Services*
│  ├ Bot Support
│  ├ Feature Requests
│  ├ Bug Reports
│  └ Collaboration
│
│  💝 *Support*
│  Contact owner for:
│  ├ Issues
│  ├ Suggestions
│  └ Partnership
│
╰────────────────────────╯

_👑 Your satisfaction is our priority!_`;
    
    await sock.sendMessage(from, { text: text });
    logger.cmd('owner', from, sender);
    db.addPoints(sender, 3);
  }
};
