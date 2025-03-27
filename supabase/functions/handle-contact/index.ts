
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";
import { Resend } from "npm:resend@2.0.0";

// Initialize Resend client for email sending
const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// CORS headers for cross-origin requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": 
    "authorization, x-client-info, apikey, content-type",
};

// Supabase client initialization with environment variables
const supabaseClient = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  message: string;
  consent: boolean;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Processing contact form submission");
    
    // Parse request body
    const requestData: ContactRequest = await req.json();
    const { name, email, phone, message, consent } = requestData;
    
    // Validation
    if (!name || !email || !message || consent !== true) {
      console.error("Validation failed:", { name, email, message, consent });
      return new Response(
        JSON.stringify({ 
          error: "Missing required fields or consent not provided" 
        }),
        { 
          status: 400, 
          headers: { 
            "Content-Type": "application/json",
            ...corsHeaders
          } 
        }
      );
    }
    
    console.log("Form data validated successfully");
    
    // 1. Store submission in database
    const { data: submissionData, error: submissionError } = await supabaseClient
      .from("contact_submissions")
      .insert({
        name,
        email,
        phone,
        message,
        consent,
      })
      .select()
      .single();
    
    if (submissionError) {
      console.error("Database insertion error:", submissionError);
      throw new Error(`Failed to store contact submission: ${submissionError.message}`);
    }
    
    console.log("Submission stored in database:", submissionData.id);
    
    // 2. Send notification email to admin
    const adminEmailResult = await resend.emails.send({
      from: "AdvisorWiz <no-reply@resend.dev>",
      to: ["admin@advisorwiz.com"], // Change to your admin email
      subject: "New Contact Form Submission",
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <p><strong>Consent Given:</strong> Yes</p>
        <p><strong>Submission ID:</strong> ${submissionData.id}</p>
        <p><strong>Time:</strong> ${new Date().toISOString()}</p>
      `,
    });
    
    console.log("Admin notification email result:", adminEmailResult);
    
    // 3. Send confirmation email to user
    const userEmailResult = await resend.emails.send({
      from: "AdvisorWiz <no-reply@resend.dev>",
      to: [email],
      subject: "We've Received Your Message - AdvisorWiz",
      html: `
        <h2>Thank You for Contacting AdvisorWiz</h2>
        <p>Hello ${name},</p>
        <p>We've received your message and appreciate you reaching out to us.</p>
        <p>Our team will review your inquiry and get back to you as soon as possible, 
        typically within 1-2 business days.</p>
        <p><strong>Your message:</strong></p>
        <p style="padding: 10px; background-color: #f5f5f5; border-left: 4px solid #0091EA;">
          ${message}
        </p>
        <p>If you have any additional information to share, feel free to reply to this email.</p>
        <p>Best regards,<br>The AdvisorWiz Team</p>
      `,
    });
    
    console.log("User confirmation email result:", userEmailResult);
    
    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Contact form submitted successfully",
        submissionId: submissionData.id
      }),
      { 
        status: 200, 
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders 
        } 
      }
    );
    
  } catch (error) {
    console.error("Error processing contact submission:", error);
    
    return new Response(
      JSON.stringify({ 
        error: "Failed to process contact form submission",
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders 
        } 
      }
    );
  }
};

serve(handler);
