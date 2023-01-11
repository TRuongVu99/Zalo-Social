export const isValidPassword = (stringPassword: string | any[]) => {
  if (stringPassword.length === 0 || stringPassword.length >= 6) {
    return true;
  }
};

export function isValidEmail(stringEmail: string | any[]) {
  if (
    stringEmail.length === 0 ||
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(stringEmail)
  ) {
    return true;
  }
}

export const isValidPhoneNumber = (phoneNumber: number) => {
  if (phoneNumber.length === 0 || phoneNumber.length > 9) {
    return true;
  }
};
