import { Client } from "../../types/client";
import {
  filterClientData,
  isValidCnpj,
  isValidCpf,
  isValidEmail,
  isValidPhone,
  sanitize,
} from "../../utils/validation";

describe("Validation Tests", () => {
  describe("isValidCnpj", () => {
    it("should return false for an empty CNPJ", () => {
      expect(isValidCnpj("")).toBe(false);
    });

    it("should return false for an invalid CNPJ length", () => {
      expect(isValidCnpj("1234567890123")).toBe(false);
      expect(isValidCnpj("12.345.678/0001-9")).toBe(false);
    });

    it("should return false for a CNPJ with only non-digit characters", () => {
      expect(isValidCnpj(".../.../")).toBe(false);
    });

    it("should return false for a CNPJ with repeated digits", () => {
      expect(isValidCnpj("11111111111111")).toBe(false);
      expect(isValidCnpj("00000000000000")).toBe(false);
    });

    it("should return false for a CNPJ with invalid check digits", () => {
      expect(isValidCnpj("12.345.678/0001-90")).toBe(false);
    });

    it("should return true for a valid CNPJ", () => {
      expect(isValidCnpj("12.345.678/0001-95")).toBe(true);
    });
  });

  describe("isValidCpf", () => {
    it("should return false for an empty CPF", () => {
      expect(isValidCpf("")).toBe(false);
    });

    it("should return false for an invalid CPF length", () => {
      expect(isValidCpf("1234567890")).toBe(false);
      expect(isValidCpf("123.456.789-0")).toBe(false);
    });

    it("should return false for a CPF with only non-digit characters", () => {
      expect(isValidCpf("...")).toBe(false);
    });

    it("should return false for a CPF with repeated digits", () => {
      expect(isValidCpf("11111111111")).toBe(false);
      expect(isValidCpf("00000000000")).toBe(false);
    });

    it("should return false for a CPF with invalid check digits", () => {
      expect(isValidCpf("123.456.789-08")).toBe(false);
    });

    it("should return true for a valid CPF", () => {
      expect(isValidCpf("123.456.789-09")).toBe(true);
    });
  });

  describe("isValidPhone", () => {
    it("should return false for an empty phone", () => {
      expect(isValidPhone("")).toBe(false);
    });

    it("should return false for an invalid phone length", () => {
      expect(isValidPhone("123456789")).toBe(false);
    });

    it("should return false for a phone number with only non-digit characters", () => {
      expect(isValidPhone("...")).toBe(false);
    });

    it("should return false for an invalid DDD", () => {
      expect(isValidPhone("(00) 99123-4567")).toBe(false);
    });

    it("should return false for a phone number that does not match the regex", () => {
      expect(isValidPhone("(11) 89123-4567")).toBe(false);
    });

    it("should return true for a valid phone number", () => {
      expect(isValidPhone("11991234567")).toBe(true);
    });
  });

  describe("isValidEmail", () => {
    it("should return false for an email without '@'", () => {
      expect(isValidEmail("invalidemail.com")).toBe(false);
    });

    it("should return false for an email without domain", () => {
      expect(isValidEmail("test@")).toBe(false);
    });

    it("should return false for an email with spaces", () => {
      expect(isValidEmail("test @example.com")).toBe(false);
    });

    it("should return true for a valid email", () => {
      expect(isValidEmail("test@example.com")).toBe(true);
    });
  });

  describe("filterClientData", () => {
    it("should filter out 'fantasyName' and 'businessName' for a PF client", () => {
      const client: Partial<Client> = {
        type: "PF",
        clientName: "John Doe",
        fantasyName: "Doe Corp",
        businessName: "John Doe Enterprises",
      };

      const filteredClient = filterClientData(client);
      expect(filteredClient.fantasyName).toBeUndefined();
      expect(filteredClient.businessName).toBeUndefined();
      expect(filteredClient.clientName).toBe("John Doe");
    });

    it("should filter out 'clientName' for a PJ client", () => {
      const client: Partial<Client> = {
        type: "PJ",
        clientName: "John Doe",
        fantasyName: "Doe Corp",
        businessName: "John Doe Enterprises",
      };

      const filteredClient = filterClientData(client);
      expect(filteredClient.clientName).toBeUndefined();
      expect(filteredClient.fantasyName).toBe("Doe Corp");
      expect(filteredClient.businessName).toBe("John Doe Enterprises");
    });
  });

  describe("sanitize", () => {
    it("should remove all non-digit characters", () => {
      expect(sanitize("(11) 99123-4567")).toBe("11991234567");
    });

    it("should return the input unchanged if it contains only digits", () => {
      expect(sanitize("123456")).toBe("123456");
    });

    it("should return an empty string if input contains no digits", () => {
      expect(sanitize("abcd")).toBe("");
    });
  });
});
