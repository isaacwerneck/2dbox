# Requisitos e escopo do MVP

> Estado: `AGUARDANDO APROVAÇÃO`  
> Tipo de entrega: teste privado, não lançamento público.

## Problema a validar

`[DECIDIDO]` O jogo deve reduzir a sensação de solidão e vazio oferecendo conforto, pertencimento comunitário, estímulos positivos, pequenos objetivos e variedade suficiente para quebrar a monotonia.

Ainda precisamos validar com jogadores se a experiência realmente produz essas sensações, em vez de apenas comunicá-las como intenção.

## Público inicial

`[DECIDIDO]`

- Público principal: adultos a partir de 18 anos que procuram socializar e sentir pertencimento.
- Público secundário: jovens adultos com pouco tempo para socializar fora de casa e que procuram um passatempo doméstico.
- Público complementar: adultos atraídos pela nostalgia de mundos sociais online.
- Posicionamento e idade mínima de acesso: `[DECIDIDO]` 18+.
- Método de aferição de idade: `[PENDENTE]`; autodeclaração não será suficiente.
- País/idioma inicial:
- Plataforma prioritária:
- Familiaridade com jogos: `[PENDENTE]`.
- Contexto de uso: `[DECIDIDO]` equilibrar encontros com pessoas novas e convivência com amigos existentes.

Embora o produto seja 18+, privacidade, chat seguro, moderação e prevenção de acesso por menores continuam sendo requisitos para qualquer lançamento público.

## Requisitos de segurança para abertura pública

`[FORA DO MVP PRIVADO, OBRIGATÓRIO ANTES DO PÚBLICO]`

- Implementar aferição confiável de maioridade adequada aos países atendidos.
- Criar regras comunitárias claras e visíveis.
- Oferecer silenciar, bloquear e denunciar.
- Limitar spam, assédio e exposição de dados pessoais.
- Definir moderação, resposta a denúncias e retenção de registros.
- Revisar privacidade e consentimento com orientação jurídica adequada antes do lançamento.
- Testar segurança social com cenários de abuso, não somente o caminho ideal.

## Jornada principal proposta

`[HIPÓTESE]`

```text
Abrir o jogo
  → escolher identidade temporária
  → entrar numa sala
  → encontrar um pequeno objetivo ou acontecimento
  → explorar um cenário vivo
  → perceber outro jogador
  → conversar ou se expressar
  → interagir com algo em conjunto
  → sentir participação e pertencimento
  → sair sabendo que haverá algo diferente para viver depois
```

## Requisitos funcionais candidatos

Cada item precisa ser aprovado, removido ou movido para depois.

| ID | Requisito | Estado | Aceitação mínima |
|---|---|---|---|
| RF-01 | Entrar numa sala compartilhada | `[HIPÓTESE]` | Dois navegadores entram na mesma sala |
| RF-02 | Movimentar avatar numa cena 3D | `[HIPÓTESE]` | Movimento consistente, câmera legível e colisão válida |
| RF-03 | Ver presença de outros jogadores | `[HIPÓTESE]` | Entrada e saída aparecem corretamente |
| RF-04 | Usar nome visível | `[HIPÓTESE]` | Nome validado e exibido junto ao personagem |
| RF-05 | Conversar na sala | `[HIPÓTESE]` | Mensagem curta chega aos presentes |
| RF-06 | Expressar-se sem texto | `[DECISÃO DO MENOR]` | Uma ação de expressão é entendida pelo outro |
| RF-07 | Interagir com elemento do cenário | `[DECISÃO DO MENOR]` | Ação gera feedback compartilhado |
| RF-08 | Manter dados essenciais | `[HIPÓTESE]` | Dados aprovados sobrevivem ao reinício |

`[PENDENTE]` Depois do vertical slice, testar dois fluxos de entrada: chegar junto de um amigo e entrar sozinho procurando convivência. As funcionalidades concretas de convite, amizade e descoberta serão escolhidas somente após esses testes.

## Visão de produto além do MVP

`[VISÃO DO MENOR]`

- Praça central como principal ponto de convivência e distribuição para outros espaços.
- Portais para locais temáticos, incluindo casa individual, restaurante ou espaço semelhante e uma área de jogos de risco/recompensa ainda sujeita a revisão.
- Casas com plantas pré-moldadas colecionáveis e personalização de móveis, superfícies, janelas, iluminação, partículas e música.
- Avatar antropomórfico modular com manequim comum, características animais iniciais e roupas colecionáveis.
- Economia de cosméticos, recursos de cor, criação de itens, trocas, lojas e mercado entre jogadores.
- Coleção com raridades e procedência distinguindo itens oficiais de itens criados pela comunidade.
- Moeda obtida somente dentro do jogo, sem venda por dinheiro real.
- Recompensas diárias e minijogos como fontes candidatas dessa moeda.
- Assinatura mensal separada da moeda, com benefícios propostos como segunda casa, inventário ampliado e destaque visual do nome.
- Cassino usando a mesma moeda universal para apostas, sujeito a controles e revisão.
- Loot boxes como única fonte oficial inicial de novos itens; itens específicos circulam depois por lojas e trocas entre jogadores.
- Doações de moeda entre jogadores, com limites antifraude a definir.

Esses pontos compõem a visão de longo prazo. Não são requisitos do primeiro MVP.

`[BLOQUEIO DE IMPLEMENTAÇÃO]` A direção 18+ foi aprovada, mas loot boxes e apostas só entram depois de aferição de idade, revisão jurídica e controles econômicos aprovados.

`[FORA DO MVP]` Assinatura, cobrança recorrente e benefícios pagos só serão avaliados depois que o núcleo social e a economia gratuita estiverem estáveis.

## Requisitos não funcionais

- O servidor é autoritativo para movimento e dados persistentes.
- Entradas vindas do navegador são tratadas como não confiáveis.
- Consultas SQL usam parâmetros.
- O jogo mostra estados de conexão e erro em linguagem compreensível.
- A interface principal funciona com teclado.
- A cena mantém silhuetas, outline e leitura low-poly consistentes na câmera aprovada.
- O fluxo principal é testável em duas instâncias de navegador.
- Nenhum segredo fica no cliente ou no repositório.

## Fora do MVP privado

- Economia com moeda real.
- Troca entre jogadores.
- Mundo grande ou várias regiões.
- Editor completo de casas.
- Aplicativos nativos.
- Clãs, guildas ou grupos complexos.
- Sistema avançado de missões.
- Marketplace de itens.
- Escala automática e múltiplos servidores.

## Critérios globais de aceite

- [ ] Duas pessoas completam a jornada principal.
- [ ] Recarregar a página não corrompe a sala.
- [ ] Reiniciar o servidor preserva os dados definidos como persistentes.
- [ ] Desconectar remove presença fantasma.
- [ ] Não há erro bloqueador no console ou servidor.
- [ ] Um usuário novo entende os controles e a ação principal.
- [ ] Nome, visual e texto usados na build foram aprovados pelo menor.

## Perguntas que bloqueiam o escopo

1. O MVP será apenas para convidados ou ficará acessível publicamente?
2. A comunicação principal será texto livre, frases prontas, emotes ou uma combinação?
3. Qual é a interação compartilhada mínima que representa a proposta do jogo?
4. Persistiremos apenas personagem e visual ou também itens e posição?

