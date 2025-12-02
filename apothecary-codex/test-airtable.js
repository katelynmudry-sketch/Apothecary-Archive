// Test script to verify Airtable connection
const Airtable = require('airtable');

const apiKey = 'patJyxE1gIHMryXKd';
const baseId = 'Btx8e0n5L';

console.log('🔍 Testing Airtable connection...\n');
console.log(`API Key: ${apiKey.substring(0, 10)}...`);
console.log(`Base ID: ${baseId}\n`);

const base = new Airtable({ apiKey }).base(baseId);

async function testConnection() {
  try {
    // Test 1: List all tables by trying to fetch from expected tables
    console.log('📊 Testing table access...\n');

    const tables = ['Sources', 'Herbs', 'Source Records', 'Emotions', 'Planets'];

    for (const tableName of tables) {
      try {
        console.log(`Testing: ${tableName}`);
        const records = await base(tableName).select({ maxRecords: 1 }).firstPage();
        console.log(`✅ ${tableName}: Accessible (found ${records.length > 0 ? '1+' : '0'} records)\n`);
      } catch (error) {
        console.log(`❌ ${tableName}: Error - ${error.message}\n`);
      }
    }

    // Test 2: Try to fetch a few Source Records to see structure
    console.log('📚 Fetching sample Source Records...\n');
    const sourceRecords = await base('Source Records').select({ maxRecords: 3 }).firstPage();

    if (sourceRecords.length > 0) {
      console.log(`Found ${sourceRecords.length} sample records:\n`);
      sourceRecords.forEach((record, index) => {
        console.log(`Record ${index + 1}:`);
        console.log(`  ID: ${record.id}`);
        console.log(`  Fields:`, Object.keys(record.fields).join(', '));
        console.log('');
      });

      // Show first record in detail
      console.log('First record details:');
      console.log(JSON.stringify(sourceRecords[0].fields, null, 2));
    } else {
      console.log('⚠️  No records found in Source Records table');
    }

    console.log('\n✅ Airtable connection test complete!');

  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
    console.error('\nFull error:', error);
  }
}

testConnection();
