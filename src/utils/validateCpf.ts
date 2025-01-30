export const validateCPForCNPJ = (value: string): boolean => {
  const sanitized = value.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos

  if (sanitized.length === 11) {
    return validateCPF(sanitized);
  } else if (sanitized.length === 14) {
    return validateCNPJ(sanitized);
  } else {
    return false; // Nem CPF nem CNPJ
  }
};

// Função para validar CPF
export const validateCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/\D/g, '');

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }

  let remainder = 11 - (sum % 11);
  if (remainder > 9) remainder = 0;
  if (remainder !== parseInt(cpf.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }

  remainder = 11 - (sum % 11);
  if (remainder > 9) remainder = 0;
  
  return remainder === parseInt(cpf.charAt(10));
};

// Função para validar CNPJ
export const validateCNPJ = (cnpj: string): boolean => {
  cnpj = cnpj.replace(/\D/g, '');

  if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;

  const validateDigit = (length: number) => {
    let sum = 0;
    const weights = length === 12 ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2] : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    for (let i = 0; i < weights.length; i++) {
      sum += parseInt(cnpj.charAt(i)) * weights[i];
    }

    let remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  return validateDigit(12) === parseInt(cnpj.charAt(12)) && validateDigit(13) === parseInt(cnpj.charAt(13));
};
