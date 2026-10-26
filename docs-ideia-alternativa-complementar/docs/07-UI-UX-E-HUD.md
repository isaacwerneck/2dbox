# UI, UX e HUD

> Estado: `ARQUITETURA FUNCIONAL; VISUAL PENDENTE`  
> `[DECIDIDO]` Mundo no canvas do futuro motor 3D; interfaces sociais e formulários em HTML/CSS.  
> `[DECISÃO DO MENOR]` Linguagem visual, forma, cor, tipografia e personalidade do HUD.

## Objetivo da experiência

O mundo é o foco. A interface deve ajudar o jogador a perceber presença, comunicar-se e agir sem cobrir o espaço social.

`[DECIDIDO]` A experiência deve acolher primeiro adolescentes buscando socialização, sem infantilizar a apresentação para os jovens adultos e adultos nostálgicos que formam os públicos secundários.

## Jornada e telas candidatas

| Momento | Necessidade | Superfície mínima |
|---|---|---|
| Entrada | entender estado e iniciar | tela inicial simples |
| Conexão | saber que o jogo está carregando | estado de conexão |
| Sala | ver mundo e pessoas | canvas + HUD mínimo |
| Comunicação | escrever, ler e reagir | chat e ação não verbal |
| Identidade | reconhecer a si e ao outro | nome e aparência |
| Falha | recuperar sem confusão | mensagem e ação de tentar novamente |

## HUD mínimo a validar

`[HIPÓTESE]`

- Nome do jogador próximo ao personagem.
- Entrada de chat acessível por teclado.
- Histórico curto ou balões, conforme decisão de UX.
- Um controle de expressão.
- Indicador discreto de conexão.
- Acesso a configurações essenciais.

## Fronteira entre câmera e HUD

`[DECIDIDO]` No desktop, segurar o botão direito do mouse e arrastar controla a câmera orbital livre. Ao soltar o botão, o cursor volta a interagir com o HUD.

- O HUD não deve acionar botões durante um arrasto de câmera.
- A câmera não deve girar quando o jogador apenas move o cursor sobre a interface.
- Abrir uma janela modal deve liberar o cursor e suspender o controle da câmera.
- Soltar o botão fora do canvas não pode deixar o cursor preso.
- Menu de contexto do navegador deve ser bloqueado somente dentro da área de jogo onde conflitar com esse controle.
- Campos de texto continuam impedindo que teclas digitadas movimentem o avatar.

Inventário, loja, missões e múltiplas barras não entram antes de uma necessidade comprovada.

## Perguntas criativas

`[DECISÃO DO MENOR]`

- O HUD parece parte do universo ou uma camada neutra?
- A comunicação aparece em balões, painel, ambos ou outro formato?
- A experiência prioriza desktop, celular ou ambos desde o MVP?
- O tom textual é acolhedor, irreverente, misterioso ou outro?
- Ícones seguirão estética retrô rasterizada, vetorial limpa ou uma combinação?
- Quanto da tela pode ser ocupado sem esconder encontros?

## Processo de design

1. Mapear o fluxo sem aparência.
2. Criar wireframe em baixa fidelidade.
3. Testar localização, ordem e estados.
4. Definir hierarquia com proximidade, alinhamento, repetição e contraste.
5. Aplicar a direção visual aprovada.
6. Implementar a menor interface.
7. Testar em janela estreita e larga, teclado e mouse.

## Estados obrigatórios

Cada componente relevante deve considerar:

- Normal.
- Foco por teclado.
- Hover, quando existir.
- Pressionado/selecionado.
- Desabilitado.
- Carregando.
- Vazio.
- Erro.
- Reconectando.
- Conteúdo longo ou excedente.

## Acessibilidade mínima

- Foco visível e ordem lógica de tabulação.
- Rótulos associados aos campos.
- Contraste suficiente para texto e controles.
- Estado não comunicado somente por cor.
- Tamanho legível independentemente da resolução do canvas 3D.
- Ações essenciais não dependem apenas de hover.
- Chat não captura controles de movimento enquanto o campo está em edição.
- Segurança social, bloqueio e denúncia devem ser encontráveis e compreensíveis quando o jogo for aberto ao público.

## Testes de UX

- “Entre na sala e encontre outra pessoa.”
- “Envie uma mensagem e use uma reação.”
- “Descubra se perdeu a conexão e recupere-se.”
- “Identifique o que é interativo no cenário.”

Medir: tempo, erros, pedidos de ajuda, elemento clicado primeiro e expectativa versus resultado.

## Critério de saída

Wireframes e direção visual foram aprovados pelo menor; uma pessoa nova realiza as ações principais sem instrução; estados de falha e teclado foram testados.

