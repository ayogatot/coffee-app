export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type CoffeeBeanDbRow = {
  id: string
  name: string
  category: string
  price: number
  stock: number
  image_url: Json // stored as JSONB string[]
  roast_level: string | null
  brewing_recommendations: string | null
  species: string | null
  variety: string | null
  process: string | null
  fermentation: string | null
  fermentation_temp: string | null
  origin: string | null
  elevation: string | null
  drying_method: string | null
  harvest_period: string | null
  sensory_notes: string | null
  story: string | null
  cup_character: string | null
  availability: string | null
  min_order_qty: string | null
  packaging: string | null
  created_at: string
  updated_at: string | null
}

export type Database = {
  public: {
    Tables: {
      coffee_beans: {
        Row: CoffeeBeanDbRow
        Insert: {
          id?: string
          name: string
          category: string
          price: number
          stock?: number
          image_url?: Json
          roast_level?: string | null
          brewing_recommendations?: string | null
          species?: string | null
          variety?: string | null
          process?: string | null
          fermentation?: string | null
          fermentation_temp?: string | null
          origin?: string | null
          elevation?: string | null
          drying_method?: string | null
          harvest_period?: string | null
          sensory_notes?: string | null
          story?: string | null
          cup_character?: string | null
          availability?: string | null
          min_order_qty?: string | null
          packaging?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          category?: string
          price?: number
          stock?: number
          image_url?: Json
          roast_level?: string | null
          brewing_recommendations?: string | null
          species?: string | null
          variety?: string | null
          process?: string | null
          fermentation?: string | null
          fermentation_temp?: string | null
          origin?: string | null
          elevation?: string | null
          drying_method?: string | null
          harvest_period?: string | null
          sensory_notes?: string | null
          story?: string | null
          cup_character?: string | null
          availability?: string | null
          min_order_qty?: string | null
          packaging?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      events: {
        Row: {
          id: string
          name: string
          description: string | null
          badge: string | null
          event_date: string
          event_time: string | null
          location: string | null
          venue_address: string | null
          price: number
          capacity: number
          image_url: string | null
          whats_included: Json // stored as JSONB string[]
          host_name: string | null
          host_title: string | null
          host_avatar_url: string | null
          host_bio: string | null
          highlights: Json // stored as JSONB array of objects
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          badge?: string | null
          event_date: string
          event_time?: string | null
          location?: string | null
          venue_address?: string | null
          price?: number
          capacity?: number
          image_url?: string | null
          whats_included?: Json
          host_name?: string | null
          host_title?: string | null
          host_avatar_url?: string | null
          host_bio?: string | null
          highlights?: Json
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          badge?: string | null
          event_date?: string
          event_time?: string | null
          location?: string | null
          venue_address?: string | null
          price?: number
          capacity?: number
          image_url?: string | null
          whats_included?: Json
          host_name?: string | null
          host_title?: string | null
          host_avatar_url?: string | null
          host_bio?: string | null
          highlights?: Json
          created_at?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      orders: {
        Row: {
          id: string
          customer_name: string
          whatsapp_number: string
          email: string | null
          status: string
          beans: Json // stored as JSONB array of { name: string, quantity: number }
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          customer_name: string
          whatsapp_number: string
          email?: string | null
          status?: string
          beans: Json
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          customer_name?: string
          whatsapp_number?: string
          email?: string | null
          status?: string
          beans?: Json
          created_at?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      event_registrations: {
        Row: {
          id: string
          participant_name: string
          whatsapp_number: string
          email: string | null
          event_id: string
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          participant_name: string
          whatsapp_number: string
          email?: string | null
          event_id: string
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          participant_name?: string
          whatsapp_number?: string
          email?: string | null
          event_id?: string
          created_at?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: boolean
            referencedRelation: "events"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      coffee_beans_view: {
        Row: CoffeeBeanDbRow & {
          slug: string
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Helper types for frontend / action files
export type CoffeeBean = {
  id: string
  name: string
  category: string
  price: number
  stock: number
  image_url: string[]
  roast_level: string | null
  brewing_recommendations: string | null
  species: string | null
  variety: string | null
  process: string | null
  fermentation: string | null
  fermentation_temp: string | null
  origin: string | null
  elevation: string | null
  drying_method: string | null
  harvest_period: string | null
  sensory_notes: string | null
  story: string | null
  cup_character: string | null
  availability: string | null
  min_order_qty: string | null
  packaging: string | null
  created_at: string
  updated_at: string | null
}

export type EventHighlight = {
  title: string
  description: string
}

export type Event = {
  id: string
  name: string
  description: string | null
  badge: string | null
  event_date: string
  event_time: string | null
  location: string | null
  venue_address: string | null
  price: number
  capacity: number
  image_url: string | null
  whats_included: string[]
  host_name: string | null
  host_title: string | null
  host_avatar_url: string | null
  host_bio: string | null
  highlights: EventHighlight[]
  created_at: string
  updated_at: string | null
}

export type OrderBeanItem = {
  bean_name?: string
  name?: string
  quantity: number
}

export type Order = {
  id: string
  customer_name: string
  whatsapp_number: string
  email: string | null
  status: string
  beans: OrderBeanItem[]
  created_at: string
  updated_at: string | null
}

export type EventRegistration = {
  id: string
  participant_name: string
  whatsapp_number: string
  email: string | null
  event_id: string
  created_at: string
  updated_at: string | null
  // Optionally joined events relation fields
  events?: {
    name: string
    event_date: string
  } | null
}
