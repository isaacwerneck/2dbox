# Trilha de aprendizado orientada ao MVP

> Estado: `ATIVA`  
> Método: aprender a próxima peça necessária, aplicá-la no jogo e produzir uma pequena evidência.  
> Evitar: cursos longos antes do primeiro protótipo.

## Bloco 1 — fundamentos da web e ferramentas

### Aprender

- Estrutura básica de HTML e CSS.
- JavaScript: valores, funções, objetos, arrays, módulos, classes e erros.
- Assincronismo: `Promise`, `async` e `await`.
- npm, `package.json` e scripts.
- Git: status, add, commit, branch e diff.
- DevTools: console, rede, elementos e armazenamento.

### Evidência

Uma página Vite abre sem erros, importa um módulo JavaScript e responde a teclado e clique.

## Bloco 2 — fundamentos de jogos 3D

### Aprender

- Loop de atualização e renderização.
- Delta de tempo e passo fixo.
- Vetores, eixos, transformações, velocidade e normalização diagonal.
- Malhas, materiais, texturas, luzes e cena.
- Colisores simples separados da geometria visual.
- Câmera, projeção, campo de visão, oclusão e limites do mundo.
- Noções de polígonos, UV, rig e animação esquelética.

### Evidência

Manequim provisório anda numa sala 3D, colide e permanece legível durante o movimento da câmera.

## Bloco 3 — motor 3D e pipeline de assets

### Aprender

- Ciclo de cena e loop de atualização do motor aprovado.
- Carregamento de modelos, materiais, texturas, animações e JSON.
- Entrada por teclado e ponteiro.
- Animações do rig-base e encaixe de módulos.
- Câmera e resize.
- Organização e convenções de assets.

### Evidência

Uma cena pequena carrega os assets 3D por caminhos previsíveis, mantém o estilo low-poly e funciona no navegador-alvo.

## Bloco 4 — redes e multiplayer

### Aprender

- Cliente, servidor, latência e perda de conexão.
- WebSocket e diferença para HTTP.
- Servidor autoritativo.
- Estado, mensagens, salas e ciclo de conexão do Colyseus.
- Interpolação visual e frequência de atualização.
- Validação de entrada e limites de frequência.

### Evidência

Duas abas compartilham uma sala; alterar o cliente não permite velocidade inválida reconhecida pelo servidor.

## Bloco 5 — SQL e persistência

### Aprender

- Tabelas, tipos, chave primária e chave estrangeira.
- `SELECT`, `INSERT`, `UPDATE` e `DELETE`.
- `JOIN`, índices e restrições.
- Transações e atomicidade.
- Migrations versionadas.
- Consultas parametrizadas e risco de SQL injection.
- Diferenças relevantes entre SQLite e PostgreSQL.

### Evidência

Um script SQL cria o banco do zero; o servidor salva e recupera um personagem sem concatenar entrada do usuário na consulta.

## Bloco 6 — UX de produto social

### Aprender

- Jornada, fluxo, wireframe e protótipo.
- Hierarquia visual, proximidade, alinhamento, repetição e contraste.
- Estados vazio, carregando, erro, desconectado e sucesso.
- Acessibilidade: foco, teclado, contraste e rótulos.
- Segurança social: silenciar, bloquear, denunciar e moderação.

### Evidência

Uma pessoa nova entra, identifica quem é, entende como agir e inicia uma interação sem receber instruções do desenvolvedor.

## Bloco 7 — produção e qualidade

### Aprender

- Logs úteis e diagnóstico de erros.
- Testes de fluxo no navegador.
- Inspeção de screenshot e console.
- Build de produção e variáveis de ambiente.
- Backup, migração e recuperação.
- Medidas básicas de desempenho de navegador e servidor.

### Evidência

Outra pessoa segue o README, inicia cliente e servidor e executa o fluxo principal.

## Ritmo recomendado

Para cada tópico:

1. Estudar por 30–60 minutos.
2. Fazer um exercício isolado pequeno.
3. Aplicar imediatamente no projeto.
4. Registrar o que funcionou e o que ficou confuso.
5. Só então avançar.

