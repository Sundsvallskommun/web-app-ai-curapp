import { Avatar } from '@sk-web-gui/react';

export const AssistantAvatar = () => {
  return (
    <div
      aria-label="Assistent"
      className="w-[32px] h-[32px] bg-vattjom-surface-primary rounded-12 flex items-center justify-center"
    >
      <Avatar size="sm" color="gronsta" aria-label="C" initials="C" />
      {/* <Logo size={28} bgColor="transparent" /> */}
    </div>
  );
};
