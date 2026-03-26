import { Linkedin, Mail, MessageCircle } from "lucide-react";

const links = [
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/seuusuario",
    label: "LinkedIn",
  },
  {
    icon: MessageCircle,
    href: "https://wa.me/5599999999999",
    label: "WhatsApp",
  },
  {
    icon: Mail,
    href: "mailto:seuemail@email.com",
    label: "Email",
  },
];

export function SocialHud() {
  return (
    <div className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-5 rounded-full border border-white/10 bg-black/35 px-4 py-3 backdrop-blur-md md:bottom-6 md:left-6 md:translate-x-0 md:rounded-none md:border-0 md:bg-transparent md:px-0 md:py-0">
      {/* linha HUD */}
      <div className="absolute -top-4 left-4 h-px w-28 bg-gradient-to-r from-glowV/40 to-transparent md:-top-6 md:left-0 md:w-40" />

      {links.map(({ icon: Icon, href, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          className="group relative"
        >
          {/* losango */}
          <div className="relative h-10 w-10 rotate-45 border border-glowV/50 bg-white/[0.03] backdrop-blur-sm transition-all duration-300 group-hover:border-glowB/80 group-hover:shadow-[0_0_20px_rgba(140,90,255,.6)] md:h-12 md:w-12">
            <div className="flex h-full w-full -rotate-45 items-center justify-center text-white/80 group-hover:text-white">
              <Icon size={16} />
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
