import useChat from '@hooks/useChat';
import sanitized from '@services/sanitizer-service';
import { Button, cx, Icon, Input, Link, Spinner, FormControl, FormLabel } from '@sk-web-gui/react';
import { useEffect, useRef, useState } from 'react';
import { AssistantAvatar } from './AssistantAvatar';
import { UserAvatar } from './UserAvatar';
import { MarkdownRendered } from './MarkdownRendered';

export const MainComponent = () => {
  const showReferences = true;
  const { history, sendQuery, clearHistory, done } = useChat();
  const [lastMessage, setLastMessage] = useState('');

  const [query, setQuery] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const showHistory = history.length > 0;

  const handleQuerySubmit = (q: string) => {
    if (q.trim() !== '') {
      sendQuery(q);
    }
  };

  useEffect(() => {
    if (done) {
      setQuery('');
      const last = history?.at(-1);
      if (last) {
        const lastText =
          last.origin === 'assistant' || last.origin === 'system'
            ? `${process.env.NEXT_PUBLIC_ASSISTANT_NAME} svarar: ${last?.text}`
            : last?.text;
        setLastMessage(lastText);
      }
    }
  }, [done]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.parentElement.scrollTop = scrollRef.current.offsetTop;
    }
  }, [history]);

  return (
    <>
      <div className={cx(`p-24 mt-sm flex justify-center text-white font-display`)}>
        <div className={cx(`w-full max-w-[600px] flex flex-col items-start self-stretch gap-4 md:gap-8`)}>
          <h1
            className={cx(
              `texzt-white font-normal xs:font-normal sm:font-normal md:font-normal lg:font-normal xl:font-normal text-display-3-sm xs:text-display-3-sm sm:text-display-3-sm md:text-display-2-sm xl:text-display-1-sm`
            )}
          >
            Välkommen till AI-Cura
          </h1>

          <div className="w-full relative">
            <p className="mb-md text-large sm:text-lead leading-10 font-light">
              Ställ din fråga om rutiner eller regler inom vård, omsorg, hälsa, sjukvård.
            </p>
            <div className="h-[4.8rem] flex justify-end">
              <div
                className={cx(
                  `w-full bg-background-content text-primary rounded-12 flex flex-col shadow-lg z-popover`,
                  showHistory ? 'absolute' : 'relative'
                )}
              >
                {showHistory ? (
                  <div>
                    <Button
                      iconButton
                      aria-label="Stäng sökresultat"
                      size="sm"
                      variant="tertiary"
                      onClick={clearHistory}
                      className="absolute right-12 top-12 p-8 rounded-full flex items-center justify-center"
                    >
                      <Icon name={'x'} />
                    </Button>
                    <div className="mt-sm p-16 pb-24 pr-16 max-h-[40rem] overflow-y-scroll flex flex-col" tabIndex={0}>
                      {history
                        .filter((msg) => msg.text !== '')
                        .map((msg, idx) => (
                          <div key={`history-${idx}`} className="mb-24 flex items-start gap-12">
                            <div aria-hidden>
                              {msg.origin === 'assistant' ? (
                                <AssistantAvatar />
                              ) : msg.origin === 'system' ? (
                                <AssistantAvatar />
                              ) : (
                                <UserAvatar />
                              )}
                            </div>
                            <div className="max-w-[85%]">
                              {msg.origin === 'assistant' || msg.origin === 'system' ? (
                                <strong>{process.env.NEXT_PUBLIC_ASSISTANT_NAME}</strong>
                              ) : (
                                <>
                                  <span className="sr-only">Du</span>
                                </>
                              )}
                              <div
                                className={cx(
                                  'break-words',
                                  'max-w-full w-8/9',
                                  msg.origin === 'system' ? `text-error` : null
                                )}
                              >
                                <MarkdownRendered text={sanitized(msg.text)} />
                              </div>
                              {showReferences ? (
                                <>
                                  {msg.references?.length > 0 ? (
                                    <>
                                      <ul aria-label="Referenser">
                                        {msg.references?.map((r, i) => (
                                          <li
                                            className="max-w-full w-4/5 bg-gray-200 p-6 pl-12 my-8 rounded-6 truncate hover:whitespace-normal"
                                            key={`ref-${i}-${idx}`}
                                          >
                                            <small>
                                              <Link external href={r.url}>
                                                {r.title}
                                              </Link>
                                            </small>
                                          </li>
                                        ))}
                                      </ul>
                                    </>
                                  ) : null}
                                </>
                              ) : null}
                            </div>
                          </div>
                        ))}
                      <div aria-live={'polite'} className="sr-only">
                        {lastMessage}
                      </div>
                      <div ref={scrollRef}></div>
                    </div>
                  </div>
                ) : null}
                <div className={cx('flex items-center justify-center', showHistory ? `p-2 border-t` : 'p-0')}>
                  <FormControl id="query" className={cx('w-full gap-12 md:gap-0', showHistory ? `m-8` : 'm-0')}>
                    <FormLabel className="sr-only">
                      {showHistory
                        ? 'Ställ en följdfråga'
                        : `Ställ en fråga till ${process.env.NEXT_PUBLIC_ASSISTANT_NAME}`}
                    </FormLabel>
                    <Input.Group size="lg" className="border-solid border-gray-300">
                      <Input
                        className="w-4/5"
                        type="text"
                        value={query}
                        onKeyDown={(e) => {
                          if (e.code === 'Enter') {
                            handleQuerySubmit(query);
                            setQuery('');
                          }
                        }}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                        placeholder={showHistory ? 'Ställ en följdfråga' : `Fråga något`}
                      />
                      <Input.RightAddin icon className="md:pr-8">
                        {done ? (
                          <>
                            <>
                              <Button
                                className={cx(`hidden md:flex`)}
                                aria-label="Skicka fråga"
                                onClick={() => {
                                  handleQuerySubmit(query);
                                  setQuery('');
                                }}
                                size="sm"
                              >
                                <span>Skicka</span>
                              </Button>
                              <Button
                                iconButton
                                aria-label="Skicka fråga"
                                className="flex md:hidden -mr-10"
                                onClick={() => {
                                  handleQuerySubmit(query);
                                  setQuery('');
                                }}
                                size="sm"
                              >
                                <Icon name={'send-horizontal'} size={20} />
                              </Button>
                            </>
                          </>
                        ) : (
                          <Spinner size={2} />
                        )}
                      </Input.RightAddin>
                    </Input.Group>
                  </FormControl>
                </div>
              </div>
            </div>
            <div className="text-small font-light mt-sm">
              <p className="whitespace-normal">
                Vår AI-assistent drivs av NLP. <Link className="text-white">Läs mer om hur vi använder AI här</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
