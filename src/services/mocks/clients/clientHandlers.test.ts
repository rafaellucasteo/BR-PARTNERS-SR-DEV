import { server } from "../../mocks/server";

describe("Client Handlers", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  let pfClientId: string;
  let pjClientId: string;

  it("deve criar um novo cliente PF - POST /clients", async () => {
    const newClient = {
      type: "PF",
      clientName: "Novo Cliente PF",
      document: "12345678909",
      email: "pf@cliente.com",
      phone: "(11) 91234-5678",
    };

    const response = await fetch("http://localhost/clients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newClient),
    });

    const createdClient = await response.json();

    expect(response.status).toBe(201);
    expect(createdClient).toHaveProperty("id");
    expect(createdClient.clientName).toBe(newClient.clientName);
    expect(createdClient.email).toBe(newClient.email);

    pfClientId = createdClient.id;
  });

  it("deve criar um novo cliente PJ com dados válidos - POST /clients", async () => {
    const newClient = {
      type: "PJ",
      fantasyName: "Empresa Fantasia",
      businessName: "Empresa Ltda",
      document: "07038783000141",
      email: "pj@empresa.com",
      phone: "(11) 91234-5678",
    };

    const response = await fetch("http://localhost/clients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newClient),
    });

    const createdClient = await response.json();

    expect(response.status).toBe(201);
    expect(createdClient).toHaveProperty("id");
    expect(createdClient.fantasyName).toBe(newClient.fantasyName);
    expect(createdClient.email).toBe(newClient.email);

    pjClientId = createdClient.id;
  });

  it("deve falhar ao criar um cliente com dados inválidos - POST /clients", async () => {
    const invalidClient = {
      type: "PF",
      clientName: "",
      document: "123",
      email: "email_invalido",
      phone: "telefone_invalido",
    };

    const response = await fetch("http://localhost/clients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invalidClient),
    });

    expect(response.status).toBe(400);
    const responseData = await response.json();
    expect(responseData.errors).toContainEqual(
      expect.objectContaining({ path: ["document"], message: "CPF inválido" })
    );
    expect(responseData.errors).toContainEqual(
      expect.objectContaining({ path: ["email"], message: "Email inválido" })
    );
  });

  it("deve buscar o cliente PF - GET /clients/:id", async () => {
    const response = await fetch(`http://localhost/clients/${pfClientId}`);
    const client = await response.json();

    expect(response.status).toBe(200);
    expect(client.id).toBe(pfClientId);
    expect(client.type).toBe("PF");
  });

  it("deve buscar o cliente PJ - GET /clients/:id", async () => {
    const response = await fetch(`http://localhost/clients/${pjClientId}`);
    const client = await response.json();

    expect(response.status).toBe(200);
    expect(client.id).toBe(pjClientId);
    expect(client.type).toBe("PJ");
  });

  it("deve falhar ao buscar um cliente inexistente - GET /clients/:id", async () => {
    const response = await fetch("http://localhost/clients/inexistente");

    expect(response.status).toBe(404);
  });

  it("deve listar todos os clientes - GET /clients", async () => {
    const response = await fetch("http://localhost/clients");
    const clients = await response.json();

    expect(response.status).toBe(200);
    expect(Array.isArray(clients)).toBe(true);
    expect(clients.length).toBeGreaterThan(0);
  });

  it("deve atualizar o cliente PF - PUT /clients/:id", async () => {
    const updatedData = { clientName: "Cliente PF Atualizado" };

    const response = await fetch(`http://localhost/clients/${pfClientId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    const updatedClient = await response.json();

    expect(response.status).toBe(200);
    expect(updatedClient.clientName).toBe(updatedData.clientName);
  });

  it("deve atualizar o cliente PJ - PUT /clients/:id", async () => {
    const updatedData = { fantasyName: "Empresa Fantasia Atualizada" };

    const response = await fetch(`http://localhost/clients/${pjClientId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    const updatedClient = await response.json();

    expect(response.status).toBe(200);
    expect(updatedClient.fantasyName).toBe(updatedData.fantasyName);
  });

  it("deve falhar ao atualizar um cliente com dados inválidos - PUT /clients/:id", async () => {
    const updatedData = { email: "email_invalido" };

    const response = await fetch(`http://localhost/clients/${pfClientId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    expect(response.status).toBe(400);
    const responseData = await response.json();
    expect(responseData.errors).toContainEqual(
      expect.objectContaining({ path: ["email"], message: "Email inválido" })
    );
  });

  it("deve deletar o cliente PF - DELETE /clients/:id", async () => {
    const response = await fetch(`http://localhost/clients/${pfClientId}`, {
      method: "DELETE",
    });

    expect(response.status).toBe(200);
  });

  it("deve deletar o cliente PJ - DELETE /clients/:id", async () => {
    const response = await fetch(`http://localhost/clients/${pjClientId}`, {
      method: "DELETE",
    });

    expect(response.status).toBe(200);
  });
});
