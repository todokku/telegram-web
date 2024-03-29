import { getGlobal, setGlobal } from '../../../lib/teactn';

import { TdLibUpdate, ApiMessage } from '../../../api/tdlib/types';

export function onUpdate(update: TdLibUpdate) {
  switch (update['@type']) {
    case 'updateNewMessage': {
      const { message } = update;

      updateMessage(message.chat_id, message.id, message);

      break;
    }

    case 'updateMessageSendSucceeded': {
      const { message, old_message_id } = update;

      replaceMessage(message.chat_id, old_message_id, message);

      break;
    }

    // case 'updateMessageSendFailed': {
    //   const { message, old_message_id } = update;
    //
    //   updateMessage(message.chat_id, old_message_id, message);
    //
    //   break;
    // }
  }
}

function updateMessage(chatId: number, messageId: number, messageUpdate: Partial<ApiMessage>) {
  const global = getGlobal();

  setGlobal({
    ...global,
    messages: {
      ...global.messages,
      byChatId: {
        ...global.messages.byChatId,
        [chatId]: {
          byId: {
            ...(global.messages.byChatId[chatId] || {}).byId,
            [messageId]: {
              ...((global.messages.byChatId[chatId] || {}).byId || {})[messageId],
              ...messageUpdate,
            },
          },
        },
      },
    },
  });
}

function replaceMessage(chatId: number, oldMessageId: number, message: ApiMessage) {
  const global = getGlobal();

  const newMessageId = message.id;

  const newGlobal = {
    ...global,
    messages: {
      ...global.messages,
      byChatId: {
        ...global.messages.byChatId,
        [chatId]: {
          byId: {
            ...(global.messages.byChatId[chatId] || {}).byId,
            [newMessageId]: message,
          },
        },
      },
    },
  };

  delete newGlobal.messages.byChatId[chatId].byId[oldMessageId];

  setGlobal(newGlobal);
}
