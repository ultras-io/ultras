export const validateEmail = (email: string) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

export const validatePhoneNumber = (phone: string) => {
  return /^[0-9]{8}$/.test(phone); // @TODO change
};
