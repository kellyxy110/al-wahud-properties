// Next.js instrumentation hook — runs once when the server starts.
// Validates required environment variables before any request is handled.
// If validation fails the process exits with a clear error message.
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { validateEnv } = await import('./app/lib/env');
    validateEnv();
  }
}
