const logger = require('../utils/logger');
const config = require('../config/config');

module.exports = {
  name: 'tagall',
  aliases: ['everyone', 'all', 'mention'],
  category: 'group',
  description: 'Mention all group members',
  usage: 'tagall [message]',
  async execute(sock, message, args, db, sender, isGroup, from) {
    if (!isGroup) {
      await sock.sendMessage(from, { text: `${config.emoji.error} This command is for groups only!` });
      return;
    }
    
    const groupMeta = await sock.groupMetadata(from);
    const isAdmin = groupMeta.participants.find(p => p.id === sender)?.admin === 'admin' || 
                   groupMeta.participants.find(p => p.id === sender)?.admin === 'superadmin';
    
    if (!isAdmin) {
      await sock.sendMessage(from, { text: `${config.emoji.error} Only admins can use this command!` });
      return;
    }
    
    const participants = groupMeta.participants;
    let mentions = [];
    let text = `📢 *ANNOUNCEMENT*\n\n`;
    
    if (args.length > 0) {
      text += `Message: ${args.join(' ')}\n\n`;
    }
    
    for (let p of participants) {
      mentions.push(p.id);
      text += `@${p.id.split('@')[0]} `;
    }
    
    await sock.sendMessage(from, {
      text: text,
      mentions: mentions
    });
    
    logger.cmd('tagall', from, sender);
    db.addPoints(sender, 15);
  }
};
