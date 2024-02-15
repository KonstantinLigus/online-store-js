export const validatePhone = ({ value, setValue, setState }) => {
  const { length } = value;

  if (length <= 4) value = "+380";

  if (/^\+\d+$/.test(value) && length <= 13) setValue(value);

  if (setState && /^\+380\d{9}$/.test(value)) setState(value);
};
