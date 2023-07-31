const { v4: uuidv4 } = require('uuid'); // For generating UUIDs



function generateUniqueCartId() {
    // Using UUIDs to generate unique cart IDs
    return uuidv4();
  }
module.exports = generateUniqueCartId()