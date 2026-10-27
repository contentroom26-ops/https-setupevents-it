import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { forwardRef } from "react";

const WhatsAppButton = forwardRef<HTMLButtonElement>((_, ref) => {
  const openWhatsApp = () => {
    const phoneNumber = "393284163053";
    const message = encodeURIComponent("Salve, vorrei organizzare un evento, vorrei avere più informazioni.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <motion.button
      ref={ref}
      onClick={openWhatsApp}
      // fixed: il pulsante fluttua in basso a sinistra e non occupa più spazio sotto il footer
      className="whatsapp-btn fixed bottom-5 left-5 z-50 flex h-14 w-14 items-center justify-center rounded-full"
      style={{ background: "#25D366", boxShadow: "0 8px 24px -6px rgba(37,211,102,0.5)" }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, duration: 0.3, type: "spring" as const, stiffness: 200 }}
      whileHover={{ scale: 1.1, y: -4 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Contattaci su WhatsApp"
    >
      <MessageCircle className="w-6 h-6 text-white" fill="white" />
    </motion.button>
  );
});

WhatsAppButton.displayName = "WhatsAppButton";

export default WhatsAppButton;
