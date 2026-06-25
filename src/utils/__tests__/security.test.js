import {
  sanitizeString, containsXSS, containsSQLInjection, containsSensitiveData,
  isValidEmail, isValidURL, sanitizeObject, validateInput,
} from '../security';

describe('sanitizeString', () => {
  it('handles non-string input', () => {
    expect(sanitizeString(null)).toBe('');
    expect(sanitizeString(undefined)).toBe('');
    expect(sanitizeString(123)).toBe('');
    expect(sanitizeString({})).toBe('');
  });

  it('escapes HTML, strips control chars, trims', () => {
    expect(sanitizeString('<script>alert("xss")</script>')).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
    expect(sanitizeString('hello\x00world')).toBe('helloworld');
    expect(sanitizeString('  hello  ')).toBe('hello');
    expect(sanitizeString("it's a test")).toBe('it&#x27;s a test');
  });
});

describe('containsXSS', () => {
  it('detects XSS patterns in strings', () => {
    expect(containsXSS('<script>alert(1)</script>')).toBe(true);
    expect(containsXSS('<script>')).toBe(true);
    expect(containsXSS('javascript:alert(1)')).toBe(true);
    expect(containsXSS('onclick="evil()"')).toBe(true);
    expect(containsXSS('<iframe src="evil.com"></iframe>')).toBe(true);
    expect(containsXSS('eval(something)')).toBe(true);
    expect(containsXSS('document.cookie')).toBe(true);
    expect(containsXSS('fetch("https://evil.com")')).toBe(true);
  });

  it('returns false for safe strings and non-strings', () => {
    expect(containsXSS('Hello, this is a normal message.')).toBe(false);
    expect(containsXSS(null)).toBe(false);
    expect(containsXSS(undefined)).toBe(false);
  });
});

describe('containsSQLInjection', () => {
  it('detects SQL injection patterns in strings', () => {
    expect(containsSQLInjection("' OR '1'='1")).toBe(true);
    expect(containsSQLInjection("' OR 1=1 --")).toBe(true);
    expect(containsSQLInjection("' AND 1=1")).toBe(true);
    expect(containsSQLInjection('DROP TABLE users')).toBe(true);
    expect(containsSQLInjection('UNION SELECT * FROM users')).toBe(true);
    expect(containsSQLInjection('SELECT * FROM users')).toBe(true);
    expect(containsSQLInjection('DELETE FROM users')).toBe(true);
    expect(containsSQLInjection("admin'--")).toBe(true);
    expect(containsSQLInjection("admin'/*")).toBe(true);
  });

  it('returns false for safe strings and non-strings', () => {
    expect(containsSQLInjection('Hello world')).toBe(false);
    expect(containsSQLInjection(null)).toBe(false);
    expect(containsSQLInjection(undefined)).toBe(false);
  });
});

describe('containsSensitiveData', () => {
  it('detects sensitive data patterns', () => {
    expect(containsSensitiveData('myPassword=secret123')).toBe(true);
    expect(containsSensitiveData('secret_key=abc')).toBe(true);
    expect(containsSensitiveData('auth_token=xyz')).toBe(true);
    expect(containsSensitiveData('api-key=12345')).toBe(true);
    expect(containsSensitiveData('jwt=eyJhbGciOiJI')).toBe(true);
  });

  it('returns false for safe strings', () => {
    expect(containsSensitiveData('Hello world')).toBe(false);
    expect(containsSensitiveData('What time is it?')).toBe(false);
  });
});

describe('isValidEmail', () => {
  it('validates email addresses', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
    expect(isValidEmail('user.name+tag@example.co.uk')).toBe(true);
    expect(isValidEmail('')).toBe(false);
    expect(isValidEmail('not-an-email')).toBe(false);
    expect(isValidEmail('@example.com')).toBe(false);
    expect(isValidEmail(null)).toBe(false);
    expect(isValidEmail(123)).toBe(false);
  });

  it('rejects overly long emails', () => {
    expect(isValidEmail('a'.repeat(250) + '@b.com')).toBe(false);
  });
});

describe('isValidURL', () => {
  it('validates URLs', () => {
    expect(isValidURL('https://example.com')).toBe(true);
    expect(isValidURL('http://example.com/path?q=1')).toBe(true);
    expect(isValidURL('ftp://example.com')).toBe(false);
    expect(isValidURL('file:///etc/passwd')).toBe(false);
    expect(isValidURL('javascript:alert(1)')).toBe(false);
    expect(isValidURL('not-a-url')).toBe(false);
    expect(isValidURL(null)).toBe(false);
  });
});

describe('sanitizeObject', () => {
  it('sanitizes object values recursively', () => {
    expect(sanitizeObject(null)).toBe(null);
    const input = { name: '<script>alert(1)</script>', email: 'test@test.com' };
    const result = sanitizeObject(input);
    expect(result.name).toBe('&lt;script&gt;alert(1)&lt;/script&gt;');
    expect(result.email).toBe('test@test.com');
  });

  it('handles nested objects and arrays', () => {
    const input = { user: { name: '<b>bold</b>' }, tags: ['<script>', 'normal'] };
    const result = sanitizeObject(input);
    expect(result.user.name).toBe('&lt;b&gt;bold&lt;/b&gt;');
    expect(result.tags[0]).toBe('&lt;script&gt;');
    expect(result.tags[1]).toBe('normal');
  });
});

describe('validateInput', () => {
  it('returns errors for invalid inputs', () => {
    expect(validateInput('', { required: true })).toContain('Value is required');
    expect(validateInput('ab', { minLength: 3 })).toContain('Minimum length is 3');
    expect(validateInput('abcdef', { maxLength: 3 })).toContain('Maximum length is 3');
    expect(validateInput('<script>alert(1)</script>', { noXSS: true })).toContain('Input contains XSS patterns');
    expect(validateInput("' OR '1'='1", { noSQL: true })).toContain('Input contains SQL injection patterns');
    expect(validateInput('password=123', { noSensitive: true })).toContain('Input contains sensitive data patterns');
    expect(validateInput('not-email', { email: true })).toContain('Invalid email format');
    expect(validateInput('not-a-url', { url: true })).toContain('Invalid URL format');
    expect(validateInput('abc', { pattern: /^\d+$/ })).toContain('Input does not match required pattern');
  });

  it('returns no errors for valid input', () => {
    expect(validateInput('hello@example.com', {
      email: true, minLength: 3, maxLength: 100, noXSS: true, noSQL: true,
    })).toHaveLength(0);
  });

  it('accumulates multiple errors', () => {
    const errors = validateInput('<script>', { required: true, minLength: 10, noXSS: true });
    expect(errors.length).toBeGreaterThan(1);
  });
});
