import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ContactFormData {
  nome: string;
  cognome: string;
  azienda: string;
  email: string;
  telefono: string;
  tipoEvento: string;
  dataEvento: string;
  budget: string;
  messaggio: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: ContactFormData = await req.json();

    // Validate required fields
    if (!formData.nome || !formData.cognome || !formData.email || !formData.telefono || !formData.messaggio) {
      throw new Error("Campi obbligatori mancanti");
    }

    const emailHtml = `
      <h1>Nuova Richiesta di Contatto</h1>
      <p>Hai ricevuto una nuova richiesta dal modulo di contatto del sito Setup Events.</p>
      
      <h2>Dettagli del Contatto</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Nome</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${formData.nome} ${formData.cognome}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Azienda</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${formData.azienda || "Non specificata"}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Email</td>
          <td style="padding: 10px; border: 1px solid #ddd;"><a href="mailto:${formData.email}">${formData.email}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Telefono</td>
          <td style="padding: 10px; border: 1px solid #ddd;"><a href="tel:${formData.telefono}">${formData.telefono}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Tipo Evento</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${formData.tipoEvento || "Non specificato"}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Data Evento</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${formData.dataEvento || "Non specificata"}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Budget</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${formData.budget || "Non specificato"}</td>
        </tr>
      </table>
      
      <h2>Messaggio</h2>
      <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${formData.messaggio}</p>
      
      <hr style="margin: 30px 0;" />
      <p style="color: #666; font-size: 12px;">Questa email è stata inviata automaticamente dal sito Setup Events.</p>
    `;

    const emailResponse = await resend.emails.send({
      from: "Setup Events <onboarding@resend.dev>",
      to: ["info@setupevents.it"],
      subject: `Nuova Richiesta: ${formData.tipoEvento || "Evento"} - ${formData.nome} ${formData.cognome}`,
      html: emailHtml,
      reply_to: formData.email,
    });

    console.log("Contact email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: unknown) {
    console.error("Error in send-contact-email function:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
