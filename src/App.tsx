import React, { FC } from './lib/reactt';
import { DispatchMap, GlobalState, withGlobal } from './lib/reactnt';

import './modules';

import Loading from './pages/Loading';
import Auth from './pages/auth/Auth';
import Main from './pages/main/Main';

type IProps = Pick<GlobalState, 'isInitialized' | 'authState'> & Pick<DispatchMap, 'init'>

const App: FC<IProps> = ({ isInitialized, authState, init }: IProps) => {
  if (!isInitialized) {
    init();
  }

  if (authState) {
    switch (authState) {
      case 'authorizationStateWaitCode':
      case 'authorizationStateWaitPassword':
      case 'authorizationStateWaitPhoneNumber':
        return <Auth />;
      case 'authorizationStateClosed':
      case 'authorizationStateClosing':
      case 'authorizationStateLoggingOut':
      case 'authorizationStateReady':
        return <Main />;
    }
  }

  return <Loading />;
};

export default withGlobal(
  global => {
    const { isInitialized, authState } = global;
    return { isInitialized, authState };
  },
  (setGlobal, actions) => {
    const { init } = actions;
    return { init };
  },
)(App);
