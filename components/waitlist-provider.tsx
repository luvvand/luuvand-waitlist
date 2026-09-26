"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { WaitlistModal } from "./waitlist-modal";

const WaitlistContext = createContext<{ open: () => void }>({ open: () => {} });

export const useWaitlist = () => useContext(WaitlistContext);

export function WaitlistProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const value = useMemo(() => ({ open }), [open]);

  return (
    <WaitlistContext.Provider value={value}>
      {children}
      <WaitlistModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </WaitlistContext.Provider>
  );
}
