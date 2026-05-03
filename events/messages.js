const fs = require('fs');
const config = require('../config/config');
const db = require('../config/database');
const logger = require('../utils/logger');

async function handleMessage(sock, message) {
  try {
    if (!message.message) return;
    
    const from = message.key.remoteJid;
    const isGroup = from.endsWith('@g.us');
    const sender = isGroup ? message.key.participant : from;
    
    if (!sender) return;
    
    // Auto read
    if (config.autoRead) {
      await sock.readMessages([message.key]);
    }
    
    // Auto view status
    if (config.autoStatusView && from === 'status@broadcast') {
      await sock.readMessages([message.key]);
      return;
    }
    
    // Get text
    let text = '';
    if (message.message.conversation) {
      text = message.message.conversation;
    } else if (message.message.extendedTextMessage) {
      text = message.message.extendedTextMessage.text;
    } else {
      return;
    }
    
    // Check banned
    if (db.isBanned(sender)) {
      await sock.sendMessage(from, { 
        text: `${config.emoji.error} You are banned from using this bot!` 
      });
      return;
    }
    
    // Check AFK
    const afkData = db.isAFK(sender);
    if (afkData) {
      const minutes = Math.floor((Date.now() - afkData.time) / 60000);
      await sock.sendMessage(from, { 
        text: `👋 Welcome back!\nYou were AFK for ${minutes} minutes\nReason: ${afkData.reason}`
      });
      db.removeAFK(sender);
    }
    
    // Check prefix
    if (!text.startsWith(config.prefix)) return;
    
    const args = text.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    
    // Load commands
    const commands = new Map();
    const commandFiles = fs.readdirSync('./commands');
    
    for (const file of commandFiles) {
      const command = require(`../commands/${file}`);
      commands.set(command.name, command);
      if (command.aliases) {
        command.aliases.forEach(alias => commands.set(alias, command));
      }
    }
    
    const command = commands.get(commandName);
    if (!command) return;
    
    // Update stats
    const user = db.getUser(sender);
    user.lastSeen = Date.now();
    user.commandsUsed++;
    db.updateUser(sender, user);
    
    // Execute
    await command.execute(sock, message, args, db, sender, isGroup, from);
    
  } catch (error) {
    logger.error(`Message handler: ${error.message}`);
  }
}

module.exports = { handleMessage };
