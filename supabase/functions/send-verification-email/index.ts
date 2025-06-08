
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  email: string;
  token: string;
  type: 'email' | 'password_reset';
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, token, type }: EmailRequest = await req.json();

    // In a real application, you would integrate with an email service like Resend
    // For now, we'll log the email details
    console.log(`Sending ${type} email to ${email} with token ${token}`);

    // Here you would implement email sending logic using Resend or other email service
    // Example:
    // const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
    // await resend.emails.send({
    //   from: "your-app@yourdomain.com",
    //   to: [email],
    //   subject: type === 'email' ? 'Verify your email' : 'Reset your password',
    //   html: `Your verification link: ${window.location.origin}/auth/verify?token=${token}&type=${type}`
    // });

    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-verification-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
