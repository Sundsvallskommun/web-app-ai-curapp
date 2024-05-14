import { HeaderComponent } from '@components/HeaderComponent';
import { MainComponent } from '@components/MainComponent';
import { useAppContext } from '@contexts/app.context';
import { getAssistantById } from '@services/assistant-service';
import { useEffect } from 'react';

export default function Index() {
  const { setUser, setHash, setAssistant } = useAppContext();

  useEffect(() => {
    const user = process.env.NEXT_PUBLIC_USER;
    const hash = process.env.NEXT_PUBLIC_HASH;
    const assistant = process.env.NEXT_PUBLIC_ASSISTANT_ID;
    console.log({ user, hash, assistant });
    setUser(user);
    setHash(hash);
    if (assistant) {
      getAssistantById(assistant).then(setAssistant);
    }
  }, []);

  return (
    <div>
      <HeaderComponent />
      <MainComponent />
    </div>
  );
}
