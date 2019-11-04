import { ChangeEvent } from 'react';
import React, { FC, JsxChildren } from '../../lib/reactt';

import './Select.scss';

interface IProps {
  id?: string,
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void,
  name?: string,
  children: JsxChildren,
}

const Select: FC<IProps> = ({ onChange, id, name, children }: IProps) => {
  return (
    <select className='Select' id={id} name={name} onChange={onChange}>
      {children}
    </select>
  );
};

export default Select;
