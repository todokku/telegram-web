import React, { FC } from '../../../../lib/teact';

import { ApiChat } from '../../../../api/tdlib/types';
import './Badge.scss';

type IProps = {
  chat: ApiChat;
};

// TODO Support mentions and `is_pinned`.

const Badge: FC<IProps> = ({ chat }) => {
  return (
    chat.unread_count ? (
      <div className="Badge">
        {chat.unread_count}
      </div>
    ) : (
      <div />
    )
  );
};

export default Badge;
