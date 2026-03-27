import { Linkedin, Mail } from "lucide-react";

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M12 2.04a9.93 9.93 0 0 0-8.57 15l-1.4 4.92 5.04-1.32A9.96 9.96 0 1 0 12 2.04Zm0 18.08c-1.54 0-3.05-.42-4.36-1.2l-.31-.18-2.98.78.83-2.92-.2-.31a8.06 8.06 0 1 1 7.02 3.83Zm4.42-5.89c-.24-.12-1.4-.69-1.62-.77-.22-.08-.38-.12-.54.12-.16.24-.62.77-.76.93-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.19a7.15 7.15 0 0 1-1.33-1.65c-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.57 4.09 3.6.57.25 1.01.4 1.36.51.57.18 1.09.15 1.5.09.46-.07 1.4-.57 1.6-1.12.2-.55.2-1.02.14-1.12-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  );
}

const links = [
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/higor-novakoski/",
    label: "LinkedIn",
  },
  {
    icon: WhatsAppIcon,
    href: "https://wa.me/5541920002316",
    label: "WhatsApp",
  },
  {
    icon: Mail,
    href: "mailto:higor.novakoski@gmail.com",
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
