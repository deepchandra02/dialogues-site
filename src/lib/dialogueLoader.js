const BASE_URL = import.meta.env.BASE_URL;

/**
 * Fetch a single dialogue by ID from /data/{id}.json
 */
export async function getDialogueById(id) {
  try {
    const response = await fetch(`${BASE_URL}data/${id}.json`);
    if (!response.ok) {
      throw new Error(`Failed to fetch dialogue: ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error loading dialogue ${id}:`, error);
    return null;
  }
}

/**
 * Fetch all dialogues metadata from index
 */
export async function getAllDialoguesMeta() {
  try {
    const response = await fetch(`${BASE_URL}data/index.json`);
    if (!response.ok) {
      throw new Error('Failed to fetch dialogues index');
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading dialogues index:', error);
    return [];
  }
}

/**
 * Get recent dialogues (sorted by date, descending)
 */
export async function getRecentDialogues(count = 3) {
  const meta = await getAllDialoguesMeta();
  const sorted = [...meta].sort((a, b) => new Date(b.date) - new Date(a.date));
  return sorted.slice(0, count);
}

/**
 * Get all dialogues with full content
 */
export async function getAllDialogues() {
  const meta = await getAllDialoguesMeta();
  const dialogues = await Promise.all(
    meta.map(({ id }) => getDialogueById(id))
  );
  return dialogues.filter(d => d !== null);
}
