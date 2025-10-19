export interface SupabaseError {
  message: string;
  status?: number;
  details?: string;
  hint?: string;
  code?: string;
}

export interface AuthError extends SupabaseError {
  status: number;
  name: string;
}

export interface ApiError extends SupabaseError {
  statusCode: number;
  error: string;
}