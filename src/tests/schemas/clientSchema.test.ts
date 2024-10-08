import { clientSchema } from "../../schemas/clientSchema";

describe("Validação do Schema do Cliente", () => {
  it("deve validar um cliente PF válido", () => {
    const validPF = {
      type: "PF",
      clientName: "João Silva",
      document: "78083793019",
      email: "joao.silva@email.com",
      phone: "(11) 91234-5678",
    };
    expect(() => clientSchema.parse(validPF)).not.toThrow();
  });

  it("deve validar um cliente PJ válido", () => {
    const validPJ = {
      type: "PJ",
      fantasyName: "Empresa X",
      businessName: "Empresa X LTDA",
      document: "56136811000179",
      email: "contato@empresax.com",
      phone: "(21) 91234-5678",
    };
    expect(() => clientSchema.parse(validPJ)).not.toThrow();
  });

  it("deve falhar na validação por ausência de clientName em PF", () => {
    const invalidPF = {
      type: "PF",
      document: "12345678901",
      email: "joao.silva@email.com",
      phone: "(11) 91234-5678",
    };
    expect(() => clientSchema.parse(invalidPF)).toThrow(
      "Nome é obrigatório para PF"
    );
  });

  it("deve falhar na validação por ausência de fantasyName em PJ", () => {
    const invalidPJ = {
      type: "PJ",
      businessName: "Empresa X LTDA",
      document: "12345678000199",
      email: "contato@empresax.com",
      phone: "(21) 91234-5678",
    };
    expect(() => clientSchema.parse(invalidPJ)).toThrow(
      "Nome Fantasia é obrigatório para PJ"
    );
  });

  it("deve falhar na validação por ausência de businessName em PJ", () => {
    const invalidPJ = {
      type: "PJ",
      fantasyName: "Empresa X",
      document: "12345678000199",
      email: "contato@empresax.com",
      phone: "(21) 91234-5678",
    };
    expect(() => clientSchema.parse(invalidPJ)).toThrow(
      "Razão Social é obrigatória para PJ"
    );
  });

  it("deve falhar na validação por formato inválido de telefone", () => {
    const invalidPJ = {
      type: "PJ",
      fantasyName: "Empresa X",
      businessName: "Empresa X LTDA",
      document: "12345678000199",
      email: "contato@empresax.com",
      phone: "(11) 12345-6789",
    };
    expect(() => clientSchema.parse(invalidPJ)).toThrow("Telefone inválido");
  });

  it("deve falhar na validação por formato inválido de email", () => {
    const invalidPJ = {
      type: "PJ",
      fantasyName: "Empresa X",
      businessName: "Empresa X LTDA",
      document: "12345678000199",
      email: "contato-empresax.com",
      phone: "(21) 91234-5678",
    };
    expect(() => clientSchema.parse(invalidPJ)).toThrow("Email inválido");
  });
});
