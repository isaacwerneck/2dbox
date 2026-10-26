# Avatar modular e linguagem sonora

> Estado: `FORMA-BASE E MODULARIDADE DECIDIDAS; DESIGN DAS PEÇAS E VOZ PENDENTES`

## Conceito do avatar

`[DECIDIDO]` O jogador controla uma criatura antropomórfica pequena, cabeçuda e low-poly. A identidade surge da combinação de partes animais modulares e roupas, não de espécies rígidas e fechadas.

Todos começam pelo mesmo manequim neutro. Isso cria três vantagens:

- qualquer jogador pode misturar características sem trocar de corpo;
- roupas compartilham encaixes e animações;
- a silhueta geral permanece reconhecível em locais sociais cheios.

## Manequim geométrico definitivo

- branco, fosco e sem feições;
- corpo esguio e cabeça grande, redonda e lisa;
- braços em cotoquinho, sem dedos ou pulsos;
- pernas simples com pés arredondados;
- contorno preto consistente;
- rig-base e pontos de encaixe comuns.

“Definitivo” significa que o catálogo será produzido contra essa geometria. Antes de congelá-la tecnicamente, ainda será necessário gerar a referência visual e testá-la em movimento e na câmera real.

## Camadas de montagem

```text
manequim-base
├── material/cor corporal — pendente
├── orelhas
├── olhos
├── focinho + boca
├── cauda
├── chapéu ou acessório de cabeça
├── camisa ou vestimenta superior
└── calça e/ou calçado
```

Orelhas, olhos, focinho/boca e cauda formam a personalização corporal inicial. Chapéus, camisas, calças e calçados pertencem ao sistema de cosméticos colecionáveis.

## Compatibilidade

- Cada slot possui ponto de encaixe estável.
- Orelhas e chapéus precisam de regras de convivência: ocultar, atravessar de forma intencional ou usar variante compatível.
- Caudas precisam evitar atravessar cadeiras e roupas de modo excessivo.
- Peças inferiores não devem exigir dedos ou pés anatômicos.
- O outline deve tratar peças sobrepostas sem criar linhas internas confusas.
- Itens incompatíveis devem declarar a restrição antes de equipar.

## Animação mínima

- idle;
- caminhada;
- corrida, se existir no controle aprovado;
- sentar;
- uma expressão social;
- reação curta ao receber ou abrir algo.

Mãos sem dedos eliminam rig facial/manual complexo. A personalidade deve vir de pose, inclinação da cabeça, balanço do corpo, orelhas, cauda e timing.

## Linguagem sonora

`[DIREÇÃO ATIVA; EXECUÇÃO PENDENTE]` As criaturas poderão emitir uma fala sonora fictícia que acompanha mensagens, inspirada na função expressiva de jogos como Don't Starve, sem copiar vozes, fonemas ou processamento.

O texto normal continua visível no chat ou balão. O áudio comunica ritmo e emoção, não substitui o conteúdo escrito.

### Sistema proposto

```text
mensagem enviada
→ tamanho, pontuação e emoção contextual
→ sequência curta de unidades sonoras próprias
→ variação de altura, ritmo e intensidade
→ reprodução espacial junto ao avatar
```

Regras de conforto:

- mensagens longas possuem duração sonora limitada;
- volume diminui com distância;
- voz pode ser reduzida ou desligada separadamente;
- antispam evita cacofonia em praças;
- pontuação muda ritmo e melodia, não altera o texto.

## Pendências criativas

- forma exata e tamanho de cada módulo animal;
- cor do corpo e presença de padrões;
- se olhos e focinho são malhas, texturas ou combinação;
- comportamento de orelhas sob chapéus;
- personalidade da animação;
- timbre, fonética e variação individual da voz;
- nome das criaturas e dos slots dentro do universo.

## Protótipo mínimo

1. Gerar uma imagem conceitual do manequim e aprová-la com o menor.
2. Modelar somente o manequim e um exemplo de cada módulo.
3. Testar chapéu, camisa e calçado na câmera real.
4. Colocar vários avatares juntos e verificar silhueta e outline.
5. Criar uma voz provisória curta somente depois de aprovar o tom do universo.
