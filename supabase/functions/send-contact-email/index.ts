import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// FIX #2: Restrict CORS to allowed origins
const ALLOWED_ORIGINS = [
  "https://setupevents.it",
  "https://www.setupevents.it",
  "https://abrielleshi-events-showcase.lovable.app",
];

function getCorsHeaders(req: Request) {
  const origin = req.headers.get("origin") || "";
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  };
}

// FIX #1: HTML escape helper
const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// Strip newlines to prevent SMTP header injection
const sanitizeHeader = (s: string) => s.replace(/[\r\n]/g, "").slice(0, 200);

// Email validation
const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 255;

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

// FIX #2: Simple in-memory rate limiter (per-instance)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX) return true;
  recent.push(now);
  rateLimitMap.set(ip, recent);
  return false;
}

const handler = async (req: Request): Promise<Response> => {
  const corsHeaders = getCorsHeaders(req);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting by IP
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("cf-connecting-ip") ||
      "unknown";

    if (isRateLimited(clientIp)) {
      return new Response(
        JSON.stringify({ success: false, error: "Troppe richieste. Riprova tra qualche minuto." }),
        { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const formData: ContactFormData = await req.json();

    // Validate required fields with length limits
    if (!formData.nome || !formData.cognome || !formData.email || !formData.telefono || !formData.messaggio) {
      return new Response(
        JSON.stringify({ success: false, error: "Campi obbligatori mancanti." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate email format
    if (!isValidEmail(formData.email)) {
      return new Response(
        JSON.stringify({ success: false, error: "Indirizzo email non valido." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Enforce max lengths
    const maxLengths: Record<string, number> = {
      nome: 100, cognome: 100, azienda: 200, email: 255,
      telefono: 30, tipoEvento: 100, dataEvento: 30, budget: 50, messaggio: 2000,
    };

    for (const [key, max] of Object.entries(maxLengths)) {
      const val = formData[key as keyof ContactFormData];
      if (val && val.length > max) {
        return new Response(
          JSON.stringify({ success: false, error: `Il campo ${key} è troppo lungo.` }),
          { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }
    }

    // Build HTML with escaped values
    const emailHtml = `
      <h1>Nuova Richiesta di Contatto</h1>
      <p>Hai ricevuto una nuova richiesta dal modulo di contatto del sito Setup Events.</p>
      
      <h2>Dettagli del Contatto</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Nome</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${esc(formData.nome)} ${esc(formData.cognome)}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Azienda</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${esc(formData.azienda || "Non specificata")}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Email</td>
          <td style="padding: 10px; border: 1px solid #ddd;"><a href="mailto:${esc(formData.email)}">${esc(formData.email)}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Telefono</td>
          <td style="padding: 10px; border: 1px solid #ddd;"><a href="tel:${esc(formData.telefono)}">${esc(formData.telefono)}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Tipo Evento</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${esc(formData.tipoEvento || "Non specificato")}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Data Evento</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${esc(formData.dataEvento || "Non specificata")}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Budget</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${esc(formData.budget || "Non specificato")}</td>
        </tr>
      </table>
      
      <h2>Messaggio</h2>
      <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${esc(formData.messaggio)}</p>
      
      <hr style="margin: 30px 0;" />
      <p style="color: #666; font-size: 12px;">Questa email è stata inviata automaticamente dal sito Setup Events.</p>
    `;

    // Sanitize subject line values
    const subjectTipo = sanitizeHeader(formData.tipoEvento || "Evento");
    const subjectNome = sanitizeHeader(`${formData.nome} ${formData.cognome}`);

    const emailResponse = await resend.emails.send({
      from: "Setup Events <onboarding@resend.dev>",
      to: ["info@setupevents.it"],
      subject: `Nuova Richiesta: ${subjectTipo} - ${subjectNome}`,
      html: emailHtml,
      reply_to: formData.email,
    });

    console.log("Contact email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: unknown) {
    console.error("Error in send-contact-email function:", error);

    // FIX #3: Return generic error message, never expose internals
    return new Response(
      JSON.stringify({ success: false, error: "Si è verificato un errore. Riprova più tardi." }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
