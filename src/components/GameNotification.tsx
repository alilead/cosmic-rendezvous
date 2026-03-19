import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const GAME_POPUP_KEY = "cosmic_alien_game_popup_shown";
const DELAY_MS = 20_000;

/** Shows a one-time toast after 20s on the site: "Play Alien Jump!" with link to /game. */
export default function GameNotification() {
  const navigate = useNavigate();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (typeof sessionStorage === "undefined") return;
    if (sessionStorage.getItem(GAME_POPUP_KEY)) return;

    timeoutRef.current = setTimeout(() => {
      sessionStorage.setItem(GAME_POPUP_KEY, "1");
      toast("Play Alien Jump!", {
        description: "Jump between platforms as the Cosmic alien.",
        action: {
          label: "Play",
          onClick: () => navigate("/game"),
        },
        duration: 10_000,
      });
    }, DELAY_MS);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [navigate]);

  return null;
}
