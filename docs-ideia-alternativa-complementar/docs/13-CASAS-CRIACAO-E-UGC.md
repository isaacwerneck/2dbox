# Casas, decoração e conteúdo comunitário

> Estado: `MODELO DE HABITAÇÃO APROVADO; REGRAS DE EDIÇÃO PENDENTES`  
> Escopo: visão de produto; somente a versão mínima entra no primeiro teste de habitação.

## Estrutura das casas

`[DECIDIDO]` Cada jogador recebe uma casa com uma planta pré-moldada. A primeira planta possui um único cômodo. O jogador decora e ambienta esse espaço, mas não desenha paredes ou constrói a geometria estrutural livremente.

Uma planta de casa define:

- quantidade e dimensões dos cômodos;
- conexão entre cômodos;
- limites, portas e pontos de entrada;
- superfícies editáveis;
- pontos compatíveis com janelas;
- regras de iluminação e capacidade de objetos.

Exemplos conceituais futuros:

- um cômodo amplo;
- dois cômodos;
- três cômodos, sendo dois menores e um maior.

Os formatos, nomes e quantidades finais ainda não foram escolhidos.

## Obtenção de novas plantas

`[DECIDIDO COMO VISÃO]` Novas plantas entram na economia por pacotes aleatórios de casas. Antes da compra, o jogador vê as plantas possíveis e as probabilidades, mas recebe uma delas por sorteio.

Pacote conceitual:

```text
Pacote de casas
→ contém um conjunto divulgado de plantas
→ garante uma planta por abertura, salvo futura decisão diferente
→ sorteia qual planta será recebida
→ registra a planta no inventário/álbum
→ permite aplicá-la a uma casa elegível
```

Preço, tamanho do conjunto, duplicatas, troca e raridade permanecem pendentes.

## Quantidade de casas

- Jogador comum: uma casa.
- Assinante VIP: mais de uma casa.
- Quantidade adicional, estado após cancelamento e regras de visita permanecem pendentes.

Nenhuma casa ou item conquistado deve ser apagado automaticamente quando uma assinatura termina. O comportamento exato será definido antes da monetização.

## Camadas de personalização

### Estrutura escolhida

- planta pré-moldada ativa;
- pisos por cômodo;
- paredes ou papel de parede por superfície;
- janelas em pontos compatíveis.

### Decoração

- móveis;
- objetos de exposição;
- máquinas e objetos interativos aprovados;
- possível área de loja pessoal no futuro.

### Ambientação

- música;
- iluminação por cômodo;
- partículas ambientais;
- outros efeitos aprovados posteriormente.

## Fluxo do editor

```text
entrar no modo de edição
→ escolher categoria e item possuído
→ visualizar posição e colisão
→ posicionar/rotacionar ou alterar superfície
→ visualizar resultado
→ salvar no servidor
→ publicar a versão para visitantes
```

O servidor valida propriedade, quantidade, limites, colisões, permissões e versão da casa. Se a gravação falhar, a versão publicada anteriormente permanece válida.

## Regras ainda necessárias

- grade livre, encaixes predefinidos ou combinação;
- rotação permitida por categoria;
- limite de móveis e efeitos por desempenho;
- armazenamento de itens removidos;
- privacidade, convite e capacidade de visitantes;
- troca de planta sem perder a decoração;
- tratamento de janelas e itens incompatíveis com a nova planta;
- permissão para vender ou trocar plantas duplicadas.

## Editor de cosméticos comunitários

`[VISÃO DE LONGO PRAZO]` O jogador poderá usar recursos de cor para criar cosméticos próprios. A mudança para 3D exige redesenhar esse editor: ele poderá pintar templates 3D ou montar peças dentro de limites aprovados. O formato não está decidido.

Criações públicas exigem validação, moderação, autoria, versionamento e procedência visível. Upload externo de imagens não entra na primeira versão.

## MVP de habitação

Uma casa por jogador, uma planta fixa de um cômodo, poucos móveis oficiais, alteração simples de piso e parede, salvar/carregar e visita por convite. Pacotes de plantas, VIP, música, partículas, lojas e editor comunitário ficam para depois da validação básica.
