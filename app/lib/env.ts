// Environment variable validation.
// Call validateEnv() at server startup (see instrumentation.ts).
// Throws a clear error listing every missing variable so the app never
// starts with a broken config.

interface EnvSpec {
  key: string;
  value: string | undefined;
  required: boolean;
}

const ENV_SPECS: EnvSpec[] = [
  // Core Supabase — app is non-functional without these
  { key: 'NEXT_PUBLIC_SUPABASE_URL',  value: process.env.NEXT_PUBLIC_SUPABASE_URL,  required: true },
  { key: 'NEXT_PUBLIC_SUPABASE_ANON_KEY', value: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, required: true },
  // Admin Basic Auth — /admin routes are unprotected without this
  { key: 'ADMIN_PASSWORD',            value: process.env.ADMIN_PASSWORD,            required: true },
  // Admin Supabase operations — add-property form won't work without this
  { key: 'SUPABASE_SERVICE_ROLE_KEY', value: process.env.SUPABASE_SERVICE_ROLE_KEY, required: false },
];

export function validateEnv(): void {
  const missing = ENV_SPECS.filter(s => s.required && (!s.value || s.value.trim() === ''));
  const warned  = ENV_SPECS.filter(s => !s.required && (!s.value || s.value.trim() === ''));

  if (missing.length > 0) {
    throw new Error(
      [
        '',
        '❌  Missing required environment variables:',
        ...missing.map(s => `     • ${s.key}`),
        '',
        '  Create or update .env.local in the project root and restart the server.',
        '  See .env.local for the expected variable names and format.',
        '',
      ].join('\n'),
    );
  }

  if (warned.length > 0) {
    console.warn(
      [
        '\n⚠️  Optional environment variables not set:',
        ...warned.map(s => `   • ${s.key}`),
        '   Some features (e.g. add-property admin form) may not work.\n',
      ].join('\n'),
    );
  }
}
