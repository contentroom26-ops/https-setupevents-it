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
      className="whatsapp-btn rounded-full"
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
