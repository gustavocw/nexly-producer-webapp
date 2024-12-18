export const applyCpfMask = (value?: string) => {
  if (!value) return "";
  return value
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};

export const applyPhoneMask = (value?: string) => {
  if (!value) return "";
  return value
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{4})\d+?$/, "$1");
};

export const applyCepMask = (value: string) => {
  return value
    .replace(/\D/g, "")
    .slice(0, 8)
    .replace(/(\d{5})(\d)/, "$1-$2");
};

export const applyDateMask = (value: string) => {
  return value
    .replace(/\D/g, "")
    .slice(0, 8)
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})(\d)/, "$1/$2");
};

export const applyBankAccountMask = (value: string) => {
  return value
    .replace(/\D/g, "")
    .slice(0, 10)
    .replace(/(\d{4})(\d)/, "$1-$2");
};

export const applyAgencyMask = (value: string) => {
  return value
    .replace(/\D/g, "")
    .slice(0, 4)
    .replace(/(\d{4})(\d)/, "$1-$2");
};

export const masks: Record<string, (value: string) => string> = {
  cpf: applyCpfMask,
  phone: applyPhoneMask,
  cep: applyCepMask,
  date: applyDateMask,
  bankAccount: applyBankAccountMask,
  agency: applyAgencyMask,
};