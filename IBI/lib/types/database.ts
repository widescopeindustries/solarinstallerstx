export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      companies: {
        Row: {
          id: number
          created_at: string
          name: string
          logo_url: string | null
          description: string | null
          category: string | null
          slug: string
        }
        Insert: {
          id?: never
          created_at?: string
          name: string
          logo_url?: string | null
          description?: string | null
          category?: string | null
          slug: string
        }
        Update: {
          id?: never
          created_at?: string
          name?: string
          logo_url?: string | null
          description?: string | null
          category?: string | null
          slug?: string
        }
      }
      profiles: {
        Row: {
          id: string
          created_at: string
          first_name: string | null
          last_name: string | null
          profile_picture_url: string | null
          bio: string | null
          city: string | null
          state: string | null
          zip_code: string | null
          personal_website_url: string | null
          is_pro_subscriber: boolean
          stripe_customer_id: string | null
        }
        Insert: {
          id: string
          created_at?: string
          first_name?: string | null
          last_name?: string | null
          profile_picture_url?: string | null
          bio?: string | null
          city?: string | null
          state?: string | null
          zip_code?: string | null
          personal_website_url?: string | null
          is_pro_subscriber?: boolean
          stripe_customer_id?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          first_name?: string | null
          last_name?: string | null
          profile_picture_url?: string | null
          bio?: string | null
          city?: string | null
          state?: string | null
          zip_code?: string | null
          personal_website_url?: string | null
          is_pro_subscriber?: boolean
          stripe_customer_id?: string | null
        }
      }
      rep_companies: {
        Row: {
          id: number
          rep_id: string
          company_id: number
        }
        Insert: {
          id?: never
          rep_id: string
          company_id: number
        }
        Update: {
          id?: never
          rep_id?: string
          company_id?: number
        }
      }
      reviews: {
        Row: {
          id: number
          created_at: string
          rep_id: string
          reviewer_name: string
          rating: number
          comment: string | null
          is_approved: boolean
        }
        Insert: {
          id?: never
          created_at?: string
          rep_id: string
          reviewer_name: string
          rating: number
          comment?: string | null
          is_approved?: boolean
        }
        Update: {
          id?: never
          created_at?: string
          rep_id?: string
          reviewer_name?: string
          rating?: number
          comment?: string | null
          is_approved?: boolean
        }
      }
    }
  }
}

// Helper types
export type Company = Database['public']['Tables']['companies']['Row']
export type Profile = Database['public']['Tables']['profiles']['Row']
export type RepCompany = Database['public']['Tables']['rep_companies']['Row']
export type Review = Database['public']['Tables']['reviews']['Row']

// Extended types with relations
export type ProfileWithCompanies = Profile & {
  companies: Company[]
  reviews: Review[]
  average_rating?: number
}
