# Economia, itens e mercado entre jogadores

> Estado: `VISÃO ECONÔMICA; BALANCEAMENTO NÃO INICIADO`  
> Regra: não definir taxas, chances, preços ou raridades sem simulação e aprovação do menor.

## Loop econômico desejado

```text
Participar de atividades
        ↓
Obter moeda, recursos de cor ou itens
        ↓
Usar, criar, decorar, guardar, trocar ou vender
        ↓
Construir identidade e reputação social
        ↓
Retornar para novos objetivos e encontros
```

## Classes de ativos propostas

| Ativo | Função | Estado |
|---|---|---|
| Moeda comum | compras e serviços | `[DECISÃO DO MENOR]` origem e limites |
| Recursos de cor | material consumível para personalização | `[VISÃO DO MENOR]` |
| Cosmético oficial | item criado pelo jogo | `[VISÃO DO MENOR]` |
| Cosmético comunitário | item criado por jogador | `[VISÃO DO MENOR]` |
| Móvel | decoração e possível utilidade | `[VISÃO DO MENOR]` |
| Planta de casa | estrutura pré-moldada de cômodos | `[VISÃO DO MENOR]` |
| Máquina/atividade | móvel interativo ou atividade econômica | `[PENDENTE]` |

Nomes finais e taxonomia permanecem abertos.

`[DECIDIDO]` Haverá uma única moeda universal. Ela não poderá ser comprada com dinheiro real.

Fontes previstas:

- Recompensa diária.
- Missões.
- Minijogos.
- Resultado positivo de apostas.

Usos previstos:

- Apostar no cassino.
- Comprar loot boxes oficiais.
- Comprar itens específicos de outros jogadores.
- Doar moeda para amigos.
- Pagar futuras taxas ou serviços econômicos aprovados.

Doação e compra entre jogadores são transferências, não criam nem destroem moeda. Compras de loot boxes são o principal sumidouro planejado. O cassino pode criar ou remover moeda conforme seu retorno matemático e, por isso, precisa ser simulado antes de existir.

## Fontes e sumidouros

Para evitar inflação, toda fonte precisa de um sumidouro correspondente.

Fontes candidatas:

- Atividades sociais ou minijogos.
- Eventos e pequenos objetivos.
- Recompensa diária, sujeita a limites contra obrigação e uso compulsivo.
- Venda de criações ou itens.
- Recompensas transparentes.

Sumidouros candidatos:

- Móveis e decoração.
- Recursos consumidos ao criar.
- Taxas de anúncio ou venda.
- Serviços opcionais de casa ou loja.
- Itens cosméticos de catálogo.

`[RISCO]` Se aposta for a principal ou única fonte de renda, perder pode bloquear justamente o pertencimento e a expressão que o jogo promete.

## Monetização por assinatura

`[HIPÓTESE PÓS-MVP]` Dinheiro real seria usado apenas numa assinatura mensal, separado da moeda comum.

Benefícios propostos pelo menor:

- Acesso a uma segunda casa.
- Mais espaço no inventário.
- Nome com efeito visual distinto.
- Outros benefícios a decidir posteriormente.

Critérios antes da aprovação:

- Jogadores gratuitos continuam participando do núcleo social e criativo.
- Benefício não aumenta chance, retorno de aposta ou poder de mercado.
- Inventário adicional não permite dominar comércio por capacidade paga.
- Destaque visual não prejudica legibilidade ou cria hierarquia social hostil.
- Cancelamento preserva itens e define claramente o estado da segunda casa e do espaço excedente.
- Preço, renovação e cancelamento são transparentes.

`[DECIDIDO]` A assinatura não será implementada no MVP privado.

## Raridade

Raridade deve representar uma regra verificável, não apenas uma cor na interface. Pode derivar de disponibilidade, custo de criação, evento, edição ou quantidade existente. Os níveis, nomes e probabilidades ainda não estão definidos.

Nunca usar somente a cor para comunicar raridade; texto, ícone e metadados também devem informar.

## Loja de pacotes e coleção

`[VISÃO DO MENOR]` A loja terá famílias temáticas de pixels e cosméticos, acompanhadas por um álbum que registra cada descoberta.

`[SUBSTITUÍDO]` O modelo anterior de conteúdo exato foi abandonado com a mudança para 18+.

`[DECIDIDO COMO VISÃO]` A loja oficial venderá loot boxes aleatórias por categoria. Ela não venderá diretamente um item específico. Exemplos propostos:

- Pacotes de chapéus, com subcategorias como bonés, bucket hats e itens especiais.
- Pacotes de pixels por cor, efeito ou família.
- Pacotes de móveis por cômodo, tema, camuflagem ou raridade.
- Pacotes de casas com plantas pré-moldadas possíveis e probabilidades divulgadas.

Um pacote declara quantidade de resultados, categoria e eventual raridade mínima, mas os itens exatos são sorteados. Exemplo conceitual: um pacote raro de chapéus pode entregar três peças raras aleatórias. Probabilidades e conjunto possível devem ser informados antes da compra, sujeitos a revisão jurídica e de plataforma.

`[HIPÓTESE DE CONTEÚDO]` Um catálogo amplo poderá ter dezenas ou centenas de chapéus, separados por tipos e raridades. As quantidades citadas ainda não são metas de produção.

## Extração e circulação de itens

```text
Moeda obtida jogando
→ compra de loot box oficial
→ novo item entra na economia
→ jogador usa, guarda, troca, doa ou vende
→ outro jogador compra item específico no mercado comunitário
→ moeda continua circulando
```

No lançamento econômico, quase nenhum item estará em circulação. A oferta crescerá conforme as caixas forem abertas. Isso exige telemetria de emissão, proteção contra duplicação, histórico de propriedade e ferramentas administrativas para corrigir incidentes sem criar itens silenciosamente.

Exemplos citados:

- Tons vermelhos, azuis e verdes.
- Pixels brilhantes, arco-íris, negativos e animados.
- Pixels reativos a áudio.
- Efeitos de lava, água e fogo.
- Bonés, toucas e chapéus comemorativos.
- Camisas sólidas, listradas e estampadas.

Os nomes finais, efeitos, conteúdos, preços e raridades ainda dependem de aprovação e testes. Consulte [15-PACOTES-PIXELS-E-COLECAO.md](15-PACOTES-PIXELS-E-COLECAO.md).

## Procedência de cosméticos

Para diferenciar itens oficiais e comunitários, usar metadados imutáveis:

- Origem: oficial ou criado por jogador.
- Identificador único da instância.
- Identificador da definição ou projeto.
- Criador original.
- Data e versão de publicação.
- Estado de moderação.
- Histórico de propriedade.
- Raridade ou edição, quando aplicável.

Uma etiqueta visual pode comunicar a origem, mas a segurança não pode depender de uma cor difícil de copiar.

## Troca e mercado

Ordem segura de implementação:

1. Inventário confiável.
2. Transferência administrativa em ambiente de teste.
3. Troca direta com resumo e confirmação dupla.
4. Histórico e recuperação de incidentes.
5. Loja pessoal.
6. Mercado assíncrono com anúncio, compra atômica e taxa.

Regras obrigatórias: servidor autoritativo, transação SQL, prevenção de gasto duplo, auditoria, limites contra spam, confirmação clara e tratamento de desconexão.

## Referência Cubic Castles

`[REFERÊNCIA]` Estudar os padrões de coleção, troca e mercado citados pelo menor. Não copiar nomes, arte, interface, textos, tabelas de raridade ou balanceamento. A diferenciação deve vir da combinação aprovada para este universo e de fluxos próprios.

## Métricas para balancear depois

- Tempo mediano para obter o primeiro item desejado.
- Moeda criada e removida por dia.
- Concentração de riqueza.
- Quantidade de itens sem circulação.
- Preço mediano e volatilidade por categoria.
- Percentual de jogadores que cria, compra, vende e troca.
- Fraudes, arrependimentos e denúncias por transação.

