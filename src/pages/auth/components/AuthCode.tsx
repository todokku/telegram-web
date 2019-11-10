import { ChangeEvent } from 'react';

import React, { FC, useState } from '../../../lib/teact';
import { DispatchMap, GlobalState, withGlobal } from '../../../lib/teactn';

import Button from '../../../components/ui/Button';
import InputText from '../../../components/ui/InputText';

import './Auth.scss';

type IProps = Pick<GlobalState, 'authPhoneNumber'> & Pick<DispatchMap, 'setAuthCode'>;

const AuthPhoneNumber: FC<IProps> = ({ authPhoneNumber, setAuthCode }) => {
  const [isButtonShown, setIsButtonShown] = useState(false);
  const [code, setCode] = useState(undefined);

  function onCodeChange(e: ChangeEvent<HTMLInputElement>) {
    const { target } = e;

    target.value = target.value.replace(/[^\d]+/, '');

    setCode(target.value);
    setIsButtonShown(target.value.length === 5);
  }

  function handleSubmit() {
    setAuthCode({ code });
  }

  return (
    <div id="auth-code-form" className="auth-form">
      <div id="monkey" />
      <h2>{authPhoneNumber}</h2>
      <p className="note">
        We have sent you an SMS
        <br />with the code.
      </p>
      <InputText
        id="sign-in-code"
        label="Code"
        onChange={onCodeChange}
        value={code}
      />
      {isButtonShown && (
        <Button onClick={handleSubmit}>NEXT</Button>
      )}
    </div>
  );
};

export default withGlobal(
  global => {
    const { authPhoneNumber } = global;
    return { authPhoneNumber };
  },
  (setGlobal, actions) => {
    const { setAuthCode } = actions;
    return { setAuthCode };
  },
)(AuthPhoneNumber);
