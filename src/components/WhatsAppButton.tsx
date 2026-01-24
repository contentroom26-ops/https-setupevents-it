import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const openWhatsApp = () => {
    window.open(
      "https://wa.me/393XXXXXXXXX?text=Ciao! Vorrei informazioni sui vostri servizi per eventi.",
      "_blank"
    );
  };

  return (
    <motion.button
      onClick={openWhatsApp}
      className="whatsapp-btn"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, duration: 0.3 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Contattaci su WhatsApp"
    >
      <MessageCircle className="w-6 h-6 text-white" fill="white" />
    </motion.button>
  );
};

export default WhatsAppButton;
