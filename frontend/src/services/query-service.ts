export const batchQuery = async (query: string, sessionId: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/ask/${sessionId || ''}?stream=false`;
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({ body: query }),
    headers: {
      Accept: 'application/json',
      // _skuser: user,
      // _skassistant: assistantId,
      // _skhash: hash,
    },
  }).then((res) => {
    if (res.status === 401) {
      throw new Error('401 Not authorized');
    }
    return res.json();
  });
};
