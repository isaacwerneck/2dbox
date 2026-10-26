# Direção artística: low-poly retrô

> Estado: `DIREÇÃO PRINCIPAL E CONTROLE DE CÂMERA APROVADOS; GUIA VISUAL PENDENTE`  
> Regra: referências comunicam intenção; não copiar identidade, modelos, texturas ou interface.

## Identidade visual aprovada

`[DECIDIDO]` O jogo será 3D com low-poly extremo e estética retrô inspirada na era PlayStation 2, GameCube e Nintendo 64. Webfishing é a principal referência contemporânea de simplicidade, clima social e leitura visual.

Características:

- polígonos perceptíveis e formas simplificadas;
- silhuetas claras e proporções exageradas;
- cores sólidas, vivas e limpas;
- texturas pequenas, pintadas à mão e pouco complexas;
- materiais estilizados, sem busca por realismo PBR;
- cenários com detalhe controlado para não competir com jogadores;
- aparência intencionalmente artesanal, não tecnicamente inacabada.

“Retrô” descreve linguagem visual e limitações escolhidas. Não exige copiar baixa resolução, tremor de textura, serrilhado ou problemas técnicos antigos.

## Regras de leitura

- A silhueta deve continuar identificável na distância normal da câmera.
- Personagens, itens equipados e interações recebem maior contraste que o fundo.
- Cores importantes devem funcionar também por valor, forma ou ícone.
- Texturas não devem esconder a geometria low-poly.
- Um asset novo deve parecer parte do mesmo mundo sem depender do nome do arquivo.
- Efeitos luminosos, partículas e outlines precisam de limites para evitar ruído em praças cheias.

## Personagem-base

`[DECIDIDO]` Os avatares serão criaturas antropomórficas próprias do universo. Todos partem de um manequim geométrico comum.

### Especificação do manequim

- Corpo esguio, branco, fosco, neutro e sem decoração.
- Cabeça grande, arredondada e perfeitamente lisa.
- Nenhum olho, nariz, boca ou orelha integrado à malha-base.
- Braços em “cotoquinho”: sem dedos, luva anatômica ou separação de pulso.
- Pernas retas com extremidades arredondadas e simplificadas.
- Contorno preto arrojado e consistente aplicado pela direção de cel-shading.
- Um único rig-base e pontos de encaixe estáveis.

A malha-base é uma referência geométrica imutável. Melhorias futuras podem corrigir defeitos técnicos, mas não alteram proporções ou encaixes sem migração de todo o catálogo.

## Sistema modular

### Identidade corporal inicial

Opções fundamentais disponíveis para todos, separadas das roupas colecionáveis:

| Slot | Exemplos confirmados | Observação |
|---|---|---|
| Orelhas | sapo, raposa, axolote | modelos exatos ainda serão desenhados |
| Olhos | pendente | módulo independente |
| Focinho e boca | pendente | tratados como conjunto por enquanto |
| Cauda | diferentes animais | precisa respeitar animação e móveis |

Cor do corpo, padrões, chifres e outras características continuam pendentes; não devem ser presumidos.

### Vestuário colecionável

| Slot | Conteúdo |
|---|---|
| Cabeça | chapéus e acessórios de cabeça |
| Corpo | camisas e vestimentas superiores |
| Parte inferior | calças e calçados |

Cada item declara slot, ponto de encaixe, volume máximo e incompatibilidades. Sobreposições problemáticas devem ser evitadas no catálogo, não resolvidas aumentando a complexidade do corpo.

## Cenários e objetos

- Arquitetura modular low-poly com volumes grandes e legíveis.
- Colisores simples e separados da geometria visual.
- Móveis respeitam escala comum e pontos de apoio previsíveis.
- Casas usam plantas pré-moldadas; decoração não altera a estrutura principal.
- Luz, partículas e música são camadas de ambientação configuráveis.

## Câmera e apresentação

`[DECIDIDO]` A câmera será orbital livre em terceira pessoa:

- acompanha o avatar como alvo;
- segurar o botão direito do mouse e arrastar rotaciona a câmera;
- a rotação é livre nos eixos horizontal e vertical, respeitando limites técnicos a definir;
- enquanto o botão estiver pressionado, o movimento do mouse pertence à câmera;
- ao soltar o botão, o cursor fica livre imediatamente para navegar pelo HUD;
- mover o cursor sem o botão direito pressionado não rotaciona a câmera.

`[PENDENTE]` Ainda precisam de aprovação:

- projeção em perspectiva ou ortográfica;
- limites verticais para evitar inversão ou passagem pelo chão;
- distância mínima e máxima;
- comportamento ao encontrar paredes;
- campo de visão e enquadramento de interiores.
- sensibilidade, inversão opcional e recentralização atrás do avatar;
- equivalentes para toque e controle, se essas plataformas entrarem no escopo.

Os valores pendentes devem ser testados antes da modelagem final, pois determinam o detalhe visível e os testes de encaixe.

## Pipeline mínimo

```text
conceito aprovado
→ blockout do asset
→ teste de silhueta na câmera real
→ UV e textura pintada à mão
→ rig/encaixe quando necessário
→ exportação para formato web aprovado
→ teste com vários jogadores na cena
```

Ferramentas e formato final serão escolhidos com o menor. Blender, Blockbench e GLB/glTF são candidatos, não decisões instaladas.

## Primeiro kit de validação

- [ ] Manequim em vista frontal, lateral e três quartos.
- [ ] Idle e caminhada provisórios.
- [ ] Uma orelha, um olho, um focinho e uma cauda.
- [ ] Um chapéu, uma camisa e uma peça inferior.
- [ ] Uma sala low-poly com luz simples.
- [ ] Três móveis e uma janela.
- [ ] Teste de outline com um e vários personagens.
- [ ] Teste de leitura em fundos claros, escuros e saturados.

## Critério de saída

Uma captura ou build pequena demonstra câmera aprovada, escala, manequim, modularidade, outline, textura pintada à mão, cenário e item equipável sem depender de explicação verbal.
