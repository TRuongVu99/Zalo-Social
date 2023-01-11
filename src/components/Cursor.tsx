/* eslint-disable no-undef */
import {useState} from 'react';
import {useInterval} from '../utils/useTimer';

export const DEFAULT_BLINKING_SPEED = 500;
export const DEFAULT_CURSOR_SYMBOL = '|';

function Cursor({
  cursorSymbol = DEFAULT_CURSOR_SYMBOL,
  delay = DEFAULT_BLINKING_SPEED,
}): JSX.Element {
  const [visibleFlag, setFlag] = useState(true);

  useInterval(() => setFlag(flag => !flag), delay);

  // @ts-expect-error `JSX.Element` is not a `ReactNode`
  return visibleFlag ? cursorSymbol : '';
}

export default Cursor;
