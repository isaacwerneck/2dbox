# Índice de planejamento do jogo

> Estado: `RASCUNHO VIVO`  
> Objetivo: conduzir o projeto até um MVP privado, funcional e testável.  
> Documento-base relacionado: [DOCUMENTACAO.md](../DOCUMENTACAO.md)

## Como usar estes documentos

As anotações têm significado fixo:

- `[DECIDIDO]`: escolha já confirmada pelo menor.
- `[DECISÃO DO MENOR]`: nenhuma escolha deve ser feita sem uma conversa prévia.
- `[HIPÓTESE]`: ideia para testar, não é compromisso de produto.
- `[PENDENTE]`: falta informação ou trabalho.
- `[FORA DO MVP]`: adiado conscientemente.
- `Critério de saída`: evidência necessária para avançar.

Atualize primeiro o documento temático e depois registre a conclusão em [10-DECISOES-E-PERGUNTAS.md](10-DECISOES-E-PERGUNTAS.md). Evite decisões enterradas em conversas.

## Ordem de leitura e execução

1. [Requisitos e escopo](03-REQUISITOS-E-ESCOPO.md)
2. [Game design](04-GAME-DESIGN.md)
3. [Roadmap do MVP](01-ROADMAP-MVP.md)
4. [Trilha de aprendizado](02-TRILHA-DE-APRENDIZADO.md)
5. [Dados e banco](05-DADOS-E-BANCO.md)
6. [Direção artística](06-DIRECAO-ARTISTICA.md)
7. [UI, UX e HUD](07-UI-UX-E-HUD.md)
8. [Universo, nomes e taxonomia](08-UNIVERSO-NOMES-E-TAXONOMIA.md)
9. [Posicionamento e mercado](09-POSICIONAMENTO-E-MERCADO.md)
10. [Registro de decisões e perguntas](10-DECISOES-E-PERGUNTAS.md)
11. [Mundo e espaços](11-MUNDO-E-ESPACOS.md)
12. [Economia, itens e mercado](12-ECONOMIA-ITENS-E-MERCADO.md)
13. [Casas, criação e conteúdo dos jogadores](13-CASAS-CRIACAO-E-UGC.md)
14. [Segurança e conformidade](14-SEGURANCA-E-CONFORMIDADE.md)
15. [Pacotes, pixels e álbum de coleção](15-PACOTES-PIXELS-E-COLECAO.md)
16. [Criaturas e linguagem sonora](16-CRIATURAS-E-LINGUAGEM-SONORA.md)

## Definição provisória do MVP

`[HIPÓTESE]` Uma versão privada na qual duas pessoas abrem o jogo em navegadores diferentes, entram na mesma sala, movimentam personagens, veem a presença uma da outra, conversam, usam ao menos uma forma de expressão e reencontram dados essenciais após reiniciar o servidor.

Essa definição ainda depende da aprovação do menor. Publicação aberta, monetização, economia complexa e ferramentas completas de moderação não fazem parte desta primeira entrega.

## Retrato atual do produto

`[DECIDIDO]` O jogo migrou de pixel art 2D para 3D low-poly extremo com estética retrô de PlayStation 2, GameCube e Nintendo 64. Os avatares usam um manequim antropomórfico modular, e as casas usam plantas pré-moldadas decoráveis. Consulte primeiro [06-DIRECAO-ARTISTICA.md](06-DIRECAO-ARTISTICA.md), [16-CRIATURAS-E-LINGUAGEM-SONORA.md](16-CRIATURAS-E-LINGUAGEM-SONORA.md) e [13-CASAS-CRIACAO-E-UGC.md](13-CASAS-CRIACAO-E-UGC.md).

`[PENDENTE]` A mudança reabre a escolha do motor gráfico, editor 3D, câmera e pipeline de assets. Phaser e Tiled não são mais a stack gráfica ativa.

## Princípio de trabalho

Cada etapa segue o ciclo:

```text
Escolher uma hipótese pequena
        ↓
Construir a menor versão testável
        ↓
Testar com duas pessoas
        ↓
Observar e registrar problemas
        ↓
Manter, alterar ou descartar
```

