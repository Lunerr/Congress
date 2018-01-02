class Bill {
  constructor(name, description, choices, createdAt, endsAt) {
    this.name = name; // name
    this.description = description; // description
    this.choices = choices; // array of choices
    this.createdAt = createdAt; // when it was created in unix time
    this.endsAt = endsAt; // unix ending time
    this.votedIds = []; // array of id's of who voted
    this.votes = new Map(); // key: sha256 hash of the password, value: index of the choice
  }
}
  
module.exports = Bill;
