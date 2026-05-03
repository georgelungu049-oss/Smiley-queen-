const fs = require('fs-extra');

class Database {
  constructor() {
    this.dbPath = './database/db.json';
    this.data = this.load();
  }
  
  load() {
    if (fs.existsSync(this.dbPath)) {
      return fs.readJsonSync(this.dbPath);
    }
    return {
      users: {},
      groups: {},
      banned: [],
      afk: {}
    };
  }
  
  save() {
    fs.writeJsonSync(this.dbPath, this.data, { spaces: 2 });
  }
  
  getUser(userId) {
    if (!this.data.users[userId]) {
      this.data.users[userId] = {
        points: 0,
        level: 1,
        exp: 0,
        lastSeen: Date.now(),
        registeredAt: Date.now(),
        commandsUsed: 0
      };
      this.save();
    }
    return this.data.users[userId];
  }
  
  updateUser(userId, data) {
    const user = this.getUser(userId);
    Object.assign(user, data);
    this.save();
  }
  
  addPoints(userId, points) {
    const user = this.getUser(userId);
    user.points += points;
    user.exp += points;
    
    const newLevel = Math.floor(user.exp / 100) + 1;
    if (newLevel > user.level) {
      user.level = newLevel;
      this.save();
      return { leveledUp: true, newLevel: newLevel };
    }
    this.save();
    return { leveledUp: false, newLevel: user.level };
  }
  
  getGroup(groupId) {
    if (!this.data.groups[groupId]) {
      this.data.groups[groupId] = {
        welcome: true,
        antiLink: false,
        muted: false
      };
      this.save();
    }
    return this.data.groups[groupId];
  }
  
  updateGroup(groupId, data) {
    const group = this.getGroup(groupId);
    Object.assign(group, data);
    this.save();
  }
  
  isBanned(userId) {
    return this.data.banned.includes(userId);
  }
  
  addBanned(userId) {
    if (!this.data.banned.includes(userId)) {
      this.data.banned.push(userId);
      this.save();
      return true;
    }
    return false;
  }
  
  removeBanned(userId) {
    const index = this.data.banned.indexOf(userId);
    if (index !== -1) {
      this.data.banned.splice(index, 1);
      this.save();
      return true;
    }
    return false;
  }
  
  setAFK(userId, reason = 'No reason') {
    this.data.afk[userId] = {
      reason: reason,
      time: Date.now()
    };
    this.save();
  }
  
  removeAFK(userId) {
    if (this.data.afk[userId]) {
      delete this.data.afk[userId];
      this.save();
      return true;
    }
    return false;
  }
  
  isAFK(userId) {
    return this.data.afk[userId] || null;
  }
}

module.exports = new Database();
