Original prompt: quero começar a fazer um jogo em javascrypt pra rodar na web, vai ser multiplayer top down, com pixel art. to pensando em fazer um jogo social tipo club penguin/habbo hotel seila. quero reunir aq com vc as tecnologias e começar a preparar o ambiente. vou usar o vs code e node js

## Estado atual

- Pasta inicial vazia.
- Node.js 23.6.0 e npm 10.9.2 disponíveis.
- Node.js 23 está fora de suporte; migração para Node.js 24 LTS recomendada antes da instalação.
- Direção: jogo social multiplayer web, visão top-down e pixel art.

## Stack inicial proposta

- JavaScript com módulos ES.
- Vite para servidor de desenvolvimento e build do cliente.
- Phaser 4 para renderização 2D, sprites, câmera, tilemap e colisões.
- Colyseus como primeira opção para salas, servidor autoritativo e sincronização de estado; Socket.IO permanece como alternativa de nível mais baixo.
- Tiled para desenhar mapas, colisões, pontos de entrada e objetos interativos em camadas exportadas como JSON.
- HTML/CSS sobre o canvas para chat, perfis, menus e inventário.
- Sem framework de interface, banco de dados, autenticação ou serviços externos no primeiro protótipo.

## Pesquisa de ferramentas

- Tiled: gratuito, open source, ativo e integrado ao formato de tilemap aceito pelo Phaser.
- Phaser Editor v5: editor visual pago para cenas, sprites e tilemaps; opcional, pois Tiled + VS Code cobrem o início.
- LDtk: alternativa gratuita ao Tiled, mas exigiria uma integração menos direta com Phaser.
- Phaser PixUI e RexUI: opções futuras para UI desenhada dentro do canvas; não necessárias enquanto HTML/CSS cobrir a interface.
- Aseprite/LibreSprite: criação e exportação de spritesheets; atlas separado só será necessário quando houver muitos assets.
- PixelLab e Scenario: IA para explorar sprites, direções e tilesets; todo resultado precisa de revisão artística e de licença antes de entrar na versão final.
- Figma: wireframes, fluxos de UX, componentes e protótipos de chat, perfil e inventário.
- Nakama: candidato futuro para contas, amigos, presença e chat persistente; complexo demais para o primeiro protótipo.

## Skills de IA já disponíveis

- `game-design`: loop principal, progressão, motivação social e GDD.
- `game-art`: direção visual, paleta, escala, sprites e pipeline de assets.
- `2d-games`: tilemaps, câmera, colisões e sprites.
- `develop-web-game`: ciclo de implementação e testes visuais automatizados.
- `frontend-design-direction`, `critique`, `adapt`, `polish` e `fixing-accessibility`: direção e revisão de UI/UX.
- `imagegen`: conceitos visuais, moodboards e imagens provisórias.

## Skills oficiais opcionais encontradas

- Conjunto Figma: geração de telas, bibliotecas, regras de design system e implementação de designs.
- Playwright e Playwright Interactive: testes automatizados dos fluxos e inspeção visual.
- O repositório oficial do Phaser 4 fornece skills específicas para cenas, tilemaps, sprites, física, câmeras e demais subsistemas; instalar somente as usadas pelo projeto.
- O catálogo experimental oficial não estava disponível na consulta de 2026-09-25.

## Repositórios para estudo

- `phaserjs/template-vite`: estrutura oficial mínima de Phaser + Vite.
- `phaserjs/examples`: milhares de exemplos oficiais; código MIT, mas os assets não são liberados para reutilização geral.
- `colyseus/tutorial-phaser`: cliente e servidor com sincronização, interpolação e predição.
- `damian-pastorini/reldens` e `reldens-skeleton`: referência de plataforma MMORPG; estudar módulos, não adotar toda a plataforma no protótipo.
- `Kaetram/Kaetram-Open`: referência arquitetural ativa, mas sua licença adicional proíbe uso do projeto em atividades relacionadas a IA; não reutilizar código ou assets neste projeto assistido por IA.
- `mozilla/BrowserQuest`: referência histórica de MMO no navegador; código e dependências estão obsoletos e não devem servir de base.

## Próximos passos

- Confirmar a stack inicial antes de instalar bibliotecas.
- Criar o menor protótipo jogável: uma sala, movimento e dois jogadores sincronizados.
- Adicionar arte, chat, contas e persistência somente após validar o núcleo multiplayer.
