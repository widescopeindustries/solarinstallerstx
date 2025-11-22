export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      bankruptcy_reports: {
        Row: {
          action_taken: string | null
          admin_notes: string | null
          city: string
          company_name: string
          created_at: string
          date_of_contract: string | null
          deposit_amount: string | null
          description: string
          email: string
          id: string
          installer_id: string | null
          ip_address: unknown
          issue_type: string
          name: string
          phone: string | null
          reviewed_at: string | null
          source: string | null
          status: string
          updated_at: string
          user_agent: string | null
        }
        Insert: {
          action_taken?: string | null
          admin_notes?: string | null
          city: string
          company_name: string
          created_at?: string
          date_of_contract?: string | null
          deposit_amount?: string | null
          description: string
          email: string
          id?: string
          installer_id?: string | null
          ip_address?: unknown
          issue_type: string
          name: string
          phone?: string | null
          reviewed_at?: string | null
          source?: string | null
          status?: string
          updated_at?: string
          user_agent?: string | null
        }
        Update: {
          action_taken?: string | null
          admin_notes?: string | null
          city?: string
          company_name?: string
          created_at?: string
          date_of_contract?: string | null
          deposit_amount?: string | null
          description?: string
          email?: string
          id?: string
          installer_id?: string | null
          ip_address?: unknown
          issue_type?: string
          name?: string
          phone?: string | null
          reviewed_at?: string | null
          source?: string | null
          status?: string
          updated_at?: string
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bankruptcy_reports_installer_id_fkey"
            columns: ["installer_id"]
            isOneToOne: false
            referencedRelation: "installers"
            referencedColumns: ["id"]
          },
        ]
      }
      installers: {
        Row: {
          bankruptcy_history: Json | null
          bbb_rating: string | null
          bonding_status: string | null
          certification_expires: string | null
          certification_number: string
          certification_type: string
          company_name: string | null
          company_website: string | null
          complaint_history: Json | null
          country: string
          created_at: string
          customer_ratings: Json | null
          id: string
          installations_completed: number | null
          insurance_coverage: Json | null
          is_premium: boolean
          is_verified: boolean
          is_veteran: boolean
          latitude: number | null
          location_city: string
          location_state: string
          location_zip: string | null
          longitude: number | null
          master_electrician: boolean | null
          nabcep_certified: boolean | null
          name: string
          phone: string | null
          phone_verified: boolean | null
          rating: number | null
          red_flags: string[] | null
          review_count: number
          services: string[] | null
          state_licensed: boolean | null
          tier: string | null
          total_safety_score: number | null
          updated_at: string
          user_id: string | null
          verification_date: string | null
          verification_notes: string | null
          verification_status: string | null
          warranty_details: Json | null
          years_in_business: number | null
        }
        Insert: {
          bankruptcy_history?: Json | null
          bbb_rating?: string | null
          bonding_status?: string | null
          certification_expires?: string | null
          certification_number: string
          certification_type: string
          company_name?: string | null
          company_website?: string | null
          complaint_history?: Json | null
          country?: string
          created_at?: string
          customer_ratings?: Json | null
          id?: string
          installations_completed?: number | null
          insurance_coverage?: Json | null
          is_premium?: boolean
          is_verified?: boolean
          is_veteran?: boolean
          latitude?: number | null
          location_city: string
          location_state: string
          location_zip?: string | null
          longitude?: number | null
          master_electrician?: boolean | null
          nabcep_certified?: boolean | null
          name: string
          phone?: string | null
          phone_verified?: boolean | null
          rating?: number | null
          red_flags?: string[] | null
          review_count?: number
          services?: string[] | null
          state_licensed?: boolean | null
          tier?: string | null
          total_safety_score?: number | null
          updated_at?: string
          user_id?: string | null
          verification_date?: string | null
          verification_notes?: string | null
          verification_status?: string | null
          warranty_details?: Json | null
          years_in_business?: number | null
        }
        Update: {
          bankruptcy_history?: Json | null
          bbb_rating?: string | null
          bonding_status?: string | null
          certification_expires?: string | null
          certification_number?: string
          certification_type?: string
          company_name?: string | null
          company_website?: string | null
          complaint_history?: Json | null
          country?: string
          created_at?: string
          customer_ratings?: Json | null
          id?: string
          installations_completed?: number | null
          insurance_coverage?: Json | null
          is_premium?: boolean
          is_verified?: boolean
          is_veteran?: boolean
          latitude?: number | null
          location_city?: string
          location_state?: string
          location_zip?: string | null
          longitude?: number | null
          master_electrician?: boolean | null
          nabcep_certified?: boolean | null
          name?: string
          phone?: string | null
          phone_verified?: boolean | null
          rating?: number | null
          red_flags?: string[] | null
          review_count?: number
          services?: string[] | null
          state_licensed?: boolean | null
          tier?: string | null
          total_safety_score?: number | null
          updated_at?: string
          user_id?: string | null
          verification_date?: string | null
          verification_notes?: string | null
          verification_status?: string | null
          warranty_details?: Json | null
          years_in_business?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      quote_requests: {
        Row: {
          additional_info: string | null
          address: string | null
          battery_storage: boolean | null
          budget: string | null
          contacted_at: string | null
          created_at: string
          email: string
          estimated_annual_savings: number | null
          estimated_monthly_savings: number | null
          estimated_payback_period: number | null
          estimated_system_cost: number | null
          financing: string | null
          first_name: string
          home_size: string | null
          id: string
          ip_address: unknown
          last_name: string
          monitoring: boolean | null
          monthly_bill: number
          phone: string
          roof_age: string | null
          roof_type: string | null
          shading: string | null
          source: string | null
          status: string
          timeline: string | null
          updated_at: string
          user_agent: string | null
          user_id: string | null
          zip_code: string
        }
        Insert: {
          additional_info?: string | null
          address?: string | null
          battery_storage?: boolean | null
          budget?: string | null
          contacted_at?: string | null
          created_at?: string
          email: string
          estimated_annual_savings?: number | null
          estimated_monthly_savings?: number | null
          estimated_payback_period?: number | null
          estimated_system_cost?: number | null
          financing?: string | null
          first_name: string
          home_size?: string | null
          id?: string
          ip_address?: unknown
          last_name: string
          monitoring?: boolean | null
          monthly_bill: number
          phone: string
          roof_age?: string | null
          roof_type?: string | null
          shading?: string | null
          source?: string | null
          status?: string
          timeline?: string | null
          updated_at?: string
          user_agent?: string | null
          user_id?: string | null
          zip_code: string
        }
        Update: {
          additional_info?: string | null
          address?: string | null
          battery_storage?: boolean | null
          budget?: string | null
          contacted_at?: string | null
          created_at?: string
          email?: string
          estimated_annual_savings?: number | null
          estimated_monthly_savings?: number | null
          estimated_payback_period?: number | null
          estimated_system_cost?: number | null
          financing?: string | null
          first_name?: string
          home_size?: string | null
          id?: string
          ip_address?: unknown
          last_name?: string
          monitoring?: boolean | null
          monthly_bill?: number
          phone?: string
          roof_age?: string | null
          roof_type?: string | null
          shading?: string | null
          source?: string | null
          status?: string
          timeline?: string | null
          updated_at?: string
          user_agent?: string | null
          user_id?: string | null
          zip_code?: string
        }
        Relationships: []
      }
      tcpa_consent_logs: {
        Row: {
          consent_granted: boolean | null
          consent_text: string
          consent_type: string | null
          consent_version: string
          created_at: string
          email: string
          form_data: Json | null
          id: string
          ip_address: unknown
          lead_source: string | null
          name: string
          page_url: string | null
          phone: string
          quote_request_id: string | null
          referrer: string | null
          timestamp: string
          updated_at: string
          user_agent: string | null
        }
        Insert: {
          consent_granted?: boolean | null
          consent_text: string
          consent_type?: string | null
          consent_version?: string
          created_at?: string
          email: string
          form_data?: Json | null
          id?: string
          ip_address?: unknown
          lead_source?: string | null
          name: string
          page_url?: string | null
          phone: string
          quote_request_id?: string | null
          referrer?: string | null
          timestamp?: string
          updated_at?: string
          user_agent?: string | null
        }
        Update: {
          consent_granted?: boolean | null
          consent_text?: string
          consent_type?: string | null
          consent_version?: string
          created_at?: string
          email?: string
          form_data?: Json | null
          id?: string
          ip_address?: unknown
          lead_source?: string | null
          name?: string
          page_url?: string | null
          phone?: string
          quote_request_id?: string | null
          referrer?: string | null
          timestamp?: string
          updated_at?: string
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tcpa_consent_logs_quote_request_id_fkey"
            columns: ["quote_request_id"]
            isOneToOne: false
            referencedRelation: "quote_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
