// Test script to check database connection and delete functionality
import getDb from './lib/db/index.js';

async function testDatabase() {
  try {
    const db = await getDb();

    // Check if messages table exists and count messages
    db.prepare('SELECT COUNT(*) as count FROM messages').get();

    // Try to select a message to see its structure
    db.prepare('SELECT * FROM messages LIMIT 1').all();
    

  } catch (error) {
    return error
  }
}

testDatabase();
