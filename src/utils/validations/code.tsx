export const isCode = (code: string): boolean => {
  const codeRegex = /^\d{6}$/;
  return codeRegex.test(code);
};

export const formattedCode = (value: string): string => {
  return value.replace(/\D/g, '').slice(0, 6);
};
