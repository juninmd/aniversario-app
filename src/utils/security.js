const SQL_PATTERNS = [
  /\bSELECT\b.*\bFROM\b/i,
  /\bDROP\b.*\bTABLE\b/i,
  /\bINSERT\b.*\bINTO\b/i,
  /\bDELETE\b.*\bFROM\b/i,
  /\bUPDATE\b.*\bSET\b/i,
  /\bUNION\b.*\bSELECT\b/i,
  /'?\b(?:OR|AND)\b\s+['"]?\d+['"]?\s*=\s*['"]?\d+['"]?/i,
  /--/,
  /\/\*/,
];

const XSS_PATTERNS = [
  /<script[\s>]/i,
  /<\/script>/i,
  /javascript\s*:/i,
  /on(?:click|load|unload|change|submit|reset|select|blur|focus|key(?:down|press|up)|mouse(?:enter|leave|over|out|down|up|move)|dblclick|contextmenu)\s*=\s*['"]?[^'"]*['"]?/i,
  /<iframe\b[^>]*>/i,
  /<embed\b[^>]*>/i,
  /<object\b[^>]*>/i,
  /<svg\b[^>]*>/i,
  /alert\s*\(/i,
  /eval\s*\(/i,
  /document\.cookie/i,
  /window\.location/i,
  /fetch\s*\(/i,
  /XMLHttpRequest/i,
];

const SENSITIVE_KEYS = [
  /password/i,
  /secret/i,
  /token/i,
  /api[_-]?key/i,
  /auth/i,
  /credential/i,
  /private/i,
  /jwt/i,
  /bearer/i,
];

export function sanitizeString(input) {
  if (typeof input !== 'string') {
    return '';
  }

  let sanitized = input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/`/g, '&#x60;');

  sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '');

  sanitized = sanitized.trim();

  return sanitized;
}

export function containsXSS(input) {
  if (typeof input !== 'string') {
    return false;
  }
  return XSS_PATTERNS.some((pattern) => pattern.test(input));
}

export function containsSQLInjection(input) {
  if (typeof input !== 'string') {
    return false;
  }
  return SQL_PATTERNS.some((pattern) => pattern.test(input));
}

export function containsSensitiveData(input) {
  if (typeof input !== 'string') {
    return false;
  }
  return SENSITIVE_KEYS.some((pattern) => pattern.test(input));
}

export function isValidEmail(email) {
  if (typeof email !== 'string') {
    return false;
  }
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return email.length <= 254 && emailRegex.test(email.trim());
}

export function isValidURL(url) {
  if (typeof url !== 'string') {
    return false;
  }
  return /^https?:\/\/[^\s/$.?#][^\s]*$/i.test(url);
}

export function sanitizeObject(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  const result = Array.isArray(obj) ? [] : {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      result[key] = sanitizeString(value);
    } else if (typeof value === 'object' && value !== null) {
      result[key] = sanitizeObject(value);
    } else {
      result[key] = value;
    }
  }

  return result;
}

export function validateInput(value, rules = {}) {
  const errors = [];

  if (rules.required && (!value || (typeof value === 'string' && !value.trim()))) {
    errors.push('Value is required');
    return errors;
  }

  if (typeof value !== 'string') {
    if (rules.type && typeof value !== rules.type) {
      errors.push(`Expected type ${rules.type}`);
    }
    return errors;
  }

  if (rules.minLength && value.length < rules.minLength) {
    errors.push(`Minimum length is ${rules.minLength}`);
  }

  if (rules.maxLength && value.length > rules.maxLength) {
    errors.push(`Maximum length is ${rules.maxLength}`);
  }

  if (rules.noXSS && containsXSS(value)) {
    errors.push('Input contains XSS patterns');
  }

  if (rules.noSQL && containsSQLInjection(value)) {
    errors.push('Input contains SQL injection patterns');
  }

  if (rules.noSensitive && containsSensitiveData(value)) {
    errors.push('Input contains sensitive data patterns');
  }

  if (rules.email && !isValidEmail(value)) {
    errors.push('Invalid email format');
  }

  if (rules.url && !isValidURL(value)) {
    errors.push('Invalid URL format');
  }

  if (rules.pattern && !rules.pattern.test(value)) {
    errors.push('Input does not match required pattern');
  }

  return errors;
}
