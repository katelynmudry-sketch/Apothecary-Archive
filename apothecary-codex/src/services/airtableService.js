import Airtable from 'airtable';
import { AIRTABLE_CONFIG } from '../config/airtable';

// Initialize Airtable
const base = new Airtable({ apiKey: AIRTABLE_CONFIG.apiKey }).base(AIRTABLE_CONFIG.baseId);

/**
 * Fetch all records from a table
 */
export const fetchAllRecords = async (tableName) => {
  try {
    const records = await base(tableName).select().all();
    return records.map(record => ({
      id: record.id,
      ...record.fields
    }));
  } catch (error) {
    console.error(`Error fetching ${tableName}:`, error);
    throw error;
  }
};

/**
 * Search Source Records by emotion
 */
export const searchByEmotion = async (emotionQuery) => {
  try {
    const formula = `SEARCH("${emotionQuery}", {Emotion_Tags})`;
    const records = await base(AIRTABLE_CONFIG.tables.sourceRecords)
      .select({
        filterByFormula: formula,
        fields: [
          'Record_ID',
          'Herb',
          'Source',
          'Original_Quote',
          'Emotion_Tags',
          'Star_Rating',
          'Modern_Application',
          'Preparation_Methods'
        ]
      })
      .all();

    return records.map(record => ({
      id: record.id,
      ...record.fields
    }));
  } catch (error) {
    console.error('Error searching by emotion:', error);
    throw error;
  }
};

/**
 * Get all source records for a specific herb
 */
export const getHerbDetails = async (herbName) => {
  try {
    const formula = `{Herb} = "${herbName}"`;
    const records = await base(AIRTABLE_CONFIG.tables.sourceRecords)
      .select({
        filterByFormula: formula
      })
      .all();

    return records.map(record => ({
      id: record.id,
      ...record.fields
    }));
  } catch (error) {
    console.error('Error fetching herb details:', error);
    throw error;
  }
};

/**
 * Get all herbs for a specific planet (Premium feature)
 */
export const getHerbsByPlanet = async (planetName) => {
  try {
    const formula = `{Planetary_Ruler} = "${planetName}"`;
    const records = await base(AIRTABLE_CONFIG.tables.sourceRecords)
      .select({
        filterByFormula: formula,
        fields: [
          'Herb',
          'Original_Quote',
          'Planetary_Ruler',
          'Elemental_Quality',
          'Show_Planetary_Free'
        ]
      })
      .all();

    return records.map(record => ({
      id: record.id,
      ...record.fields
    }));
  } catch (error) {
    console.error('Error fetching herbs by planet:', error);
    throw error;
  }
};

/**
 * Fetch all emotions for the search interface
 */
export const fetchEmotions = async () => {
  try {
    return await fetchAllRecords(AIRTABLE_CONFIG.tables.emotions);
  } catch (error) {
    console.error('Error fetching emotions:', error);
    throw error;
  }
};

/**
 * Fetch all planets for premium browse feature
 */
export const fetchPlanets = async () => {
  try {
    return await fetchAllRecords(AIRTABLE_CONFIG.tables.planets);
  } catch (error) {
    console.error('Error fetching planets:', error);
    throw error;
  }
};
