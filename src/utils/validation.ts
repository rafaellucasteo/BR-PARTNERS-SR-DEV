import { Client } from "../types/client";

export function isValidCnpj(cnpj: string): boolean {
  if (cnpj == "") return false;

  if (cnpj.length != 18 && cnpj.length != 14) return false;

  cnpj = sanitize(cnpj);

  if (cnpj == "") return false;

  if (cnpj.length != 14) return false;

  if (
    cnpj == "00000000000000" ||
    cnpj == "11111111111111" ||
    cnpj == "22222222222222" ||
    cnpj == "33333333333333" ||
    cnpj == "44444444444444" ||
    cnpj == "55555555555555" ||
    cnpj == "66666666666666" ||
    cnpj == "77777777777777" ||
    cnpj == "88888888888888" ||
    cnpj == "99999999999999"
  )
    return false;

  let tamanho: number = cnpj.length - 2;
  let numeros: string = cnpj.substring(0, tamanho);
  let digitos: string = cnpj.substring(tamanho);
  let soma: number = 0;
  let pos: number = tamanho - 7;
  for (let i: number = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  let resultado: number = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != parseInt(digitos.charAt(0))) return false;

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i: number = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != parseInt(digitos.charAt(1))) return false;

  return true;
}

export function isValidCpf(cpf: string): boolean {
  if (cpf == "") return false;

  if (cpf.length != 14 && cpf.length != 11) return false;

  const value = sanitize(cpf);

  if (value == "") return false;

  if (value.length != 11) return false;

  let sum: number = 0;
  let rest: number;
  let i: number;
  if (
    value == "00000000000" ||
    value == "11111111111" ||
    value == "22222222222" ||
    value == "33333333333" ||
    value == "44444444444" ||
    value == "55555555555" ||
    value == "66666666666" ||
    value == "77777777777" ||
    value == "88888888888" ||
    value == "99999999999"
  )
    return false;

  for (i = 1; i <= 9; i++)
    sum = sum + parseInt(value.substring(i - 1, i)) * (11 - i);
  rest = (sum * 10) % 11;

  if (rest == 10 || rest == 11) rest = 0;
  if (rest != parseInt(value.substring(9, 10))) return false;

  sum = 0;
  for (i = 1; i <= 10; i++)
    sum = sum + parseInt(value.substring(i - 1, i)) * (12 - i);
  rest = (sum * 10) % 11;

  if (rest == 10 || rest == 11) rest = 0;
  if (rest != parseInt(value.substring(10, 11))) return false;
  return true;
}

export function isValidPhone(phone: string): boolean {
  const validDDDs = [
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "21",
    "22",
    "24",
    "27",
    "28",
    "31",
    "32",
    "33",
    "34",
    "35",
    "37",
    "38",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
    "48",
    "49",
    "51",
    "53",
    "54",
    "55",
    "61",
    "62",
    "64",
    "65",
    "66",
    "67",
    "68",
    "69",
    "71",
    "73",
    "74",
    "75",
    "77",
    "79",
    "81",
    "82",
    "83",
    "84",
    "85",
    "86",
    "87",
    "88",
    "89",
    "91",
    "92",
    "93",
    "94",
    "95",
    "96",
    "97",
    "98",
    "99",
  ];

  if (phone == "") return false;

  if (phone.length != 16 && phone.length != 11) return false;

  const cleanedPhone = sanitize(phone);

  if (cleanedPhone == "") return false;

  if (cleanedPhone.length != 11) return false;

  const phoneRegex = /^(\d{2})9\d{8}$/;

  const match = cleanedPhone.match(phoneRegex);

  if (!match) return false;

  const ddd = match[1];
  return validDDDs.includes(ddd);
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
export function filterClientData(data: Client): Client {
  const filteredData = { ...data };

  if (data.type === "PF") {
    delete filteredData.fantasyName;
    delete filteredData.businessName;
  } else if (data.type === "PJ") {
    delete filteredData.clientName;
  }

  return filteredData;
}

export function sanitize(input: string): string {
  return input.replace(/\D/g, "");
}
