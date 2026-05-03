const logger = require('../utils/logger');

module.exports = {
  name: 'ping',
  aliases: ['p'],
  category: 'info',
  async execute(sock, message, args, db, sender, isGroup, from) {
    const start = Date.now();
    await sock.sendMessage(from, { text: '🏓 Pinging...' });
    const latency = Date.now() - start;
    
    await sock.sendMessage(from, {
      text: `🏓 *Pong!*\n\n⏱️ Latency: ${latency}ms\n📡 Status: Connected`
    });
    
    logger.cmd('ping', from, sender);
    db.addPoints(sender, 5);
  }
};
