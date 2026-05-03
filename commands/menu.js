const { generateMenu } = require('../utils/helpers');
const config = require('../config/config');
const logger = require('../utils/logger');
const fs = require('fs');

module.exports = {
  name: 'menu',
  aliases: ['help', 'h'],
  category: 'info',
  async execute(sock, message, args, db, sender, isGroup, from) {
    const user = db.getUser(sender);
    const cmdCount = fs.readdirSync('./commands').length;
    
    const menu = generateMenu(
      config.botName,
      config.prefix,
      user.points,
      user.level,
      cmdCount
    );
    
    await sock.sendMessage(from, { text: menu });
    logger.cmd('menu', from, sender);
    db.addPoints(sender, 2);
  }
};
