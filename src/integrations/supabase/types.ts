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
          average_rating: number | null
          biography: string | null
          certifications: string[] | null
          created_at: string | null
          expertise: Database["public"]["Enums"]["service_category"][] | null
          hourly_rate: number | null
          id: string
          is_accredited: boolean | null
          languages: string[] | null
          licensing_body: string | null
          organization: string | null
          portfolio_fee: number | null
          rating_count: number | null
          registration_number: string | null
          updated_at: string | null
          website: string | null
          years_of_experience: number | null
        }
        Insert: {
          assets_under_management?: number | null
          average_rating?: number | null
          biography?: string | null
          certifications?: string[] | null
          created_at?: string | null
          expertise?: Database["public"]["Enums"]["service_category"][] | null
          hourly_rate?: number | null
          id: string
          is_accredited?: boolean | null
          languages?: string[] | null
          licensing_body?: string | null
          organization?: string | null
          portfolio_fee?: number | null
          rating_count?: number | null
          registration_number?: string | null
          updated_at?: string | null
          website?: string | null
          years_of_experience?: number | null
        }
        Update: {
          assets_under_management?: number | null
          average_rating?: number | null
          biography?: string | null
          certifications?: string[] | null
          created_at?: string | null
          expertise?: Database["public"]["Enums"]["service_category"][] | null
          hourly_rate?: number | null
          id?: string
          is_accredited?: boolean | null
          languages?: string[] | null
          licensing_body?: string | null
          organization?: string | null
          portfolio_fee?: number | null
          rating_count?: number | null
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
      advisor_specializations: {
        Row: {
          advisor_id: string
          level: string | null
          specialization_id: string
        }
        Insert: {
          advisor_id: string
          level?: string | null
          specialization_id: string
        }
        Update: {
          advisor_id?: string
          level?: string | null
          specialization_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "advisor_specializations_advisor_id_fkey"
            columns: ["advisor_id"]
            isOneToOne: false
            referencedRelation: "advisor_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "advisor_specializations_specialization_id_fkey"
            columns: ["specialization_id"]
            isOneToOne: false
            referencedRelation: "specializations"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_interactions: {
        Row: {
          created_at: string | null
          feedback_score: number | null
          id: string
          interaction_type: string
          latency_ms: number | null
          prompt: string | null
          response: string | null
          session_id: string
          tokens_used: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          feedback_score?: number | null
          id?: string
          interaction_type: string
          latency_ms?: number | null
          prompt?: string | null
          response?: string | null
          session_id: string
          tokens_used?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          feedback_score?: number | null
          id?: string
          interaction_type?: string
          latency_ms?: number | null
          prompt?: string | null
          response?: string | null
          session_id?: string
          tokens_used?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      analytics_metrics: {
        Row: {
          created_at: string | null
          dimension_name: string | null
          dimension_value: string | null
          id: string
          metric_date: string
          metric_name: string
          metric_type: string
          metric_value: number
        }
        Insert: {
          created_at?: string | null
          dimension_name?: string | null
          dimension_value?: string | null
          id?: string
          metric_date: string
          metric_name: string
          metric_type: string
          metric_value: number
        }
        Update: {
          created_at?: string | null
          dimension_name?: string | null
          dimension_value?: string | null
          id?: string
          metric_date?: string
          metric_name?: string
          metric_type?: string
          metric_value?: number
        }
        Relationships: []
      }
      appointments: {
        Row: {
          advisor_id: string | null
          consumer_id: string | null
          created_at: string | null
          description: string | null
          id: string
          meeting_link: string | null
          notes: string | null
          scheduled_end: string
          scheduled_start: string
          status: string
          title: string | null
          updated_at: string | null
        }
        Insert: {
          advisor_id?: string | null
          consumer_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          meeting_link?: string | null
          notes?: string | null
          scheduled_end: string
          scheduled_start: string
          status?: string
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          advisor_id?: string | null
          consumer_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          meeting_link?: string | null
          notes?: string | null
          scheduled_end?: string
          scheduled_start?: string
          status?: string
          title?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "appointments_advisor_id_fkey"
            columns: ["advisor_id"]
            isOneToOne: false
            referencedRelation: "advisor_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_consumer_id_fkey"
            columns: ["consumer_id"]
            isOneToOne: false
            referencedRelation: "consumer_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          read: boolean | null
          read_at: string | null
          recipient_id: string | null
          sender_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          read?: boolean | null
          read_at?: string | null
          recipient_id?: string | null
          sender_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          read?: boolean | null
          read_at?: string | null
          recipient_id?: string | null
          sender_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
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
          financial_goals: string[] | null
          id: string
          income_bracket: string | null
          investable_assets: number | null
          investment_amount: number | null
          preferred_advisor_specialties: string[] | null
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
          financial_goals?: string[] | null
          id: string
          income_bracket?: string | null
          investable_assets?: number | null
          investment_amount?: number | null
          preferred_advisor_specialties?: string[] | null
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
          financial_goals?: string[] | null
          id?: string
          income_bracket?: string | null
          investable_assets?: number | null
          investment_amount?: number | null
          preferred_advisor_specialties?: string[] | null
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
      feature_usage: {
        Row: {
          feature_name: string
          first_used_at: string | null
          id: string
          last_used_at: string | null
          usage_count: number | null
          user_id: string | null
        }
        Insert: {
          feature_name: string
          first_used_at?: string | null
          id?: string
          last_used_at?: string | null
          usage_count?: number | null
          user_id?: string | null
        }
        Update: {
          feature_name?: string
          first_used_at?: string | null
          id?: string
          last_used_at?: string | null
          usage_count?: number | null
          user_id?: string | null
        }
        Relationships: []
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
          assets_under_management: number | null
          city: string | null
          country: string | null
          created_at: string | null
          description: string | null
          employee_count: number | null
          id: string
          industry: string | null
          logo: string | null
          name: string
          size: string | null
          state: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          admin_id?: string | null
          assets_under_management?: number | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          description?: string | null
          employee_count?: number | null
          id?: string
          industry?: string | null
          logo?: string | null
          name: string
          size?: string | null
          state?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          admin_id?: string | null
          assets_under_management?: number | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          description?: string | null
          employee_count?: number | null
          id?: string
          industry?: string | null
          logo?: string | null
          name?: string
          size?: string | null
          state?: string | null
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
      match_history: {
        Row: {
          advisor_id: string | null
          algorithm_version: string | null
          compatibility_score_id: string | null
          consumer_id: string | null
          factors: Json | null
          id: string
          recorded_at: string | null
          score: number
        }
        Insert: {
          advisor_id?: string | null
          algorithm_version?: string | null
          compatibility_score_id?: string | null
          consumer_id?: string | null
          factors?: Json | null
          id?: string
          recorded_at?: string | null
          score: number
        }
        Update: {
          advisor_id?: string | null
          algorithm_version?: string | null
          compatibility_score_id?: string | null
          consumer_id?: string | null
          factors?: Json | null
          id?: string
          recorded_at?: string | null
          score?: number
        }
        Relationships: [
          {
            foreignKeyName: "match_history_advisor_id_fkey"
            columns: ["advisor_id"]
            isOneToOne: false
            referencedRelation: "advisor_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "match_history_compatibility_score_id_fkey"
            columns: ["compatibility_score_id"]
            isOneToOne: false
            referencedRelation: "compatibility_scores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "match_history_consumer_id_fkey"
            columns: ["consumer_id"]
            isOneToOne: false
            referencedRelation: "consumer_profiles"
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
      notifications: {
        Row: {
          action_link: string | null
          created_at: string | null
          id: string
          message: string | null
          read: boolean | null
          title: string
          type: string
          user_id: string | null
        }
        Insert: {
          action_link?: string | null
          created_at?: string | null
          id?: string
          message?: string | null
          read?: boolean | null
          title: string
          type: string
          user_id?: string | null
        }
        Update: {
          action_link?: string | null
          created_at?: string | null
          id?: string
          message?: string | null
          read?: boolean | null
          title?: string
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          chat_enabled: boolean | null
          city: string | null
          country: string | null
          created_at: string | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          last_online: string | null
          online_status: Database["public"]["Enums"]["online_status"] | null
          phone: string | null
          show_online_status: boolean | null
          state: string | null
          updated_at: string | null
          user_type: string | null
        }
        Insert: {
          avatar_url?: string | null
          chat_enabled?: boolean | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          last_online?: string | null
          online_status?: Database["public"]["Enums"]["online_status"] | null
          phone?: string | null
          show_online_status?: boolean | null
          state?: string | null
          updated_at?: string | null
          user_type?: string | null
        }
        Update: {
          avatar_url?: string | null
          chat_enabled?: boolean | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          last_online?: string | null
          online_status?: Database["public"]["Enums"]["online_status"] | null
          phone?: string | null
          show_online_status?: boolean | null
          state?: string | null
          updated_at?: string | null
          user_type?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          advisor_id: string | null
          consumer_id: string | null
          created_at: string | null
          id: string
          is_public: boolean | null
          rating: number
          review_text: string | null
        }
        Insert: {
          advisor_id?: string | null
          consumer_id?: string | null
          created_at?: string | null
          id?: string
          is_public?: boolean | null
          rating: number
          review_text?: string | null
        }
        Update: {
          advisor_id?: string | null
          consumer_id?: string | null
          created_at?: string | null
          id?: string
          is_public?: boolean | null
          rating?: number
          review_text?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_advisor_id_fkey"
            columns: ["advisor_id"]
            isOneToOne: false
            referencedRelation: "advisor_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_consumer_id_fkey"
            columns: ["consumer_id"]
            isOneToOne: false
            referencedRelation: "consumer_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      specializations: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          advisor_id: string | null
          amount: number
          consumer_id: string | null
          created_at: string | null
          currency: string | null
          description: string | null
          external_reference: string | null
          id: string
          payment_method: string | null
          status: string
          type: string
          updated_at: string | null
        }
        Insert: {
          advisor_id?: string | null
          amount: number
          consumer_id?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          external_reference?: string | null
          id?: string
          payment_method?: string | null
          status?: string
          type: string
          updated_at?: string | null
        }
        Update: {
          advisor_id?: string | null
          amount?: number
          consumer_id?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          external_reference?: string | null
          id?: string
          payment_method?: string | null
          status?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_advisor_id_fkey"
            columns: ["advisor_id"]
            isOneToOne: false
            referencedRelation: "advisor_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_consumer_id_fkey"
            columns: ["consumer_id"]
            isOneToOne: false
            referencedRelation: "consumer_profiles"
            referencedColumns: ["id"]
          },
        ]
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
      user_preferences: {
        Row: {
          ai_preferences: Json | null
          dashboard_preferences: Json | null
          matching_preferences: Json | null
          notification_preferences: Json | null
          ui_preferences: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          ai_preferences?: Json | null
          dashboard_preferences?: Json | null
          matching_preferences?: Json | null
          notification_preferences?: Json | null
          ui_preferences?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          ai_preferences?: Json | null
          dashboard_preferences?: Json | null
          matching_preferences?: Json | null
          notification_preferences?: Json | null
          ui_preferences?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_preferences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_segment_memberships: {
        Row: {
          added_at: string | null
          id: string
          segment_id: string | null
          user_id: string | null
        }
        Insert: {
          added_at?: string | null
          id?: string
          segment_id?: string | null
          user_id?: string | null
        }
        Update: {
          added_at?: string | null
          id?: string
          segment_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_segment_memberships_segment_id_fkey"
            columns: ["segment_id"]
            isOneToOne: false
            referencedRelation: "user_segments"
            referencedColumns: ["id"]
          },
        ]
      }
      user_segments: {
        Row: {
          created_at: string | null
          criteria: Json
          id: string
          segment_description: string | null
          segment_name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          criteria: Json
          id?: string
          segment_description?: string | null
          segment_name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          criteria?: Json
          id?: string
          segment_description?: string | null
          segment_name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      visitor_analytics: {
        Row: {
          browser: string | null
          conversion_date: string | null
          conversion_page: string | null
          country: string | null
          created_at: string | null
          device_type: string | null
          first_visit_date: string | null
          id: string
          landing_page: string | null
          last_visit_date: string | null
          os: string | null
          referrer: string | null
          region: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
          visit_count: number | null
          visitor_id: string
        }
        Insert: {
          browser?: string | null
          conversion_date?: string | null
          conversion_page?: string | null
          country?: string | null
          created_at?: string | null
          device_type?: string | null
          first_visit_date?: string | null
          id?: string
          landing_page?: string | null
          last_visit_date?: string | null
          os?: string | null
          referrer?: string | null
          region?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          visit_count?: number | null
          visitor_id: string
        }
        Update: {
          browser?: string | null
          conversion_date?: string | null
          conversion_page?: string | null
          country?: string | null
          created_at?: string | null
          device_type?: string | null
          first_visit_date?: string | null
          id?: string
          landing_page?: string | null
          last_visit_date?: string | null
          os?: string | null
          referrer?: string | null
          region?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          visit_count?: number | null
          visitor_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      record_metric: {
        Args: {
          p_metric_type: string
          p_metric_name: string
          p_metric_value: number
          p_dimension_name?: string
          p_dimension_value?: string
        }
        Returns: string
      }
      refresh_user_segments: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
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
