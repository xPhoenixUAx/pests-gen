'use client';

import { Emoji, EmojiStyle } from 'emoji-picker-react';

type EmojiIconProps = {
  unified: string;
  label: string;
  size?: number;
  className?: string;
};

export function EmojiIcon({ unified, label, size = 20, className }: EmojiIconProps) {
  const spanClassName = ['inline-flex items-center justify-center leading-none', className]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={spanClassName} role="img" aria-label={label} title={label}>
      <Emoji unified={unified} emojiStyle={EmojiStyle.TWITTER} size={size} />
    </span>
  );
}

