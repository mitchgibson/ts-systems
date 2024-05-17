type Control<T> = {
  value: T;
  reset: () => void;
  setToDefault: () => void;
};

type ControlOptions<T> = {
  defaultValue?: T;
  onChange?: (value: T) => void;
};

export type ControlSet = {
  [name: string]: Control<any>;
};

export function makeControl<T>(initialValue: T, options: ControlOptions<T> = {}): Control<T> {
  let value: T = initialValue;
  const defaultValue: T = options.defaultValue || initialValue;

  function reset() {
    value = initialValue;
  }

  function setToDefault() {
    value = defaultValue;
  }

  return {
    get value() {
      return value;
    },
    set value(newValue: T) {
      value = newValue;
      options.onChange?.(value);
    },
    reset,
    setToDefault,
  };
}
