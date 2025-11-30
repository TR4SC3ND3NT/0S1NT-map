const ALLOWED_ENTITY_TYPES = [
  'person',
  'domain',
  'phone',
  'email',
  'organization',
  'ip',
  'address',
  'other'
];

export function createError(statusCode, message) {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
}

export function isEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateRegistrationInput({ email, password, name }) {
  if (!email || !isEmail(email)) {
    throw createError(400, 'Invalid email');
  }
  if (!password || password.length < 8) {
    throw createError(400, 'Password must be at least 8 characters long');
  }
  if (name && typeof name !== 'string') {
    throw createError(400, 'Invalid name');
  }
}

export function validateLoginInput({ email, password }) {
  if (!email || !isEmail(email)) {
    throw createError(400, 'Invalid email');
  }
  if (!password) {
    throw createError(400, 'Password is required');
  }
}

export function validateEntityInput({ type, name, description, data }) {
  if (!type || !ALLOWED_ENTITY_TYPES.includes(type)) {
    throw createError(400, 'Invalid entity type');
  }
  if (!name || typeof name !== 'string') {
    throw createError(400, 'Name is required');
  }
  if (description && typeof description !== 'string') {
    throw createError(400, 'Invalid description');
  }
  if (data && typeof data !== 'object') {
    throw createError(400, 'Invalid data');
  }
}

export function validateLinkInput({ type, sourceId, targetId, description }) {
  if (!type || typeof type !== 'string') {
    throw createError(400, 'Invalid link type');
  }
  if (!sourceId || !targetId) {
    throw createError(400, 'Source and target are required');
  }
  if (sourceId === targetId) {
    throw createError(400, 'Source and target cannot be the same');
  }
  if (description && typeof description !== 'string') {
    throw createError(400, 'Invalid description');
  }
}

export function validateNoteInput({ content, entityId }) {
  if (!content || typeof content !== 'string') {
    throw createError(400, 'Content is required');
  }
  if (!entityId || typeof entityId !== 'string') {
    throw createError(400, 'Invalid entity id');
  }
}
