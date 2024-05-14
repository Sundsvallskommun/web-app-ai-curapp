import { createContext, useContext, useState } from 'react';
import { AssistantPublic } from 'src/data-contracts/data-contracts';

export interface AppContextInterface {
  isCookieConsentOpen: boolean;
  setIsCookieConsentOpen: (isOpen: boolean) => void;

  setDefaults: () => void;

  user: string;
  setUser: (u: string) => void;
  hash: string;
  setHash: (h: string) => void;
  assistant?: AssistantPublic;
  setAssistant: (a: AssistantPublic) => void;
  sessionId: string;
  setSessionId: (s: string) => void;
}

const AppContext = createContext<AppContextInterface>(null);

export function AppWrapper({ children }) {
  const contextDefaults = {
    isCookieConsentOpen: true,
  };
  const setDefaults = () => {
    setIsCookieConsentOpen(contextDefaults.isCookieConsentOpen);
  };

  const [isCookieConsentOpen, setIsCookieConsentOpen] = useState(true);
  const [user, setUser] = useState<string>(null);
  const [hash, setHash] = useState<string>(null);
  const [assistant, setAssistant] = useState<AssistantPublic>(null);
  const [sessionId, setSessionId] = useState<string>(null);

  return (
    <AppContext.Provider
      value={{
        isCookieConsentOpen,
        setIsCookieConsentOpen: (isOpen: boolean) => setIsCookieConsentOpen(isOpen),

        setDefaults,

        user,
        setUser: (u: string) => setUser(u),
        hash,
        setHash: (h: string) => setHash(h),
        assistant,
        setAssistant: (a: AssistantPublic) => setAssistant(a),
        sessionId,
        setSessionId: (s: string) => setSessionId(s),
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
