import { ChangeEvent } from 'react';
import { DispatchMap, GlobalState, withGlobal } from '../../../lib/teactn';

import React, { FC, useState } from '../../../lib/teact';
// import { DispatchMap, GlobalState, withGlobal } from '../../../lib/teactn';

import InputPassword from '../../../components/ui/InputPassword';
import Button from '../../../components/ui/Button';

// @ts-ignore
import monkeyPasswordShown from '../../../assets/monkey_password_shown.png';
// @ts-ignore
import monkeyPasswordHidden from '../../../assets/monkey_password_hidden.png';
import './Auth.scss';

type IProps = Pick<GlobalState, 'authIsLoading' | 'authError'> & Pick<DispatchMap, 'setAuthPassword'>;

// TODO Support `authError`.
const AuthPassword: FC<IProps> = ({ authIsLoading, authError, setAuthPassword }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isButtonShown, setIsButtonShown] = useState(false);

  function onPasswordChange(e: ChangeEvent<HTMLInputElement>) {
    const { target } = e;
    setPassword(target.value);
    setIsButtonShown(target.value.length > 4);
  }

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (authIsLoading) {
      return;
    }

    setAuthPassword({ password });
  }

  return (
    <div id="auth-code-form" className="auth-form">
      <div id="monkey">
        <img src={monkeyPasswordHidden} className={!showPassword ? 'shown' : ''} alt="" />
        <img src={monkeyPasswordShown} className={showPassword ? 'shown' : ''} alt="" />
      </div>
      <h2>Enter a Password</h2>
      <p className="note">
        Your account is protected width
        <br />an additional password.
      </p>
      <form action="" method="post" onSubmit={handleSubmit}>
        <InputPassword
          id="sign-in-password"
          showPassword={showPassword}
          onChange={onPasswordChange}
          onShowToggle={togglePasswordVisibility}
          value={password}
          error={authError}
        />
        {isButtonShown && (
          <Button type="submit" isLoading={authIsLoading}>Next</Button>
        )}
      </form>
    </div>
  );
};

export default withGlobal(
  (global) => {
    const { authIsLoading, authError } = global;
    return { authIsLoading, authError };
  },
  (setGlobal, actions) => {
    const { setAuthPassword } = actions;
    return { setAuthPassword };
  },
)(AuthPassword);
