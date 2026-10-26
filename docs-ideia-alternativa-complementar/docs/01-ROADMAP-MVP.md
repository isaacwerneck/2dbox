# Roadmap até o MVP

> Estado: `RASCUNHO PARA APROVAÇÃO`  
> Escopo: MVP privado; não representa um lançamento público.  
> Regra: nenhuma fase começa sem cumprir o critério de saída da anterior.

## Fase 0 — alinhamento do produto

### Resultado esperado

Uma frase de produto, público inicial, fantasia social e limite do MVP aprovados.

### Tarefas

- [ ] Responder à rodada inicial de perguntas criativas.
- [ ] Escrever o pitch em uma frase.
- [ ] Definir a experiência social central.
- [ ] Definir o que o jogador faz nos primeiros 30 segundos.
- [ ] Escolher três pilares e três não objetivos.
- [ ] Aprovar a definição de MVP em [03-REQUISITOS-E-ESCOPO.md](03-REQUISITOS-E-ESCOPO.md).

### Critério de saída

O menor consegue explicar o jogo em menos de 30 segundos sem citar Club Penguin ou Habbo como definição principal.

## Fase 1 — protótipo técnico offline

### Resultado esperado

Um personagem provisório anda em uma sala provisória no navegador.

### Peças encaixadas

- Vite inicia o cliente.
- Um motor 3D aprovado renderiza uma única cena low-poly.
- Uma sala provisória fornece chão, limites, colisões e ponto de entrada.
- Teclado controla movimento no espaço 3D.
- Câmera orbital acompanha o personagem; botão direito controla a rotação e, ao soltar, libera o cursor para o HUD.

### Tarefas

- [ ] Preparar Node.js 24 LTS, npm, Git e VS Code.
- [ ] Criar o cliente Vite com JavaScript ESM.
- [ ] Comparar e aprovar com o menor o motor 3D antes de instalar.
- [ ] Criar uma sala-caixa 3D com assets provisórios.
- [ ] Implementar movimento, colisão, câmera orbital por arrasto e liberação segura do cursor.
- [ ] Expor estado observável para testes automatizados.
- [ ] Testar limites, obstáculos e redimensionamento da janela.

### Critério de saída

O jogador entra, anda em todas as direções e não atravessa as colisões. Não há erro no console.

## Fase 2 — vertical slice multiplayer

### Resultado esperado

Duas abas ou dois computadores compartilham a mesma sala de forma consistente.

### Peças encaixadas

- Colyseus mantém uma sala autoritativa.
- Cliente envia intenção; servidor decide posição válida.
- O cliente 3D interpola visualmente os outros jogadores.
- Entrada, saída e desconexão aparecem corretamente.

### Tarefas

- [ ] Criar servidor Node.js e uma sala Colyseus.
- [ ] Definir mensagens mínimas de entrada e movimento.
- [ ] Validar velocidade e colisão no servidor.
- [ ] Sincronizar criação e remoção de jogadores.
- [ ] Testar latência artificial e desconexão.
- [ ] Registrar métricas simples: conexão, erro e quantidade de jogadores.

### Critério de saída

Duas pessoas se veem, se movimentam e se desconectam sem personagens duplicados, teletransporte indevido ou autoridade do cliente.

## Fase 3 — núcleo social

### Resultado esperado

Existe um motivo mínimo para estar junto, além de caminhar.

### Tarefas

- [ ] Escolher com o menor uma interação social principal.
- [ ] Implementar nome visível temporário.
- [ ] Implementar chat de sala com limite de tamanho e frequência.
- [ ] Implementar uma expressão não verbal: emote, gesto ou reação.
- [ ] Implementar um objeto ou ponto de interesse compartilhado.
- [ ] Projetar estados vazio, conectando, reconectando e erro.
- [ ] Fazer teste com pelo menos duas pessoas sem instruções verbais.

### Critério de saída

Os jogadores conseguem perceber presença, iniciar uma interação e entender a resposta do outro.

## Fase 4 — identidade e apresentação

### Resultado esperado

O protótipo deixa de parecer uma demonstração genérica, sem exigir arte final completa.

### Tarefas

- [x] Aprovar a direção visual geral em [06-DIRECAO-ARTISTICA.md](06-DIRECAO-ARTISTICA.md).
- [ ] Aprovar câmera, escala e pipeline 3D.
- [ ] Aprovar arquitetura de HUD em [07-UI-UX-E-HUD.md](07-UI-UX-E-HUD.md).
- [ ] Aprovar linguagem do universo e taxonomia.
- [ ] Criar o manequim-base, uma sala low-poly e um conjunto mínimo de módulos e móveis.
- [ ] Criar wireframes antes de programar telas maiores.
- [ ] Validar silhueta, outline, contraste, escala 3D e legibilidade na câmera real.

### Critério de saída

Uma captura de tela comunica o tom escolhido, o personagem se destaca do cenário e as ações principais são encontradas sem explicação.

## Fase 5 — persistência local

### Resultado esperado

Dados essenciais sobrevivem ao reinício do servidor.

### Tarefas

- [ ] Aprovar o modelo em [05-DADOS-E-BANCO.md](05-DADOS-E-BANCO.md).
- [ ] Criar SQLite local e migrations em SQL puro.
- [ ] Persistir somente identidade técnica, personagem e inventário mínimo aprovados.
- [ ] Usar transação para alterações que envolvam mais de uma tabela.
- [ ] Validar entradas no servidor e parametrizar consultas.
- [ ] Criar um procedimento de recriação do banco para desenvolvimento.
- [ ] Testar reinício, duplicidade e falha no meio de uma operação.

### Critério de saída

O servidor reinicia sem perder os dados cobertos pelo MVP e sem duplicar registros.

## Fase 6 — teste fechado e corte do MVP

### Resultado esperado

Uma build privada reproduzível e aprovada pelos critérios de aceitação.

### Tarefas

- [ ] Executar todos os cenários de aceitação.
- [ ] Convidar pequeno grupo de teste.
- [ ] Observar primeiro acesso, encontro e comunicação.
- [ ] Corrigir apenas bloqueadores, perdas de dados e problemas graves de compreensão.
- [ ] Registrar itens desejáveis em backlog, sem aumentar o MVP.
- [ ] Congelar versões e instruções de execução.

### Critério de saída

Duas pessoas novas completam o fluxo principal, o servidor mantém consistência e não há erro bloqueador conhecido.

## Depois do MVP, não antes

- Autenticação adequada para público externo.
- Moderação, denúncias, bloqueios e proteção de menores.
- Amigos, grupos e mensagens privadas.
- Loja, moeda, troca e economia.
- Casas ou salas personalizadas completas.
- Redis, múltiplas instâncias e infraestrutura de escala.
- PostgreSQL hospedado e migração dos dados.
- Aplicativo móvel, suporte amplo a toque e localização.
- Assinatura mensal e qualquer benefício pago.

## Sequência das expansões econômicas

Esta ordem reduz perda de dados, fraude e retrabalho. Cada sistema depende do anterior estar confiável.

1. Praça central e portais provisórios.
2. Casa individual com posicionamento de poucos móveis.
3. Catálogo fixo e compra direta com moeda de teste.
4. Inventário e registro imutável de transações.
5. Personalização visual com recursos obtidos de forma não aleatória.
6. Editor de cosméticos com publicação privada de teste.
7. Moderação, autoria e proveniência dos itens criados.
8. Troca direta com confirmação e histórico.
9. Mercado entre jogadores e lojas, depois de simular inflação e fraude.
10. Mecânicas aleatórias e de aposta somente depois da implementação da barreira 18+, revisão jurídica, classificação e controles de jogo responsável.

`[DECIDIDO]` A direção do produto mudou para 18+. Cassino e loot boxes continuam fora do MVP técnico inicial porque dependem de identidade, razão contábil, segurança econômica e conformidade. Consulte [14-SEGURANCA-E-CONFORMIDADE.md](14-SEGURANCA-E-CONFORMIDADE.md).

