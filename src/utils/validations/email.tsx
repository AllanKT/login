export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const formattedEmail = (value: string): string => {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9@._-]/g, '')
    .replace(/(\.\.+)/g, '.'); // Remove múltiplos pontos seguidos
};
