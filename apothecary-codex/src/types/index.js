/**
 * Type definitions for Apothecary Codex data structures
 */

/**
 * @typedef {Object} Source
 * @property {string} id - Unique identifier
 * @property {string} Author - Author name (e.g., "Nicholas Culpeper")
 * @property {number} Year - Publication year (e.g., 1653)
 * @property {string} Title - Book title
 */

/**
 * @typedef {Object} Herb
 * @property {string} id - Unique identifier
 * @property {string} Common_Name - Common herb name (e.g., "Borage")
 * @property {string} Latin_Name - Scientific name (e.g., "Borago officinalis")
 * @property {string} [Latin_Name_Status] - Status of Latin name identification
 */

/**
 * @typedef {Object} SourceRecord
 * @property {string} id - Unique identifier
 * @property {string} Record_ID - Format: CULP-005, GER-001, etc.
 * @property {string|Object} Herb - Herb name or linked herb object
 * @property {string|Object} Source - Source reference or linked source object
 * @property {string} Original_Quote - Historical quote from source
 * @property {string} Emotion_Tags - Comma-separated emotion tags
 * @property {string} Modern_Application - Modern interpretation
 * @property {string} Preparation_Methods - How to prepare/use
 * @property {string} Star_Rating - Star rating (⭐, ⭐⭐, ⭐⭐⭐)
 * @property {string} [Section_Reference] - Section in original text
 * @property {string} [Planetary_Ruler] - Ruling planet (Jupiter, Venus, etc.)
 * @property {string} [Elemental_Quality] - Hot/cold, moist/dry
 * @property {boolean} [Show_Planetary_Free] - Show planetary info to free users
 * @property {string} [Extraction_Date] - Date data was extracted
 */

/**
 * @typedef {Object} Emotion
 * @property {string} id - Unique identifier
 * @property {number} Emotion_ID - Numeric ID
 * @property {string} Emotion_Name - Display name (e.g., "Depression/Melancholy")
 * @property {string} Historical_Terms - Historical terminology
 * @property {string} Modern_Description - Modern interpretation
 * @property {string} Tier - "Free" or "Premium"
 */

/**
 * @typedef {Object} Planet
 * @property {string} id - Unique identifier
 * @property {number} Planet_ID - Numeric ID
 * @property {string} Planet_Name - Planet name (Jupiter, Venus, etc.)
 * @property {string} Symbol - Unicode symbol (♃, ♀, etc.)
 * @property {string} Element - Elemental associations
 * @property {string} Temperature - Warm/Hot/Cool/Cold
 * @property {string} Moisture - Moist/Dry
 * @property {string} Qualities - Characteristic qualities
 * @property {string} Emotional_Patterns - Associated emotional patterns
 * @property {boolean} Premium - Premium content flag
 */

/**
 * @typedef {Object} HerbSearchResult
 * @property {string} herbName - Common name
 * @property {number} sourceCount - Number of historical sources
 * @property {string} starRating - Highest star rating
 * @property {string} preview - Preview of first quote
 * @property {Array<SourceRecord>} records - All source records for this herb
 */

export default {};
