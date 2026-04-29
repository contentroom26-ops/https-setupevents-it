import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

type State = "loading" | "valid" | "already" | "invalid" | "submitting" | "done" | "error";

const Unsubscribe = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [state, setState] = useState<State>("loading");

  useEffect(() => {
    const validate = async () => {
      if (!token) {
        setState("invalid");
        return;
      }
      try {
        const res = await fetch(
          `${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`,
          { headers: { apikey: SUPABASE_ANON } }
        );
        const json = await res.json();
        if (json.valid === true) setState("valid");
        else if (json.reason === "already_unsubscribed") setState("already");
        else setState("invalid");
      } catch {
        setState("error");
      }
    };
    validate();
  }, [token]);

  const confirm = async () => {
    if (!token) return;
    setState("submitting");
    try {
      const { data, error } = await supabase.functions.invoke("handle-email-unsubscribe", {
        body: { token },
      });
      if (error) throw error;
      if ((data as any)?.success || (data as any)?.reason === "already_unsubscribed") {
        setState("done");
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center bg-card/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-premium">
        <h1 className="font-display text-3xl font-extrabold text-white mb-4">
          Disiscrizione email
        </h1>

        {state === "loading" && (
          <div className="flex justify-center py-6">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        )}

        {state === "valid" && (
          <>
            <p className="text-white/70 mb-6">
              Confermi di voler annullare l'iscrizione alle email di Setup Events?
            </p>
            <Button onClick={confirm} className="w-full">
              Conferma disiscrizione
            </Button>
          </>
        )}

        {state === "submitting" && (
          <div className="flex justify-center py-6">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        )}

        {state === "done" && (
          <p className="text-white/80">
            Sei stato disiscritto correttamente. Non riceverai più email da Setup Events.
          </p>
        )}

        {state === "already" && (
          <p className="text-white/80">Sei già disiscritto da queste comunicazioni.</p>
        )}

        {state === "invalid" && (
          <p className="text-white/70">Link non valido o scaduto.</p>
        )}

        {state === "error" && (
          <p className="text-white/70">
            Si è verificato un errore. Riprova tra qualche minuto.
          </p>
        )}
      </div>
    </main>
  );
};

export default Unsubscribe;
