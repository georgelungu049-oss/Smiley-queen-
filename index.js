const {
  default: makeWASocket,
  useMultiFileAuthState,
  Browsers,
  DisconnectReason
} = require('silva-baileys');
const fs = require('fs');
const config = require('./config/config');
const logger = require('./utils/logger');
const db = require('./config/database');
const { handleMessage } = require('./events/messages');

async function startBot() {
  try {
    // Create directories
    if (!fs.existsSync(config.sessionPath)) {
      fs.mkdirSync(config.sessionPath, { recursive: true });
    }
    
    if (!fs.existsSync('./database')) {
      fs.mkdirSync('./database', { recursive: true });
    }
    
    // Load auth
    logger.info('Loading authentication...');
    const { state, saveCreds } = await useMultiFileAuthState(config.sessionPath);
    
    // Create socket
    const sock = makeWASocket({
      auth: state,
      browser: Browsers.ubuntu(config.botName),
      printQRInTerminal: true
    });
    
    // Save creds
    sock.ev.on('creds.update', saveCreds);
    
    // Handle connection
    sock.ev.on('connection.update', async ({ connection, lastDisconnect, qr }) => {
      if (qr) {
        console.log('\n📱 SCAN THIS QR CODE WITH WHATSAPP\n');
        const qrcode = require('qrcode-terminal');
        qrcode.generate(qr, { small: true });
      }
      
      if (connection === 'open') {
        logger.success(`${config.botName} Connected!`);
        logger.info(`👑 Owner: ${config.ownerName}`);
        logger.info(`📱 Prefix: ${config.prefix}`);
        console.log(`\n✨ Send ${config.prefix}menu to start ✨\n`);
      }
      
      if (connection === 'close') {
        const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
        if (shouldReconnect) {
          logger.warning('Reconnecting in 5 seconds...');
          setTimeout(startBot, 5000);
        } else {
          logger.error('Logged out. Please restart!');
          process.exit(1);
        }
      }
    });
    
    // Handle messages
    sock.ev.on('messages.upsert', async ({ messages, type }) => {
      if (type === 'notify') {
        for (const message of messages) {
          await handleMessage(sock, message);
        }
      }
    });
    
    logger.success(`${config.botName} is starting...`);
    
  } catch (error) {
    logger.error(`Start error: ${error.message}`);
    setTimeout(startBot, 5000);
  }
}

// Start
logger.info(`Starting ${config.botName}...`);
startBot();

// Handle errors
process.on('uncaughtException', (err) => {
  logger.error(`Uncaught: ${err.message}`);
});

process.on('unhandledRejection', (reason) => {
  logger.error(`Unhandled: ${reason}`);
});
