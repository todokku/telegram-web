import { ChangeEvent } from 'react';

import React, { FC, useState, VirtualElementComponent } from '../../../lib/reactt';
import { DispatchMap, GlobalState, withGlobal } from '../../../lib/reactnt';

import Button from '../../../components/ui/Button';
import InputText from '../../../components/ui/InputText';

import './AuthCode.scss';

type IProps = Pick<GlobalState, 'authPhoneNumber'> & Pick<DispatchMap, 'setAuthCode'>;

const AuthPhoneNumber: FC<IProps> = ({ authPhoneNumber, setAuthCode }: IProps): VirtualElementComponent => {
  const [isButtonShown, setIsButtonShown] = useState(false);

  function onCodeChange(e: ChangeEvent<HTMLInputElement>) {
    const target = e.target;

    target.value = target.value.replace(/[^\d]+/, '');

    setIsButtonShown(target.value.length === 5);
  }

  function handleSubmit() {
    const codeInput = document.getElementById('sign-in-code') as HTMLInputElement;
    const code = codeInput.value;
    setAuthCode({ code });
  }

  return (
    <div id="auth-code-form">
      <div id="monkey" />
      <h2>{authPhoneNumber}</h2>
      <div className="note">
        We have sent you an SMS
        <br />with the code.
      </div>
      <div>
        <InputText id="sign-in-code" placeholder="Code" onChange={onCodeChange} />
      </div>
      <div>
        {isButtonShown && (
          <Button onClick={handleSubmit}>NEXT</Button>
        )}
      </div>
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
