# Documentação geral do jogo

> Estado: `RASCUNHO VIVO`  
> Atualizado em: 2026-09-30  
> Regra: decisões criativas pertencem ao menor; hipóteses não devem ser tratadas como escolhas finais.

## 1. Visão do projeto

Jogo social multiplayer 3D para navegador, voltado a maiores de 18 anos. O jogador habita um mundo acolhedor, encontra outras pessoas, personaliza um avatar antropomórfico modular, coleciona itens e transforma casas pré-moldadas em espaços próprios.

O produto busca conforto, estímulo positivo, socialidade, inclusão e pertencimento. Pequenos objetivos, cenários variados e acontecimentos recorrentes devem combater monotonia e a sensação de estar sozinho em um mundo vazio.

Referências ajudam a comunicar intenções, mas não autorizam copiar personagens, interface, nomes, modelos, texturas ou identidade de outros jogos.

## 2. Direção visual aprovada

- 3D low-poly extremo, com nostalgia de PlayStation 2, GameCube e Nintendo 64.
- Referência contemporânea principal: a simplicidade e o clima social de Webfishing.
- Formas simples, polígonos perceptíveis e silhuetas fortes.
- Cores sólidas, vivas e limpas.
- Texturas pequenas e pintadas à mão, sem materiais realistas complexos.
- Contorno preto consistente em personagens, com linguagem de cel-shading.
- Detalhe concentrado em personagens, itens sociais e objetos interativos.
- Legibilidade na distância normal de jogo acima de fidelidade técnica.

`[DECIDIDO]` A câmera será orbital livre em terceira pessoa, no padrão de interação popularizado por Roblox: segurar o botão direito e arrastar rotaciona a visão horizontal e verticalmente; soltar o botão devolve o cursor ao HUD. Projeção, sensibilidade, limites de zoom, colisão com paredes e recentralização continuam pendentes. A direção anterior de pixel art 2D, Phaser e Tiled foi substituída.

## 3. Avatar modular

O avatar é uma criatura antropomórfica compacta e cabeçuda. Todos usam o mesmo manequim-base para preservar compatibilidade com roupas e animações.

### Manequim imutável

- Corpo esguio, branco, fosco e neutro.
- Cabeça grande, arredondada, lisa e sem feições incorporadas.
- Braços em formato de cotoquinho, sem mãos, dedos ou pulsos modelados.
- Pernas retas terminando em pés arredondados e simplificados.
- Contorno preto arrojado e consistente.
- Rig único e pontos de encaixe estáveis para todas as peças.

### Personalização corporal inicial

Disponível como construção básica de identidade, separada da economia de roupas:

- orelhas: sapo, raposa, axolote e outras futuras;
- olhos;
- conjunto de focinho e boca;
- cauda;
- cores e demais opções somente após decisão específica.

### Cosméticos colecionáveis

- cabeça: chapéus e acessórios equivalentes;
- corpo: camisas e outras vestimentas superiores;
- parte inferior: calças e calçados.

Cada módulo precisa obedecer a pontos de encaixe e limites visuais. O avatar não ganha dedos ou anatomia detalhada apenas para acomodar um item.

## 4. Pacotes aleatórios

Pacotes são comprados com a moeda universal obtida jogando. A loja oficial introduz itens por pacotes aleatórios; itens específicos passam a circular por trocas, lojas e mercado entre jogadores.

O jogador deve saber antes de comprar:

- preço;
- categoria do pacote;
- quantidade garantida de resultados;
- raridade mínima, quando houver;
- conjunto de itens possíveis;
- probabilidades;
- regras de repetição e período de disponibilidade.

Exemplo conceitual: um pacote raro de chapéus pode entregar três chapéus da faixa declarada, mas os três modelos exatos são sorteados. Números, preços e chances ainda não estão aprovados.

## 5. Casas

- Todo jogador começa com uma casa e um layout básico de um cômodo.
- Casas são plantas 3D pré-moldadas, não construções livres de paredes.
- Pacotes de casas podem sortear uma planta dentro de um conjunto divulgado.
- Plantas podem variar em número, tamanho e organização dos cômodos.
- Assinantes VIP poderão ter mais de uma casa; quantidade e regras ainda serão decididas.

Dentro da planta escolhida, o jogador poderá personalizar:

- móveis;
- pisos;
- paredes e papéis de parede;
- janelas em pontos compatíveis;
- música ambiente;
- partículas ambientais;
- iluminação por cômodo;
- objetos interativos aprovados.

A planta define os limites estruturais. O editor manipula decoração e ambientação, não a geometria fundamental da casa.

## 6. Mundo e economia

- Praça central como principal ponto de convivência.
- Portais para casas e futuros espaços temáticos.
- Uma única moeda universal, obtida jogando e não comprável com dinheiro real.
- Fontes previstas: recompensas diárias, missões, minijogos e resultados positivos de apostas.
- Usos previstos: pacotes, apostas, comércio e doações entre jogadores.
- Assinatura mensal separada da moeda, fora do MVP.
- Loot boxes e apostas dependem de aferição de maioridade, revisão jurídica e controles econômicos antes da implementação pública.

## 7. Stack e ferramentas

### Confirmadas

| Peça | Escolha | Papel |
|---|---|---|
| Linguagem | JavaScript com módulos ESM | Cliente e servidor |
| Ambiente | Node.js LTS e npm | Ferramentas e servidor |
| Editor | VS Code | Desenvolvimento |
| Build do cliente | Vite | Servidor local e build web |
| Multiplayer candidato | Colyseus | Salas e estado autoritativo |
| Banco local | SQLite com migrations em SQL puro | Persistência de desenvolvimento |
| Interface | HTML e CSS sobre o canvas 3D | Chat, inventário, loja e formulários |

### Reabertas pela mudança para 3D

O motor 3D, editor de cenas, ferramenta de modelagem e pipeline de exportação precisam ser escolhidos com o menor antes da instalação. Babylon.js, Three.js, Blender e Blockbench são candidatos; nenhum está confirmado.

O formato de intercâmbio preferencial a avaliar é glTF/GLB, contendo malha, materiais, rig e animações.

Phaser, Tiled, Aseprite e o pipeline de sprites permanecem apenas como histórico da antiga direção 2D e não fazem parte da stack atual.

## 8. Arquitetura inicial

```text
Navegador
├── canvas do motor 3D
├── avatar, cenário, câmera e interação
└── HTML/CSS para interfaces
        ⇅ WebSocket
Servidor Node.js + Colyseus
├── salas e presença
├── validação de movimento e ações
├── economia e sorteios autoritativos
└── persistência SQLite
```

O cliente envia intenções. O servidor valida e altera o estado oficial. Saldo, propriedade, sorteios, inventário e permissões nunca são decididos pelo navegador.

## 9. Pipeline artístico proposto

```text
conceito aprovado
→ blockout low-poly
→ teste de silhueta na câmera real
→ UV simples e textura pintada à mão
→ rig único para o manequim
→ animações mínimas
→ exportação GLB/glTF
→ validação visual e de desempenho no navegador
```

Antes de produzir catálogo, criar somente: manequim-base, uma opção de cada módulo corporal, um chapéu, uma camisa, uma peça inferior, uma sala e alguns móveis.

## 10. Skills de IA úteis

| Skill | Uso |
|---|---|
| `game-design` | loops, progressão, recompensas e documentação de sistemas |
| `game-art` | direção visual, pipeline 3D, silhueta, cor e animação |
| `3d-games` | câmera, cena, colisões, iluminação e desempenho 3D |
| `develop-web-game` | implementação e testes de jogo web |
| `design-fundamentals` | hierarquia visual e consistência |
| `baseline-ui` | revisão de UI e acessibilidade |
| `game-audio` | linguagem sonora, ambiente e feedback |
| `game-balance` | economia, emissão, raridade e progressão |
| `community-building` | pertencimento, eventos e saúde comunitária |
| `privacy-by-design` | minimização e proteção de dados pessoais |

IA pode acelerar referências, conceitos e protótipos. Todo resultado exige revisão de consistência, licença, segurança e aprovação criativa.

## 11. Ordem mínima de implementação

1. Fechar câmera e escolher o motor 3D.
2. Fazer um protótipo offline com cápsula ou manequim provisório.
3. Validar movimento, colisão, câmera e desempenho no navegador.
4. Sincronizar dois jogadores numa sala autoritativa.
5. Adicionar chat e uma expressão não verbal.
6. Criar e integrar o manequim definitivo e poucos módulos.
7. Persistir identidade e inventário mínimo em SQLite.
8. Criar uma casa básica pré-moldada com poucos móveis.
9. Validar o núcleo social antes de implementar economia, pacotes, cassino ou VIP.

## 12. Documentação temática

O índice completo e a situação de cada decisão estão em [docs/00-LEIA-ME.md](docs/00-LEIA-ME.md). Direção artística, avatares, casas, economia e pacotes possuem documentos próprios e prevalecem sobre resumos antigos.
