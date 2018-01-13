class Bill {
  constructor(name, description, choices, endsAt) {
    this.name = name;
    this.description = description;
    this.choices = choices;
    this.createdAt = Date.now();
    this.endsAt = endsAt;
    this.votedIds = [];
    this.votes = new Map();
  }
}

module.exports = Bill;
