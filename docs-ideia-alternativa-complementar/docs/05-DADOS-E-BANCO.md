# Dados e banco de dados

> Estado: `DECISÃO TÉCNICA PARCIAL`  
> `[DECIDIDO]` Desenvolvimento com SQLite local e SQL puro.  
> `[DECIDIDO]` Produção futura deverá usar banco hospedado; PostgreSQL é o candidato atual, sujeito a revisão antes do lançamento.

## Responsabilidades

| Camada | Guarda | Não guarda |
|---|---|---|
| Arquivos versionados | Cenas 3D, catálogos e configurações estáticas | Contas, saldo ou propriedade mutável |
| Memória do Colyseus | Posição, direção, presença e estado efêmero da sala | Fonte permanente de inventário |
| SQLite | Dados persistentes do MVP local | Atualização de cada passo do personagem |
| PostgreSQL futuro | Fonte persistente em produção | Estado de frame em tempo real |

## Fluxo de dados

```text
Cliente solicita ação
        ↓
Servidor valida identidade, regra e estado da sala
        ↓
Servidor altera memória para ações em tempo real
        ↓
Evento persistente usa transação SQL
        ↓
Servidor confirma resultado ao cliente
```

Movimento comum não é salvo a cada frame. Salvar apenas eventos significativos aprovados, como alteração visual, obtenção de item ou posição segura de saída.

## Modelo conceitual mínimo

`[PENDENTE]` Confirmar quais entidades realmente entram no MVP antes de escrever o esquema.

| Entidade candidata | Responsabilidade | Relações principais |
|---|---|---|
| `users` | Identidade técnica local | possui personagens |
| `characters` | Nome e aparência escolhida | pertence a usuário |
| `items` | Definição identificável de item | referenciada pelo inventário |
| `character_items` | Propriedade e quantidade | liga personagem e item |
| `room_objects` | Objeto persistido numa sala | pertence a sala/personagem, se aplicável |
| `schema_migrations` | Versões SQL aplicadas | independente |

Não criar tabelas de amigos, loja, moedas, trocas ou mensagens antes dessas funcionalidades existirem.

## Expansão futura da economia

Quando comércio e criação forem realmente implementados, o banco precisará representar, no mínimo:

- Saldo como razão contábil auditável, não apenas um número sobrescrito.
- Instâncias únicas de itens e sua procedência.
- Definições oficiais separadas de criações de jogadores.
- Propriedade atual e histórico de transferências.
- Ordens de mercado, compras, cancelamentos e taxas.
- Recursos de criação consumidos e resultado produzido.
- Posicionamento e propriedade de móveis.
- Definições de módulos corporais e combinação equipada pelo avatar.
- Plantas de casas, casas possuídas, planta ativa e ambientação por cômodo.
- Denúncias, moderação e estado de publicação de conteúdo criado.
- Descobertas permanentes do catálogo, separadas da quantidade atualmente possuída.
- Definições de pacotes e seus conteúdos exatos ou tabelas de resultados, conforme modelo legalmente aprovado.

`[FORA DO MVP]` Não modelar essas tabelas antes de os fluxos econômicos serem aprovados. O documento [12-ECONOMIA-ITENS-E-MERCADO.md](12-ECONOMIA-ITENS-E-MERCADO.md) define as dependências.

## Regras de modelagem

- Chaves primárias estáveis.
- Chaves estrangeiras ativadas e testadas no SQLite.
- `NOT NULL`, `UNIQUE` e `CHECK` usados no banco quando representam regras invariáveis.
- Datas armazenadas de maneira consistente e documentada.
- Consultas sempre parametrizadas.
- Mudanças de esquema feitas por migration SQL, nunca manualmente no arquivo local.
- Transações para operações com mais de uma escrita dependente.
- Arquivo `.sqlite` fora do Git; migrations e dados-semente entram no Git.
- Banco pode ser recriado do zero por um único comando documentado.

## Compatibilidade SQLite → PostgreSQL

SQL não é totalmente portátil. Para reduzir retrabalho no MVP:

- Evitar depender de coerção frouxa de tipos do SQLite.
- Não usar sintaxe exclusiva sem registrar a diferença.
- Não armazenar listas ou objetos inteiros em texto quando deveriam ser relações.
- Manter migrations pequenas e numeradas.
- Testar a migração em uma cópia antes de produção.

Não vale criar uma camada genérica para dois bancos agora. A migração será tratada quando houver uma implantação real.

## Backup e privacidade

- Dados de teste devem ser fictícios.
- Senhas nunca são armazenadas em texto puro.
- Autenticação pública exige decisão técnica própria antes de ser implementada.
- Backup deve ser verificado por restauração, não apenas por existência do arquivo.
- Dados de chat, se persistidos no futuro, precisam de política de retenção e moderação.

## Critério de saída da modelagem

- [ ] Requisitos persistentes aprovados.
- [ ] Diagrama simples de entidades revisado.
- [ ] Regras e cardinalidades escritas em linguagem comum.
- [ ] Migration inicial cria um banco vazio.
- [ ] Seed mínimo cria somente dados de desenvolvimento.
- [ ] Teste cobre gravação, leitura, duplicidade e rollback.
- [ ] Procedimento de migração futura está registrado, sem implementá-lo antes da hora.

