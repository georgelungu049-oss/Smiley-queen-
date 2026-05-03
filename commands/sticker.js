const logger = require('../utils/logger');

module.exports = {
  name: 'sticker',
  aliases: ['s'],
  category: 'fun',
  async execute(sock, message, args, db, sender, isGroup, from) {
    const quoted = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    
    if (!quoted) {
      await sock.sendMessage(from, {
        text: '❌ Please reply to an image or video!\n\nExample: Reply to image and type .sticker'
      });
      return;
    }
    
    const media = quoted.imageMessage || quoted.videoMessage;
    if (!media) {
      await sock.sendMessage(from, {
        text: '❌ Reply to an image or video to make a sticker!'
      });
      return;
    }
    
    try {
      await sock.sendMessage(from, {
        sticker: { url: media.url },
        mimetype: 'image/webp'
      });
      
      logger.cmd('sticker', from, sender);
      db.addPoints(sender, 10);
    } catch (error) {
      await sock.sendMessage(from, {
        text: '❌ Failed to create sticker. Try another image!'
      });
    }
  }
};
