function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatTime(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days}d ${hours % 24}h`;
  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
  return `${seconds}s`;
}

function generateMenu(botName, prefix, points, level, cmdCount) {
  return `╭━━━〔 ${botName} 〕━━━⬣
│
├─🤖 *BOT INFO*
│  • Name: ${botName}
│  • Owner: Paxton
│  • Prefix: ${prefix}
│  • Commands: ${cmdCount}
│
├─📊 *YOUR STATS*
│  • Points: ${formatNumber(points)}
│  • Level: ${level}
│
├─📋 *COMMANDS*
│  • ${prefix}ping - Check bot
│  • ${prefix}menu - Show menu
│  • ${prefix}owner - Contact owner
│  • ${prefix}stats - Your stats
│  • ${prefix}sticker - Make sticker
│
╰━━━━━━━━━━━━━━━━⬣

_© ${botName} 2024_`;
}

module.exports = { formatNumber, formatTime, generateMenu };
