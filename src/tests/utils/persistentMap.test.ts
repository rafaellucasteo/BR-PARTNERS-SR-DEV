/**
 * @jest-environment jsdom
 */

import { PersistentMap } from "../../utils/persistentMap";

describe("PersistentMap - Testes Negativos", () => {
  beforeEach(() => {
    Object.defineProperty(window, "sessionStorage", {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
      },
      writable: true,
    });
    jest.spyOn(console, "error").mockImplementation((...args) => {
      if (process.env.SHOW_LOGS === "true") {
        console.error(...args);
      }
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("não deve salvar dados incorretos no sessionStorage", () => {
    const map = new PersistentMap<string, string>("testKey");
    map.set("key1", "value1");

    expect(sessionStorage.setItem).not.toHaveBeenCalledWith(
      "testKey",
      JSON.stringify(["wrongKey", "wrongValue"])
    );
  });

  it("deve lidar com JSON malformado graciosamente sem lançar erro", () => {
    sessionStorage.getItem = jest.fn().mockReturnValue("malformed JSON");

    const map = new PersistentMap<string, string>("testKey");

    expect(() => map.get("key1")).not.toThrow();
    expect(map.get("key1")).toBeUndefined();
  });

  it("não deve excluir uma chave que não existe", () => {
    const map = new PersistentMap<string, string>("testKey");
    const result = map.delete("nonExistentKey");

    expect(result).toBe(false);
    expect(sessionStorage.setItem).not.toHaveBeenCalled();
  });

  it("deve limpar o sessionStorage se o mapa estiver vazio", () => {
    const map = new PersistentMap<string, string>("testKey");
    map.clear();

    expect(sessionStorage.removeItem).toHaveBeenCalledWith("testKey");
  });

  it("deve atualizar o sessionStorage se set for chamado com valores diferentes", () => {
    const map = new PersistentMap<string, string>("testKey");
    map.set("key1", "value1");
    map.set("key1", "value2");

    expect(sessionStorage.setItem).toHaveBeenCalledTimes(2);
  });
});
