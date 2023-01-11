import {useMemo, useRef} from 'react';
import {GestureResponderEvent, LayoutChangeEvent, Platform} from 'react-native';

interface Layout {
  x: number;
  y: number;
  xEnd: number;
  yEnd: number;
}

interface LayoutsMap {
  [cellIndex: string]: Layout;
}

interface Coords {
  locationX: number;
  locationY: number;
}

const findIndex = ({locationX, locationY}: Coords, map: LayoutsMap): number => {
  for (const [index, {x, y, xEnd, yEnd}] of Object.entries(map)) {
    if (
      x < locationX &&
      locationX < xEnd &&
      y < locationY &&
      locationY < yEnd
    ) {
      return parseInt(index, 10);
    }
  }

  return -1;
};

interface Options {
  setValue(text: string): void;
  value?: string;
}

type HookResult = [
  {onPressOut: (event: GestureResponderEvent) => void},
  (index: number) => (event: LayoutChangeEvent) => void,
];

export const useClearByFocusCell = (options: Options): HookResult => {
  const valueRef = useRef<Options>(options);
  const cellsLayouts = useRef<LayoutsMap>({});

  valueRef.current = options;

  const clearCodeByCoords = (coords: Coords) => {
    const index = findIndex(coords, cellsLayouts.current);

    if (index !== -1) {
      const {value, setValue} = valueRef.current;
      const text = (value || '').slice(0, index);

      setValue(text);
    }
  };

  const getCellOnLayoutHandler =
    (index: number) => (event: LayoutChangeEvent) => {
      const {width, height, x, y} = event.nativeEvent.layout;

      cellsLayouts.current[`${index}`] = {
        x,
        xEnd: x + width,
        y,
        yEnd: y + height,
      };
    };

  const onPressOut = (event: GestureResponderEvent) =>
    clearCodeByCoords(event.nativeEvent);

  return [
    useMemo(() => Platform.select({default: {onPressOut}}), []),
    getCellOnLayoutHandler,
  ];
};
