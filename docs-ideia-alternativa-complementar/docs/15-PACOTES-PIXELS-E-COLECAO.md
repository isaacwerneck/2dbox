# Loot boxes, pixels, itens e álbum de coleção

> Estado: `VISÃO 18+ APROVADA; NÚMEROS E CONTEÚDO PENDENTES`  
> Regra: probabilidades, preços, raridades e quantidades serão definidos somente após catálogo e simulação econômica.

## Papel das loot boxes

`[DECIDIDO]` A loja oficial não vende diretamente itens específicos. Novos itens oficiais entram inicialmente na economia por loot boxes compradas com a moeda universal obtida jogando.

Depois da extração, o jogador pode usar, guardar, doar, trocar ou vender o item. Assim, lojas e mercados dos jogadores passam a oferecer itens específicos que a loja oficial não oferece.

## Modelos de pacote propostos

### Pacote de chapéu raro

- Declara previamente quantas peças entrega; três chapéus raros é um exemplo, não um número aprovado.
- Cada modelo exato é aleatório dentro do conjunto divulgado.
- Pode conter bonés, bucket hats, toucas, auréolas, chifres e outras famílias aprovadas.

### Pacote de casas

- Entrega uma planta pré-moldada, salvo futura decisão diferente.
- Mostra antes da compra todas as plantas possíveis e suas probabilidades.
- Pode incluir layouts de um, dois ou mais cômodos, com formatos ainda pendentes.
- Duplicatas, troca e aplicação sobre uma casa existente ainda precisam de regra.

### Pacote de quarto

- Garante quantidade definida de móveis para quarto.
- Os móveis exatos são aleatórios dentro do conjunto divulgado.
- Regras de repetição e garantia de variedade ainda serão decididas.

### Pacote de pixels vermelhos

- Garante quantidade total definida de pixels da família vermelha.
- Tons, efeitos e quantidades internas são aleatórios segundo probabilidades divulgadas.
- Pode misturar recursos comuns, raros, brilhantes ou animados quando o pacote declarar isso.

## Informações exibidas antes da compra

- Preço em moeda universal.
- Quantidade total ou recompensa mínima garantida.
- Categorias e itens possíveis.
- Probabilidade individual ou por faixa, conforme o modelo aprovado.
- Possibilidade de duplicata.
- Versão e período de disponibilidade.
- Estado do inventário e entradas já descobertas no álbum.

## Álbum de coleção

`[DECIDIDO COMO DIREÇÃO]` O catálogo mostra tudo o que pode ser descoberto. Antes da primeira obtenção, a entrada aparece oculta ou em cinza. Depois de obter ao menos uma vez, os detalhes permanecem revelados mesmo que o jogador venda, doe ou consuma todas as unidades.

Detalhes candidatos:

- Nome, miniatura e pequena frase.
- Família, categoria e raridade.
- Origem oficial ou comunitária.
- Data da primeira descoberta.
- Quantidade possuída.
- Estado negociável, equipado ou bloqueado.
- Conjunto e variações relacionadas.

## Catálogo de chapéus

`[HIPÓTESE DE CONTEÚDO]` O catálogo poderá conter aproximadamente cem chapéus ou mais, distribuídos em famílias como bonés, bucket hats, toucas e peças especiais. Números citados são referência criativa, não meta de produção.

Antes de produzir em escala:

1. Criar dez itens provisórios.
2. Validar pacote, sorteio, inventário, álbum, equipar, troca e venda.
3. Definir pipeline e custo por item.
4. Só então aumentar o catálogo.

## Sorteio e auditoria

```text
Selecionar pacote e versão
→ validar maioridade, saldo e limites
→ descontar moeda em transação
→ sortear no servidor usando tabela versionada
→ criar instâncias dos itens
→ registrar resultado e probabilidades usadas
→ atualizar inventário e álbum
→ mostrar animação de abertura
```

A animação nunca decide o resultado. Ela apenas apresenta um resultado já calculado e persistido pelo servidor.

## Questões pendentes

- Duplicatas serão sempre permitidas?
- Haverá proteção contra muitas repetições?
- Pacotes terão conteúdo permanente, rotativo ou ambos?
- Raridade dependerá de chance, quantidade emitida, edição ou combinação?
- Itens retirados da loja continuarão negociáveis?
- O álbum dará recompensas por conjunto completo?
- Qual porcentagem da moeda deve sair da economia por pacote?
