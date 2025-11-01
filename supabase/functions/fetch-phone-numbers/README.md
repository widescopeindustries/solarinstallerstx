This Supabase Edge Function fetches phone numbers for installers using the Google Places API.

Important notes:
- Requires environment variables: GOOGLE_PLACES_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
- The function expects the caller to pass an Authorization header with a valid JWT token.
- The function checks the `has_role` RPC to ensure the user is an admin.

Suggested improvements:
- Use a dedicated service role only for server-to-server operations and avoid exposing it in client-side code.
- Validate the RPC response structure and handle missing fields.
- Add rate limiting and retries for Google Places API calls.
- Add logging for request IDs to trace operations.
