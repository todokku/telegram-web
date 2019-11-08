import { TdLibUpdate } from '../../../api/tdlib/updates';

import * as system from './system';
import * as chats from './chats';
import * as messages from './messages';

export default function onUpdate(update: TdLibUpdate) {
  console.log('[TdLib] UPDATE', update['@type'], { update });

  system.onUpdate(update);
  chats.onUpdate(update);
  messages.onUpdate(update);
}