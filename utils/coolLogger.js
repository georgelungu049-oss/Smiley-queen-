const colors = require('colors');

class CoolLogger {
  static getTimestamp() {
    return new Date().toLocaleTimeString('en-US', { hour12: false });
  }
  
  static success(msg) {
    console.log(`\x1b[38;5;205m[${this.getTimestamp()}] ✨ ${msg} ✨\x1b[0m`.green.bold);
  }
  
  static error(msg) {
    console.log(`\x1b[38;5;196m[${this.getTimestamp()}] 💔 ${msg} 💔\x1b[0m`.red.bold);
  }
  
  static info(msg) {
    console.log(`\x1b[38;5;39m[${this.getTimestamp()}] 💎 ${msg} 💎\x1b[0m`.cyan);
  }
  
  static warning(msg) {
    console.log(`\x1b[38;5;226m[${this.getTimestamp()}] ⚠️ ${msg} ⚠️\x1b[0m`.yellow);
  }
  
  static cmd(cmd, from, sender) {
    console.log(`\x1b[38;5;205m═══════════════════════════════════════════════════════\x1b[0m`);
    console.log(`\x1b[38;5;39m[${this.getTimestamp()}] 💝 COMMAND EXECUTED 💝\x1b[0m`);
    console.log(`\x1b[38;5;205m├ 📝 Command: ${cmd}\x1b[0m`);
    console.log(`\x1b[38;5;205m├ 📍 From: ${from}\x1b[0m`);
    console.log(`\x1b[38;5;205m└ 👤 Sender: ${sender}\x1b[0m`);
    console.log(`\x1b[38;5;205m═══════════════════════════════════════════════════════\x1b[0m`);
  }
  
  static connection(status) {
    const styles = {
      connecting: '🟡',
      connected: '🟢',
      disconnected: '🔴',
      reconnecting: '🔄'
    };
    
    console.log(`\x1b[38;5;205m╔════════════════════════════════════════╗\x1b[0m`);
    console.log(`\x1b[38;5;205m║  ${styles[status]} CONNECTION STATUS: ${status.toUpperCase()}  \x1b[0m`);
    console.log(`\x1b[38;5;205m╚════════════════════════════════════════╝\x1b[0m`);
  }
  
  static botReady(botName, owner, number) {
    const border = '═'.repeat(50);
    console.log(`\x1b[38;5;205m╔${border}╗\x1b[0m`);
    console.log(`\x1b[38;5;205m║\x1b[0m \x1b[38;5;39m🌟 BOT IS READY TO SERVE! 🌟\x1b[0m \x1b[38;5;205m║\x1b[0m`);
    console.log(`\x1b[38;5;205m║\x1b[0m \x1b[38;5;205m✨ Name: ${botName}\x1b[0m \x1b[38;5;205m${' '.repeat(35 - botName.length)}║\x1b[0m`);
    console.log(`\x1b[38;5;205m║\x1b[0m \x1b[38;5;205m👑 Owner: ${owner}\x1b[0m \x1b[38;5;205m${' '.repeat(35 - owner.length)}║\x1b[0m`);
    console.log(`\x1b[38;5;205m║\x1b[0m \x1b[38;5;205m📱 Number: ${number}\x1b[0m \x1b[38;5;205m${' '.repeat(33 - number.length)}║\x1b[0m`);
    console.log(`\x1b[38;5;205m║\x1b[0m \x1b[38;5;39m💖 Status: ONLINE & ACTIVE 💖\x1b[0m \x1b[38;5;205m║\x1b[0m`);
    console.log(`\x1b[38;5;205m╚${border}╝\x1b[0m`);
  }
  
  static messageReceived(from, text) {
    console.log(`\x1b[38;5;39m┌─────────────────────────────────────────┐\x1b[0m`);
    console.log(`\x1b[38;5;39m│ 💬 NEW MESSAGE RECEIVED                  │\x1b[0m`);
    console.log(`\x1b[38;5;205m├ 📍 From: ${from}\x1b[0m`);
    console.log(`\x1b[38;5;205m├ 📝 Text: ${text.substring(0, 30)}${text.length > 30 ? '...' : ''}\x1b[0m`);
    console.log(`\x1b[38;5;39m└─────────────────────────────────────────┘\x1b[0m`);
  }
}

module.exports = CoolLogger;
