import * as gramJsApi from '../../lib/gramjs/tl/types';

import { generateRandomBytes, readBigIntFromBuffer } from '../../lib/gramjs/Helpers';

import localDb from './localDb';

export function buildInputPeer(chatOrUserId: number): MTP.Peer {
  if (chatOrUserId > 0) {
    const user = localDb.users[chatOrUserId] as MTP.user;

    return new gramJsApi.InputPeerUser({
      userId: chatOrUserId,
      ...(user && { accessHash: user.accessHash }),
    });
  } else if (chatOrUserId <= -1000000000) {
    const channel = localDb.chats[-chatOrUserId] as MTP.channel;

    return new gramJsApi.InputPeerChannel({
      channelId: -chatOrUserId,
      ...(channel && { accessHash: channel.accessHash }),
    });
  } else {
    return new gramJsApi.InputPeerChat({
      chatId: -chatOrUserId,
    });
  }
}

export function buildInputPeerPhotoFileLocation(
  chatOrUserId: number,
  volumeId: MTP.long,
  localId: number,
): MTPNext.InputPeerPhotoFileLocation {
  const peer = buildInputPeer(chatOrUserId);
  return new gramJsApi.InputPeerPhotoFileLocation({
    peer,
    volumeId,
    localId,
  });
}

export function generateRandomBigInt() {
  return readBigIntFromBuffer(generateRandomBytes(8), false);
}
