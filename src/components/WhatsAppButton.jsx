import { MdChat } from "react-icons/md";

export default function WhatsAppButton({ phoneNumber, message = "Halo Cendekia CRM" }) {
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-green-100 transition-all"
    >
      <MdChat size={16} /> Hubungi via WhatsApp
    </a>
  );
}