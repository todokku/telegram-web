import { TdLibUpdate, TdLibUpdateAuthorizationState } from '../../../api/tdlib/types';

import { getGlobal, setGlobal } from '../../../lib/teactn';
import { GRAMJS_SESSION_ID_KEY } from '../../../config';

export function onUpdate(update: TdLibUpdate) {
  switch (update['@type']) {
    case 'updateAuthorizationState':
      onUpdateAuthorizationState(update as TdLibUpdateAuthorizationState);
      break;
  }
}

function onUpdateAuthorizationState(update: TdLibUpdateAuthorizationState) {
  setGlobal({
    ...getGlobal(),
    authState: update.authorization_state['@type'],
  });

  switch (update.authorization_state['@type']) {
    case 'authorizationStateLoggingOut':
      setGlobal({
        ...getGlobal(),
        isLoggingOut: true,
      });
      break;
    case 'authorizationStateWaitPhoneNumber':
      break;
    case 'authorizationStateWaitCode':
      break;
    case 'authorizationStateWaitPassword':
      break;
    case 'authorizationStateWaitRegistration':
      break;
    case 'authorizationStateReady': {
      const { sessionId } = update;
      if (sessionId && getGlobal().authRememberMe) {
        localStorage.setItem(GRAMJS_SESSION_ID_KEY, sessionId);
      }

      setGlobal({
        ...getGlobal(),
        isLoggingOut: false,
      });

      break;
    }
    default:
      break;
  }
}
