import { clientSchema } from "../../schemas/clientSchema";

describe("Validação do Schema do Cliente", () => {
  it("deve validar um cliente PF válido", () => {
    const validPF = {
      type: "PF",
      clientName: "João Silva",
      document: "03691554083",
      email: "joao.silva@email.com",
      phone: "11912345678",
    };
    expect(() => clientSchema.parse(validPF)).not.toThrow();
  });

  it("deve validar um cliente PJ válido", () => {
    const validPJ = {
      type: "PJ",
      fantasyName: "Empresa X",
      businessName: "Empresa X LTDA",
      document: "33201955000166",
      email: "contato@empresax.com",
      phone: "21912345678",
    };
    expect(() => clientSchema.parse(validPJ)).not.toThrow();
  });

  it("deve falhar na validação por ausência de clientName em PF", () => {
    const invalidPF = {
      type: "PF",
      document: "03691554083",
      email: "joao.silva@email.com",
      phone: "11912345678",
    };
    expect(() => clientSchema.parse(invalidPF)).toThrow(
      "Nome é obrigatório para PF"
    );
  });

  it("deve falhar na validação por ausência de fantasyName em PJ", () => {
    const invalidPJ = {
      type: "PJ",
      businessName: "Empresa X LTDA",
      document: "33201955000166",
      email: "contato@empresax.com",
      phone: "21999345678",
    };
    expect(() => clientSchema.parse(invalidPJ)).toThrow(
      "Nome Fantasia é obrigatório para PJ"
    );
  });

  it("deve falhar na validação por ausência de businessName em PJ", () => {
    const invalidPJ = {
      type: "PJ",
      fantasyName: "Empresa X",
      document: "33201955000166",
      email: "contato@empresax.com",
      phone: "21912345678",
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
      document: "33201955000166",
      email: "contato@empresax.com",
      phone: "11123456789",
    };
    expect(() => clientSchema.parse(invalidPJ)).toThrow("Telefone inválido");
  });

  it("deve falhar na validação por formato inválido de email", () => {
    const invalidPJ = {
      type: "PJ",
      fantasyName: "Empresa X",
      businessName: "Empresa X LTDA",
      document: "33201955000166",
      email: "contato-empresax.com",
      phone: "21912345678",
    };
    expect(() => clientSchema.parse(invalidPJ)).toThrow("Email inválido");
  });
});
