export const isValidPassword = (password: string): boolean => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
  return passwordRegex.test(password);
};

export const getPasswordErrors = (password: string): string[] => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Mínimo de 8 caracteres');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Uma letra maiúscula');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Uma letra minúscula');
  }
  if (!/\d/.test(password)) {
    errors.push('Um número');
  }
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
    errors.push('Um caractere especial');
  }

  return errors;
};
