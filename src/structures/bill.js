class Bill {
  constructor(name, description, choices, createdAt, endsAt) {
    this.name = name;
    this.description = description;
    this.choices = choices;
    this.createdAt = createdAt;
    this.endsAt = endsAt;
    this.votedIds = [];
    this.votes = new Map();
  }
}

module.exports = Bill;
