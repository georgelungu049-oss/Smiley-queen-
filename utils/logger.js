const colors = require('colors');

class Logger {
  static getTime() {
    return new Date().toLocaleTimeString('en-US', { hour12: false });
  }
  
  static info(msg) {
    console.log(`[${this.getTime()}] ℹ️ ${msg}`.green);
  }
  
  static success(msg) {
    console.log(`[${this.getTime()}] ✅ ${msg}`.green);
  }
  
  static error(msg) {
    console.log(`[${this.getTime()}] ❌ ${msg}`.red);
  }
  
  static warning(msg) {
    console.log(`[${this.getTime()}] ⚠️ ${msg}`.yellow);
  }
  
  static cmd(cmd, from, sender) {
    console.log(`[${this.getTime()}] 📩 Command: ${cmd} | From: ${from} | Sender: ${sender}`.cyan);
  }
}

module.exports = Logger;
