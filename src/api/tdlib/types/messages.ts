import { ApiFile } from './files';

export interface ApiPhotoSize {
  '@type': 'photoSize';
  photo: ApiFile;
  type: string;
  width: number;
  height: number;
}

export interface ApiPhoto {
  '@type': 'photo';
  has_stickers: boolean;
  minithumbnail: {
    '@type': 'minithumbnail';
    data: string;
    height: number;
    width: number;
  };
  sizes: ApiPhotoSize[];
}

export interface ApiSticker {
  '@type': 'sticker';
  emoji: string;
  width: number;
  height: number;
  is_animated: boolean;
  sticker: ApiPhotoSize;
  thumbnail: ApiPhotoSize;
}

export interface ApiMessage {
  id: number;
  chat_id: number;
  content: {
    '@type': string;
    text?: {
      text: string;
    };
    photo?: ApiPhoto;
    caption?: {
      '@type': 'formattedText';
      text: string;
    };
    sticker?: ApiSticker;
  };
  date: number;
  is_outgoing: boolean;
  sender_user_id: number;
  reply_to_message_id: number;
  sending_state?: {
    '@type': 'messageSendingStateFailed';
  };
  views: number;
}
