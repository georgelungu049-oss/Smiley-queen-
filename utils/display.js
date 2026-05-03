const colors = require('colors');

class Display {
  static showBanner() {
    const banner = `
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║    ███████╗███╗   ███╗██╗██╗     ███████╗██╗   ██╗       ║
║    ██╔════╝████╗ ████║██║██║     ██╔════╝╚██╗ ██╔╝       ║
║    █████╗  ██╔████╔██║██║██║     █████╗   ╚████╔╝        ║
║    ██╔══╝  ██║╚██╔╝██║██║██║     ██╔══╝    ╚██╔╝         ║
║    ███████╗██║ ╚═╝ ██║██║███████╗███████╗   ██║          ║
║    ╚══════╝╚═╝     ╚═╝╚═╝╚══════╝╚══════╝   ╚═╝          ║
║                                                           ║
║               ███╗   ███╗██████╗                          ║
║               ████╗ ████║██╔══██╗                         ║
║               ██╔████╔██║██║  ██║                         ║
║               ██║╚██╔╝██║██║  ██║                         ║
║               ██║ ╚═╝ ██║██████╔╝                         ║
║               ╚═╝     ╚═╝╚═════╝                          ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
    `.magenta.bold;
    
    console.log(banner);
  }
  
  static showGlowText(text, color = 'magenta') {
    const colors = {
      magenta: '\x1b[35m',
      pink: '\x1b[38;5;205m',
      cyan: '\x1b[36m',
      green: '\x1b[32m',
      yellow: '\x1b[33m',
      red: '\x1b[31m',
      reset: '\x1b[0m'
    };
    
    console.log(`${colors[color]}✨ ${text} ✨${colors.reset}`);
  }
  
  static showStatus(status, message) {
    const symbols = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️',
      loading: '🔄',
      online: '🟢',
      offline: '🔴'
    };
    
    const colors = {
      success: '\x1b[32m',
      error: '\x1b[31m',
      warning: '\x1b[33m',
      info: '\x1b[36m',
      loading: '\x1b[35m',
      online: '\x1b[32m',
      offline: '\x1b[31m'
    };
    
    console.log(`${colors[status]}${symbols[status]} ${message}${colors.reset}`);
  }
  
  static showAnimatedBanner() {
    const frames = ['◐', '◓', '◑', '◒'];
    let i = 0;
    return setInterval(() => {
      process.stdout.write(`\r${' '.repeat(50)}\r${frames[i]} Loading Queen Smiley MD... ${frames[i]}`);
      i = (i + 1) % frames.length;
    }, 200);
  }
  
  static showQueenCrown() {
    const crown = `
    ╔══════════════════════════════════════╗
    ║    👑  Q U E E N   S M I L E Y  👑   ║
    ║    💖  P R E M I U M   B O T   💖    ║
    ╚══════════════════════════════════════╝
    `.magenta.bold;
    console.log(crown);
  }
  
  static showFeatures() {
    const features = `
    ┌─────────────────────────────────────────┐
    │ ✨ FEATURES                             │
    ├─────────────────────────────────────────┤
    │ 🤖 Multi-Device Support                 │
    │ 👑 Owner: Paxton                        │
    │ 📱 WhatsApp: +27 68 781 3781           │
    │ 💝 24/7 Online                          │
    │ 🎮 Games & Entertainment                │
    │ 🔧 Advanced Group Management            │
    │ 📊 Points & Level System                │
    │ 🎨 Sticker Maker                        │
    │ 🔒 AFK System                           │
    │ 🛡️ Anti-Spam Protection                 │
    └─────────────────────────────────────────┘
    `.cyan;
    console.log(features);
  }
  
  static async animateStart() {
    const dots = ['', '.', '..', '...'];
    for (let i = 0; i < 4; i++) {
      process.stdout.write(`\r🚀 Starting Queen Smiley MD${dots[i]} `);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    console.log('\r✅ Queen Smiley MD Started!    ');
  }
  
  static showSuccess(message) {
    console.log(`\x1b[38;5;205m╭─────────────────────────────────────────╮\x1b[0m`);
    console.log(`\x1b[38;5;205m│  ✅ ${message.padEnd(39)}│\x1b[0m`);
    console.log(`\x1b[38;5;205m╰─────────────────────────────────────────╯\x1b[0m`);
  }
}

module.exports = Display;
