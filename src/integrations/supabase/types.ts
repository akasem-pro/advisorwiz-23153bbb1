export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      advisor_profiles: {
        Row: {
          assets_under_management: number | null
          created_at: string | null
          expertise: Database["public"]["Enums"]["service_category"][] | null
          hourly_rate: number | null
          id: string
          is_accredited: boolean | null
          languages: string[] | null
          licensing_body: string | null
          organization: string | null
          portfolio_fee: number | null
          registration_number: string | null
          updated_at: string | null
          website: string | null
          years_of_experience: number | null
        }
        Insert: {
          assets_under_management?: number | null
          created_at?: string | null
          expertise?: Database["public"]["Enums"]["service_category"][] | null
          hourly_rate?: number | null
          id: string
          is_accredited?: boolean | null
          languages?: string[] | null
          licensing_body?: string | null
          organization?: string | null
          portfolio_fee?: number | null
          registration_number?: string | null
          updated_at?: string | null
          website?: string | null
          years_of_experience?: number | null
        }
        Update: {
          assets_under_management?: number | null
          created_at?: string | null
          expertise?: Database["public"]["Enums"]["service_category"][] | null
          hourly_rate?: number | null
          id?: string
          is_accredited?: boolean | null
          languages?: string[] | null
          licensing_body?: string | null
          organization?: string | null
          portfolio_fee?: number | null
          registration_number?: string | null
          updated_at?: string | null
          website?: string | null
          years_of_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "advisor_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      compatibility_scores: {
        Row: {
          advisor_id: string | null
          consumer_id: string | null
          created_at: string | null
          id: string
          match_explanations: string[] | null
          score: number
          updated_at: string | null
        }
        Insert: {
          advisor_id?: string | null
          consumer_id?: string | null
          created_at?: string | null
          id?: string
          match_explanations?: string[] | null
          score: number
          updated_at?: string | null
        }
        Update: {
          advisor_id?: string | null
          consumer_id?: string | null
          created_at?: string | null
          id?: string
          match_explanations?: string[] | null
          score?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "compatibility_scores_advisor_id_fkey"
            columns: ["advisor_id"]
            isOneToOne: false
            referencedRelation: "advisor_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "compatibility_scores_consumer_id_fkey"
            columns: ["consumer_id"]
            isOneToOne: false
            referencedRelation: "consumer_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      consumer_profiles: {
        Row: {
          age: number | null
          created_at: string | null
          id: string
          investable_assets: number | null
          investment_amount: number | null
          preferred_communication: string[] | null
          preferred_language: string[] | null
          risk_tolerance: Database["public"]["Enums"]["risk_tolerance"] | null
          service_needs:
            | Database["public"]["Enums"]["service_category"][]
            | null
          start_timeline: string | null
          updated_at: string | null
        }
        Insert: {
          age?: number | null
          created_at?: string | null
          id: string
          investable_assets?: number | null
          investment_amount?: number | null
          preferred_communication?: string[] | null
          preferred_language?: string[] | null
          risk_tolerance?: Database["public"]["Enums"]["risk_tolerance"] | null
          service_needs?:
            | Database["public"]["Enums"]["service_category"][]
            | null
          start_timeline?: string | null
          updated_at?: string | null
        }
        Update: {
          age?: number | null
          created_at?: string | null
          id?: string
          investable_assets?: number | null
          investment_amount?: number | null
          preferred_communication?: string[] | null
          preferred_language?: string[] | null
          risk_tolerance?: Database["public"]["Enums"]["risk_tolerance"] | null
          service_needs?:
            | Database["public"]["Enums"]["service_category"][]
            | null
          start_timeline?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "consumer_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      firm_advisors: {
        Row: {
          advisor_id: string
          firm_id: string
          role: string | null
        }
        Insert: {
          advisor_id: string
          firm_id: string
          role?: string | null
        }
        Update: {
          advisor_id?: string
          firm_id?: string
          role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "firm_advisors_advisor_id_fkey"
            columns: ["advisor_id"]
            isOneToOne: false
            referencedRelation: "advisor_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "firm_advisors_firm_id_fkey"
            columns: ["firm_id"]
            isOneToOne: false
            referencedRelation: "firms"
            referencedColumns: ["id"]
          },
        ]
      }
      firms: {
        Row: {
          admin_id: string | null
          created_at: string | null
          description: string | null
          id: string
          logo: string | null
          name: string
          updated_at: string | null
          website: string | null
        }
        Insert: {
          admin_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          logo?: string | null
          name: string
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          admin_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          logo?: string | null
          name?: string
          updated_at?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "firms_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          advisor_id: string | null
          consumer_id: string | null
          created_at: string | null
          id: string
          match_score: number | null
          notes: string | null
          source: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          advisor_id?: string | null
          consumer_id?: string | null
          created_at?: string | null
          id?: string
          match_score?: number | null
          notes?: string | null
          source?: string | null
          status: string
          updated_at?: string | null
        }
        Update: {
          advisor_id?: string | null
          consumer_id?: string | null
          created_at?: string | null
          id?: string
          match_score?: number | null
          notes?: string | null
          source?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_advisor_id_fkey"
            columns: ["advisor_id"]
            isOneToOne: false
            referencedRelation: "advisor_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_consumer_id_fkey"
            columns: ["consumer_id"]
            isOneToOne: false
            referencedRelation: "consumer_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      match_feedback: {
        Row: {
          comment: string | null
          created_at: string | null
          id: string
          is_helpful: boolean
          match_id: string | null
          user_id: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          id?: string
          is_helpful: boolean
          match_id?: string | null
          user_id?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          id?: string
          is_helpful?: boolean
          match_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "match_feedback_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "compatibility_scores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "match_feedback_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      matching_performance: {
        Row: {
          execution_time: number
          function_name: string
          id: string
          input_size: number | null
          timestamp: string | null
        }
        Insert: {
          execution_time: number
          function_name: string
          id?: string
          input_size?: number | null
          timestamp?: string | null
        }
        Update: {
          execution_time?: number
          function_name?: string
          id?: string
          input_size?: number | null
          timestamp?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          chat_enabled: boolean | null
          created_at: string | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          last_online: string | null
          online_status: Database["public"]["Enums"]["online_status"] | null
          phone: string | null
          show_online_status: boolean | null
          updated_at: string | null
          user_type: string | null
        }
        Insert: {
          avatar_url?: string | null
          chat_enabled?: boolean | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          last_online?: string | null
          online_status?: Database["public"]["Enums"]["online_status"] | null
          phone?: string | null
          show_online_status?: boolean | null
          updated_at?: string | null
          user_type?: string | null
        }
        Update: {
          avatar_url?: string | null
          chat_enabled?: boolean | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          last_online?: string | null
          online_status?: Database["public"]["Enums"]["online_status"] | null
          phone?: string | null
          show_online_status?: boolean | null
          updated_at?: string | null
          user_type?: string | null
        }
        Relationships: []
      }
      user_interactions: {
        Row: {
          advisor_id: string | null
          consumer_id: string | null
          duration: number | null
          id: string
          interaction_type: string
          notes: string | null
          timestamp: string | null
        }
        Insert: {
          advisor_id?: string | null
          consumer_id?: string | null
          duration?: number | null
          id?: string
          interaction_type: string
          notes?: string | null
          timestamp?: string | null
        }
        Update: {
          advisor_id?: string | null
          consumer_id?: string | null
          duration?: number | null
          id?: string
          interaction_type?: string
          notes?: string | null
          timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_interactions_advisor_id_fkey"
            columns: ["advisor_id"]
            isOneToOne: false
            referencedRelation: "advisor_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_interactions_consumer_id_fkey"
            columns: ["consumer_id"]
            isOneToOne: false
            referencedRelation: "consumer_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      online_status: "online" | "offline" | "away"
      risk_tolerance: "low" | "medium" | "high"
      service_category:
        | "retirement"
        | "investment"
        | "tax"
        | "estate"
        | "business"
        | "insurance"
        | "philanthropic"
        | "education"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
