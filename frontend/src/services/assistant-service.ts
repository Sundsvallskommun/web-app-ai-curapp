export const getAssistants = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/assistants/`;
  return fetch(url, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  }).then((res) => res.json());
};

export const getAssistantById = async (assistantId: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/assistants/${assistantId}`;
  return fetch(url, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  }).then((res) => res.json());
};

export const getAssistantSessions = async (assistantId: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/assistants/${assistantId}/sessions/`;
  return fetch(url, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  }).then((res) => res.json());
};

export const getAssistantSessionById = async (assistantId: string, sessionId: number) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/assistants/${assistantId}/sessions/${sessionId}/`;
  return fetch(url, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  }).then((res) => res.json());
};
