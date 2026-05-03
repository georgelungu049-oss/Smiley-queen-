const fs = require('fs');
const config = require('../config/config');
const logger = require('../utils/logger');

module.exports = {
  name: 'help',
  aliases: ['cmd', 'command'],
  category: 'info',
  description: 'ℹ️ Get detailed help for a specific command',
  usage: 'help <command>',
  async execute(sock, message, args, db, sender, isGroup, from) {
    if (!args[0]) {
      await sock.sendMessage(from, { 
        text: `${config.emoji.error} *Usage:* ${config.prefix}help <command>\n\nExample: ${config.prefix}help ping` 
      });
      return;
    }
    
    const commandName = args[0].toLowerCase();
    const commandsDir = './commands';
    const commandFiles = fs.readdirSync(commandsDir);
    
    let found = false;
    
    for (const file of commandFiles) {
      const cmd = require(`../${commandsDir}/${file}`);
      
      if (cmd.name === commandName || (cmd.aliases && cmd.aliases.includes(commandName))) {
        const helpText = `╭━━━━━━━━━━━━━━━━━━━━━━━━╮
│    📖 COMMAND HELP      
├────────────────────────┤
│  📝 *${config.prefix}${cmd.name}*
│
│  📋 *Description*
│  ${cmd.description || 'No description available'}
│
│  🔧 *Usage*
│  ${config.prefix}${cmd.usage || cmd.name}
│
│  🔄 *Aliases*
│  ${cmd.aliases ? cmd.aliases.map(a => config.prefix + a).join(', ') : 'None'}
│
│  📁 *Category*
│  ${cmd.category || 'General'}
│
╰────────────────────────╯`;
        
        await sock.sendMessage(from, { text: helpText });
        found = true;
        break;
      }
    }
    
    if (!found) {
      await sock.sendMessage(from, { 
        text: `${config.emoji.error} Command *${commandName}* not found!\n\nType ${config.prefix}menu to see all commands.` 
      });
    }
    
    logger.cmd('help', from, sender);
    db.addPoints(sender, 1);
  }
};
