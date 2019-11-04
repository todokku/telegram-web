import React, { FC } from '../../lib/reactt';
import { GlobalState, withGlobal } from '../../lib/reactnt';

import LeftColumn from './components/left/LeftColumn';
import MiddleColumn from './components/middle/MiddleColumn';
import RightColumn from './components/right/RightColumn';

import './Main.scss';

type IProps = GlobalState;

const Main: FC<IProps> = () => {
  return (
    <div className="Main">
      <LeftColumn />
      <MiddleColumn />
      <RightColumn />
    </div>
  );
};

export default withGlobal(

)(Main);
