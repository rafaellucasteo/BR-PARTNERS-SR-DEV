module.exports = {
  // Definindo o ambiente de teste como Node.js
  testEnvironment: "node",

  // Usando `ts-jest` como transformador para lidar com arquivos TypeScript
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },

  // Ignorando transformações para `node_modules`, exceto módulos específicos que precisam ser transformados
  transformIgnorePatterns: [
    "node_modules/(?!uuid)", // Exemplo para não ignorar a transformação do pacote `uuid`
  ],

  // Configuração para inicializar arquivos ou definir variáveis antes de executar os testes
  //setupFilesAfterEnv: ["<rootDir>/src/services/mocksjest.setup.js"],

  // Especifica os padrões dos arquivos de teste que serão procurados
  testMatch: [
    "**/__tests__/**/*.test.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)",
  ],

  // Forçar o uso de consistência nos nomes de arquivos
  forceConsistentCasingInFileNames: true,

  // Pular a verificação de conflitos de tipos entre bibliotecas
  skipLibCheck: true,
};
