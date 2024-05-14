import { EventSourceMessage, fetchEventSource } from '@microsoft/fetch-event-source';
import { useCallback, useState } from 'react';
import { ChatEntryReference, ChatHistory, ChatHistoryEntry, Origin } from '../interfaces/history';
import { ResponseData } from '../interfaces/responseData';
import { batchQuery } from '../services/query-service';
import { useAppContext } from '@contexts/app.context';

const MAX_REFERENCE_COUNT = 3;

function useChat() {
  const stream = process.env.NEXT_PUBLIC_STREAM_DEFAULT === 'true';
  const { sessionId, setSessionId, user, hash } = useAppContext();
  const [history, setHistory] = useState<ChatHistory>([]);
  const [incoming, setIncoming] = useState([]);
  const [done, setDone] = useState(true);
  const [error, setError] = useState(null);

  const clearHistory = () => {
    setHistory([]);
    setSessionId(null);
  };

  const addHistoryEntry = (origin: Origin, text: string, id: string, references?: ChatEntryReference[]) => {
    const historyEntry: ChatHistoryEntry = {
      origin: origin,
      text,
      id,
      ...(references && { references }),
    };
    setHistory((history: ChatHistory) => {
      return [...history, historyEntry];
    });
  };

  const streamQuery = useCallback((query: string, session_id: string) => {
    const answerId = crypto.randomUUID();
    const questionId = crypto.randomUUID();
    addHistoryEntry('user', query, questionId);
    setDone(false);
    const url = `${process.env.NEXT_PUBLIC_API_URL}/ask/${session_id || ''}?stream=true`;

    let _id;
    let references: ChatEntryReference[];

    fetchEventSource(url, {
      method: 'POST',
      body: JSON.stringify({ body: query }),
      headers: {
        Accept: 'text/event-stream',
      },
      openWhenHidden: true,
      onopen(res: Response) {
        setDone(false);
        if (res.ok && res.status === 200) {
          setHistory((history: ChatHistory) => {
            return [...history, { origin: 'assistant', text: '', id: answerId }];
          });
        } else if (res.status >= 400 && res.status < 500 && res.status !== 429) {
          addHistoryEntry('system', 'Ett fel inträffade, assistenten gav inget svar.', answerId, []);
        }
        return Promise.resolve();
      },
      onmessage(event: EventSourceMessage) {
        let parsedData: ResponseData;
        try {
          parsedData = JSON.parse(event.data);
        } catch (error) {
          console.error('Error when parsing response as json. Returning.');
          return;
        }

        if (!sessionId) {
          _id = parsedData.session_id;
        }
        (references =
          parsedData.references
            ?.filter((r) => !!r.metadata.url)
            .map((r) => ({
              title: r.metadata.title || r.metadata.url,
              url: r.metadata.url,
            })) || []),
          setHistory((history: ChatHistory) => {
            const newHistory = [...history];
            const index = newHistory.findIndex((chat) => chat.id === answerId);
            newHistory[index] = {
              origin: 'assistant',
              text: history[index]?.text + parsedData.answer,
              id: answerId,
            };
            return newHistory;
          });
      },
      onclose() {
        if (!sessionId) {
          setSessionId(_id);
        }
        setHistory((history: ChatHistory) => {
          const newHistory = [...history];
          const index = newHistory.findIndex((chat) => chat.id === answerId);
          newHistory[index] = {
            origin: history[index]?.origin || 'assistant',
            text: history[index]?.text || '',
            id: answerId,
            references: references?.slice(0, MAX_REFERENCE_COUNT),
          };
          return newHistory;
        });
        setHistory((history: ChatHistory) => {
          return history;
        });
        setDone(true);
      },
      onerror(err: unknown) {
        console.error('There was an error from server', err);
      },
    });
  }, []);

  const sendQuery = (query: string) => {
    // if (!assistantId || !hash) {
    //   addHistoryEntry('system', 'Ett fel inträffade, assistenten gav inget svar.', []);
    //   setDone(true);
    //   return;
    // }
    if (stream) {
      streamQuery(query, sessionId);
    } else {
      setDone(false);
      const answerId = crypto.randomUUID();
      const questionId = crypto.randomUUID();
      addHistoryEntry('user', query, questionId);
      return batchQuery(query, sessionId)
        .then((res: ResponseData) => {
          if (!sessionId) {
            setSessionId(res.session_id);
          }
          addHistoryEntry(
            'assistant',
            res.answer,
            answerId,
            res.references?.slice(0, MAX_REFERENCE_COUNT).map((r) => ({
              title: r.metadata.title,
              url: r.metadata.url,
            })) || []
          );
          setDone(true);
          return res;
        })
        .catch((e) => {
          console.error('Error occured:', e);
          addHistoryEntry('system', 'Ett fel inträffade, assistenten gav inget svar.', answerId, []);
          setDone(true);
        });
    }
  };

  return {
    history,
    addHistoryEntry,
    clearHistory,
    incoming,
    done,
    error,
    sendQuery,
    setSessionId,
  };
}

export default useChat;
