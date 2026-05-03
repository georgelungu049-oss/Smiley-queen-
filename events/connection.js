const logger = require('../utils/logger');
const config = require('../config/config');

async function handleConnection(connection, lastDisconnect, reconnectFn) {
  if (connection === 'close') {
    const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== 401;
    if (shouldReconnect) {
      logger.warning('Connection closed, reconnecting in 5 seconds...');
      setTimeout(reconnectFn, 5000);
    } else {
      logger.error('Connection closed permanently. Please restart bot!');
      process.exit(1);
    }
  } else if (connection === 'open') {
    logger.success(`✅ ${config.botName} Connected Successfully!`);
    logger.info(`🤖 Bot Name: ${config.botName}`);
    logger.info(`👑 Owner: ${config.ownerName}`);
    logger.info(`📱 Phone: ${config.ownerNumber}`);
    logger.info(`🎯 Status: Online and ready!`);
  } else if (connection === 'connecting') {
    logger.info('Connecting to WhatsApp...');
  }
}

module.exports = { handleConnection };
