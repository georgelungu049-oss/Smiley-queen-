const logger = require('../utils/logger');
const config = require('../config/config');

module.exports = {
  name: 'repo',
  aliases: ['github', 'source', 'code'],
  category: 'info',
  description: 'Get the bot GitHub repository link',
  usage: 'repo',
  async execute(sock, message, args, db, sender, isGroup, from) {
    const repoText = `╭━━━〔 ${config.botName} Repository 〕━━━⬣
│
├─📦 *GITHUB REPOSITORY*
│  • Repo: Smiley-queen-
│  • Owner: georgelungu049-oss
│  • Branch: main
│
├─🔗 *LINKS*
│  • Clone: https://github.com/georgelungu049-oss/Smiley-queen-.git
│  • Web: https://github.com/georgelungu049-oss/Smiley-queen-
│
├─📊 *STATS*
│  • Stars: ⭐ Star the repo!
│  • Forks: 🔄 Fork to contribute
│  • Issues: 🐛 Report bugs
│
├─💡 *COMMANDS*
│  • ${config.prefix}update - Check for updates
│  • ${config.prefix}repo - Show this menu
│
╰━━━━━━━━━━━━━━━━⬣

_⭐ Star this repo if you like the bot!_`;
    
    await sock.sendMessage(from, { text: repoText });
    logger.cmd('repo', from, sender);
    db.addPoints(sender, 2);
  }
};
