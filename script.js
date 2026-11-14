const DATA_DICTIONARY = [
  {
    name: "categoria",
    purpose: "Agrupamento mercadologico dos produtos de cosmeticos, perfumaria e higiene pessoal.",
    columns: [
      {
        attr: "id_categoria",
        desc: "Identificador unico surrogate da categoria mercadologica.",
        type: "BIGINT",
        constraints: ["[PK]", "[NOT NULL]", "[AUTO_INCREMENT]"],
        lgpd: "N/A",
        lineage: "Origem: SGBD (AUTO_INCREMENT) | Destino: Cadastro de produtos e relatorios gerenciais.",
        rbac: "ATENDENTE (SELECT), GERENTE (SELECT, INSERT, UPDATE), ADMINISTRADOR (SELECT, INSERT, UPDATE)"
      },
      {
        attr: "nome",
        desc: "Nome unico da categoria de produtos (ex: Perfumaria, Cabelos, Skincare).",
        type: "VARCHAR(100)",
        constraints: ["[NOT NULL]", "[UNIQUE]"],
        lgpd: "N/A",
        lineage: "Origem: Interface de Gestao de Categorias (RF06) | Destino: Catalogo e filtros de venda.",
        rbac: "ATENDENTE (SELECT), GERENTE (SELECT, INSERT, UPDATE), ADMINISTRADOR (SELECT, INSERT, UPDATE)"
      },
      {
        attr: "descricao",
        desc: "Descricao detalhada da finalidade mercadologica da categoria.",
        type: "TEXT",
        constraints: ["[NULL]"],
        lgpd: "N/A",
        lineage: "Origem: Interface de Gestao de Categorias (RF06) | Destino: Consulta interna de catalogo.",
        rbac: "ATENDENTE (SELECT), GERENTE (SELECT, INSERT, UPDATE), ADMINISTRADOR (SELECT, INSERT, UPDATE)"
      },
      {
        attr: "ativo",
        desc: "Flag de exclusao logica (DEFAULT 1). 1 = ativa, 0 = inativa para novos produtos.",
        type: "TINYINT(1)",
        constraints: ["[NOT NULL]"],
        lgpd: "N/A",
        lineage: "Origem: Regra RN06 / RF06 | Destino: Trava de associacao e auditoria.",
        rbac: "ATENDENTE (SELECT), GERENTE (SELECT, UPDATE), ADMINISTRADOR (SELECT, UPDATE)"
      },
      {
        attr: "produto_id_produto",
        desc: "Chave estrangeira presente no DDL atual referenciando produto (divergencia de cardinalidade apontada na analise).",
        type: "BIGINT",
        constraints: ["[FK]", "[NOT NULL]", "[INDEX]"],
        lgpd: "N/A",
        lineage: "Origem: produto.id_produto | Destino: Relacionamento categoria-produto no DDL atual.",
        rbac: "GERENTE (SELECT, INSERT, UPDATE), ADMINISTRADOR (SELECT, INSERT, UPDATE)"
      }
    ]
  },
  {
    name: "cep_logradouro",
    purpose: "Base normalizada (3FN) de CEPs, logradouros, bairros, cidades e UFs para padronizacao de enderecos.",
    columns: [
      {
        attr: "cep",
        desc: "Codigo de Enderecamento Postal com 8 digitos numericos sem mascara.",
        type: "VARCHAR(8)",
        constraints: ["[PK]", "[NOT NULL]"],
        lgpd: "N/A",
        lineage: "Origem: Base de CEPs / Cadastro de Endereco (RF07) | Destino: Tabela endereco e comprovantes.",
        rbac: "ATENDENTE (SELECT, INSERT, UPDATE), GERENTE (SELECT, INSERT, UPDATE), ADMINISTRADOR (SELECT, INSERT, UPDATE)"
      },
      {
        attr: "logradouro_padrao",
        desc: "Nome oficial da via associada ao CEP (no DDL consta espaco inicial no identificador).",
        type: "VARCHAR(100)",
        constraints: ["[NOT NULL]"],
        lgpd: "N/A",
        lineage: "Origem: Base de CEPs (RF07) | Destino: Preenchimento automatico de endereco.",
        rbac: "ATENDENTE (SELECT, INSERT, UPDATE), GERENTE (SELECT, INSERT, UPDATE), ADMINISTRADOR (SELECT, INSERT, UPDATE)"
      },
      {
        attr: "bairro_padrao",
        desc: "Nome oficial do bairro vinculado ao CEP.",
        type: "VARCHAR(100)",
        constraints: ["[NOT NULL]"],
        lgpd: "N/A",
        lineage: "Origem: Base de CEPs (RF07) | Destino: Preenchimento automatico de endereco.",
        rbac: "ATENDENTE (SELECT, INSERT, UPDATE), GERENTE (SELECT, INSERT, UPDATE), ADMINISTRADOR (SELECT, INSERT, UPDATE)"
      },
      {
        attr: "cidade",
        desc: "Municipio correspondente ao CEP (normalizado em 3FN).",
        type: "VARCHAR(100)",
        constraints: ["[NOT NULL]"],
        lgpd: "N/A",
        lineage: "Origem: Base de CEPs (RF07) | Destino: Pedidos de entrega e relatorios regionais.",
        rbac: "ATENDENTE (SELECT, INSERT, UPDATE), GERENTE (SELECT, INSERT, UPDATE), ADMINISTRADOR (SELECT, INSERT, UPDATE)"
      },
      {
        attr: "uf",
        desc: "Sigla da Unidade Federativa com 2 caracteres (normalizado em 3FN).",
        type: "CHAR(2)",
        constraints: ["[NOT NULL]"],
        lgpd: "N/A",
        lineage: "Origem: Base de CEPs (RF07) | Destino: Pedidos de entrega e relatorios regionais.",
        rbac: "ATENDENTE (SELECT, INSERT, UPDATE), GERENTE (SELECT, INSERT, UPDATE), ADMINISTRADOR (SELECT, INSERT, UPDATE)"
      },
      {
        attr: "endereco_id_endereco",
        desc: "Chave estrangeira presente no DDL atual referenciando endereco.",
        type: "BIGINT",
        constraints: ["[FK]", "[NOT NULL]", "[INDEX]"],
        lgpd: "N/A",
        lineage: "Origem: endereco.id_endereco | Destino: Vinculo de endereco no DDL atual.",
        rbac: "ATENDENTE (SELECT, INSERT, UPDATE), GERENTE (SELECT, INSERT, UPDATE), ADMINISTRADOR (SELECT, INSERT, UPDATE)"
      }
    ]
  },
  {
    name: "cliente",
    purpose: "Cadastro de clientes Pessoa Fisica (PF) ou Pessoa Juridica (PJ) com controles de consentimento e anonimizacao LGPD.",
    columns: [
      {
        attr: "id_cliente",
        desc: "Identificador unico surrogate do cliente.",
        type: "BIGINT",
        constraints: ["[PK]", "[NOT NULL]", "[AUTO_INCREMENT]"],
        lgpd: "N/A",
        lineage: "Origem: SGBD (AUTO_INCREMENT) | Destino: Pedidos, enderecos e log_auditoria.",
        rbac: "ATENDENTE (SELECT), GERENTE (SELECT), ADMINISTRADOR (SELECT)"
      },
      {
        attr: "tipo_pessoa",
        desc: "Classificacao juridica do titular: 0 - PF ou 1 - PJ.",
        type: "VARCHAR(45)",
        constraints: ["[NOT NULL]"],
        lgpd: "N/A",
        lineage: "Origem: Formulario de Clientes (RF01) | Destino: Validacao de CPF/CNPJ e relatorios.",
        rbac: "ATENDENTE (SELECT, INSERT, UPDATE), GERENTE (SELECT, INSERT, UPDATE), ADMINISTRADOR (SELECT, INSERT, UPDATE)"
      },
      {
        attr: "nome",
        desc: "Nome civil completo (PF) ou razao social (PJ). Substituido por token na anonimizacao.",
        type: "VARCHAR(100)",
        constraints: ["[NOT NULL]"],
        lgpd: "DP",
        lineage: "Origem: Formulario de Clientes (RF01) | Destino: Comprovantes de pedido e exportacao LGPD.",
        rbac: "ATENDENTE (SELECT, INSERT, UPDATE), GERENTE (SELECT, INSERT, UPDATE), ADMINISTRADOR (SELECT, INSERT, UPDATE, ANONIMIZAR)"
      },
      {
        attr: "cpf_cnpj",
        desc: "Documento fiscal unico (11 digitos PF ou 14 caracteres PJ), preservando zeros a esquerda.",
        type: "VARCHAR(14)",
        constraints: ["[NOT NULL]", "[UNIQUE]"],
        lgpd: "DP",
        lineage: "Origem: Formulario de Clientes (RF01) | Destino: Comprovantes, mascaramento em log_auditoria e LGPD.",
        rbac: "ATENDENTE (SELECT, INSERT, UPDATE), GERENTE (SELECT, INSERT, UPDATE), ADMINISTRADOR (SELECT, INSERT, UPDATE, ANONIMIZAR)"
      },
      {
        attr: "telefone",
        desc: "Telefone de contato padronizado (10 a 15 digitos).",
        type: "VARCHAR(15)",
        constraints: ["[NOT NULL]"],
        lgpd: "DP",
        lineage: "Origem: Formulario de Clientes (RF01) | Destino: Teleatendimento/WhatsApp e entregas.",
        rbac: "ATENDENTE (SELECT, INSERT, UPDATE), GERENTE (SELECT, INSERT, UPDATE), ADMINISTRADOR (SELECT, INSERT, UPDATE, ANONIMIZAR)"
      },
      {
        attr: "email",
        desc: "Endereco de correio eletronico unico do cliente no DDL atual.",
        type: "VARCHAR(100)",
        constraints: ["[NOT NULL]", "[UNIQUE]"],
        lgpd: "DP",
        lineage: "Origem: Formulario de Clientes (RF01) | Destino: Comunicacao de pedidos e exportacao LGPD.",
        rbac: "ATENDENTE (SELECT, INSERT, UPDATE), GERENTE (SELECT, INSERT, UPDATE), ADMINISTRADOR (SELECT, INSERT, UPDATE, ANONIMIZAR)"
      },
      {
        attr: "consentimento_lgpd",
        desc: "Indicador de aceite de tratamento de dados pessoais (DEFAULT 0).",
        type: "TINYINT(1)",
        constraints: ["[NOT NULL]"],
        lgpd: "N/A",
        lineage: "Origem: Registro de Consentimento (RF01 / RF09) | Destino: Auditoria de conformidade LGPD.",
        rbac: "ATENDENTE (SELECT, INSERT, UPDATE), GERENTE (SELECT, UPDATE), ADMINISTRADOR (SELECT, UPDATE)"
      },
      {
        attr: "data_consentimento",
        desc: "Data e hora exata da concessao ou atualizacao do consentimento LGPD.",
        type: "DATETIME",
        constraints: ["[NULL]"],
        lgpd: "N/A",
        lineage: "Origem: SGBD / Aplicacao (RF09) | Destino: Evidencia temporal de consentimento (PR03).",
        rbac: "ATENDENTE (SELECT), GERENTE (SELECT), ADMINISTRADOR (SELECT, UPDATE)"
      },
      {
        attr: "anonimizado",
        desc: "Flag indicando se o titular foi anonimizado de forma irreversivel (DEFAULT 0 - PR03).",
        type: "TINYINT(1)",
        constraints: ["[NOT NULL]"],
        lgpd: "N/A",
        lineage: "Origem: Rotina de Anonimizacao (RF09) | Destino: Bloqueio de novos pedidos (RN06).",
        rbac: "GERENTE (SELECT), ADMINISTRADOR (SELECT, UPDATE)"
      },
      {
        attr: "data_anonimizacao",
        desc: "Data e hora da execucao da anonimizacao irreversivel apos quinquenio fiscal.",
        type: "DATETIME",
        constraints: ["[NULL]"],
        lgpd: "N/A",
        lineage: "Origem: Rotina de Anonimizacao (RF09) | Destino: Registro de conformidade LGPD.",
        rbac: "GERENTE (SELECT), ADMINISTRADOR (SELECT, UPDATE)"
      },
      {
        attr: "data_cadastro",
        desc: "Data e hora de criacao do registro do cliente (DEFAULT CURRENT_TIMESTAMP).",
        type: "DATETIME",
        constraints: ["[NOT NULL]"],
        lgpd: "N/A",
        lineage: "Origem: SGBD (CURRENT_TIMESTAMP) | Destino: Relatorios de base de clientes.",
        rbac: "ATENDENTE (SELECT), GERENTE (SELECT), ADMINISTRADOR (SELECT)"
      },
      {
        attr: "ativo",
        desc: "Flag de exclusao logica (DEFAULT 1). 1 = ativo, 0 = inativo.",
        type: "TINYINT(1)",
        constraints: ["[NOT NULL]"],
        lgpd: "N/A",
        lineage: "Origem: Regra RN06 / RF01 | Destino: Bloqueio de vinculacao em novos pedidos.",
        rbac: "ATENDENTE (SELECT), GERENTE (SELECT, UPDATE), ADMINISTRADOR (SELECT, UPDATE)"
      },
      {
        attr: "endereco_id_endereco",
        desc: "Chave estrangeira presente no DDL atual referenciando endereco.",
        type: "BIGINT",
        constraints: ["[FK]", "[NOT NULL]", "[INDEX]"],
        lgpd: "N/A",
        lineage: "Origem: endereco.id_endereco | Destino: Vinculo de endereco no DDL atual.",
        rbac: "ATENDENTE (SELECT, INSERT, UPDATE), GERENTE (SELECT, INSERT, UPDATE), ADMINISTRADOR (SELECT, INSERT, UPDATE)"
      },
      {
        attr: "pedido_id_pedido",
        desc: "Chave estrangeira presente no DDL atual referenciando pedido.",
        type: "BIGINT",
        constraints: ["[FK]", "[NOT NULL]", "[INDEX]"],
        lgpd: "N/A",
        lineage: "Origem: pedido.id_pedido | Destino: Vinculo de pedido no DDL atual.",
        rbac: "ATENDENTE (SELECT, INSERT, UPDATE), GERENTE (SELECT, INSERT, UPDATE), ADMINISTRADOR (SELECT)"
      }
    ]
  },
  {
    name: "endereco",
    purpose: "Enderecos de entrega ou cobranca vinculados aos clientes para atendimento nao presencial.",
    columns: [
      {
        attr: "id_endereco",
        desc: "Identificador unico surrogate do endereco.",
        type: "BIGINT",
        constraints: ["[PK]", "[NOT NULL]", "[AUTO_INCREMENT]"],
        lgpd: "N/A",
        lineage: "Origem: SGBD (AUTO_INCREMENT) | Destino: Pedidos de entrega e log_auditoria.",
        rbac: "ATENDENTE (SELECT), GERENTE (SELECT), ADMINISTRADOR (SELECT)"
      },
      {
        attr: "rotulo_endereco",
        desc: "Apelido identificador do endereco (ex: Casa, Trabalho, Entrega).",
        type: "VARCHAR(50)",
        constraints: ["[NOT NULL]"],
        lgpd: "DP",
        lineage: "Origem: Cadastro de Enderecos (RF07) | Destino: Selecao rapida no pedido.",
        rbac: "ATENDENTE (SELECT, INSERT, UPDATE), GERENTE (SELECT, INSERT, UPDATE), ADMINISTRADOR (SELECT, INSERT, UPDATE)"
      },
      {
        attr: "logradouro",
        desc: "Nome da rua, avenida ou praca do endereco do cliente.",
        type: "VARCHAR(100)",
        constraints: ["[NOT NULL]"],
        lgpd: "DP",
        lineage: "Origem: Base de CEPs / Formulario (RF07) | Destino: Etiqueta/comprovante de entrega.",
        rbac: "ATENDENTE (SELECT, INSERT, UPDATE), GERENTE (SELECT, INSERT, UPDATE), ADMINISTRADOR (SELECT, INSERT, UPDATE)"
      },
      {
        attr: "numero",
        desc: "Numero predial ou identificador do imovel (ex: 120, S/N).",
        type: "VARCHAR(20)",
        constraints: ["[NOT NULL]"],
        lgpd: "DP",
        lineage: "Origem: Formulario de Enderecos (RF07) | Destino: Entrega em domicilio.",
        rbac: "ATENDENTE (SELECT, INSERT, UPDATE), GERENTE (SELECT, INSERT, UPDATE), ADMINISTRADOR (SELECT, INSERT, UPDATE)"
      },
      {
        attr: "complemento",
        desc: "Informacoes adicionais de localizacao (apartamento, bloco, ponto de referencia).",
        type: "VARCHAR(50)",
        constraints: ["[NULL]"],
        lgpd: "DP",
        lineage: "Origem: Formulario de Enderecos (RF07) | Destino: Entrega em domicilio.",
        rbac: "ATENDENTE (SELECT, INSERT, UPDATE), GERENTE (SELECT, INSERT, UPDATE), ADMINISTRADOR (SELECT, INSERT, UPDATE)"
      },
      {
        attr: "bairro",
        desc: "Bairro do endereco informado pelo cliente.",
        type: "VARCHAR(100)",
        constraints: ["[NOT NULL]"],
        lgpd: "DP",
        lineage: "Origem: Base de CEPs / Formulario (RF07) | Destino: Entrega em domicilio.",
        rbac: "ATENDENTE (SELECT, INSERT, UPDATE), GERENTE (SELECT, INSERT, UPDATE), ADMINISTRADOR (SELECT, INSERT, UPDATE)"
      },
      {
        attr: "ativo",
        desc: "Flag de exclusao logica do endereco (DEFAULT 1).",
        type: "TINYINT(1)",
        constraints: ["[NOT NULL]"],
        lgpd: "N/A",
        lineage: "Origem: Regra RN06 / RF07 | Destino: Bloqueio de uso em novos pedidos.",
        rbac: "ATENDENTE (SELECT, UPDATE), GERENTE (SELECT, UPDATE), ADMINISTRADOR (SELECT, UPDATE)"
      },
      {
        attr: "pedido_id_pedido",
        desc: "Chave estrangeira presente no DDL atual referenciando pedido.",
        type: "BIGINT",
        constraints: ["[FK]", "[NOT NULL]", "[INDEX]"],
        lgpd: "N/A",
        lineage: "Origem: pedido.id_pedido | Destino: Vinculo com pedido no DDL atual.",
        rbac: "ATENDENTE (SELECT, INSERT, UPDATE), GERENTE (SELECT, INSERT, UPDATE), ADMINISTRADOR (SELECT)"
      }
    ]
  },
  {
    name: "estorno",
    purpose: "Registro financeiro e operacional de cancelamento e reembolso de pedidos (prazo legal CDC de 7 dias).",
    columns: [
      {
        attr: "id_estorno",
        desc: "Identificador unico surrogate do processo de estorno.",
        type: "BIGINT",
        constraints: ["[PK]", "[NOT NULL]", "[AUTO_INCREMENT]"],
        lgpd: "N/A",
        lineage: "Origem: SGBD (AUTO_INCREMENT) | Destino: Auditoria financeira e comprovante de cancelamento.",
        rbac: "ATENDENTE (DENY), GERENTE (SELECT), ADMINISTRADOR (SELECT)"
      },
      {
        attr: "data_solicitacao",
        desc: "Data e hora da solicitacao de estorno pelo cliente (DEFAULT CURRENT_TIMESTAMP).",
        type: "DATETIME",
        constraints: ["[NOT NULL]"],
        lgpd: "N/A",
        lineage: "Origem: SGBD (CURRENT_TIMESTAMP) | Destino: Validacao do prazo de 7 dias (PR02).",
        rbac: "ATENDENTE (DENY), GERENTE (SELECT, INSERT), ADMINISTRADOR (SELECT, INSERT)"
      },
      {
        attr: "data_efetivacao",
        desc: "Data e hora em que o reembolso financeiro foi concluido.",
        type: "DATETIME",
        constraints: ["[NULL]"],
        lgpd: "N/A",
        lineage: "Origem: Modulo de Estornos (RF08) | Destino: Conciliacao financeira e retencao CTN (PR01).",
        rbac: "ATENDENTE (DENY), GERENTE (SELECT, UPDATE), ADMINISTRADOR (SELECT, UPDATE)"
      },
      {
        attr: "motivo",
        desc: "Justificativa detalhada do cancelamento e solicitacao de estorno.",
        type: "TEXT",
        constraints: ["[NOT NULL]"],
        lgpd: "N/A",
        lineage: "Origem: Modulo de Estornos (RF08) | Destino: Auditoria e analise de qualidade.",
        rbac: "ATENDENTE (DENY), GERENTE (SELECT, INSERT, UPDATE), ADMINISTRADOR (SELECT, INSERT, UPDATE)"
      },
      {
        attr: "valor_estornado",
        desc: "Valor monetario devolvido ao cliente (CHECK > 0).",
        type: "DECIMAL(10,2)",
        constraints: ["[NOT NULL]"],
        lgpd: "N/A",
        lineage: "Origem: pedido.valor_liquido (RF08) | Destino: Relatorios financeiros e retencao fiscal.",
        rbac: "ATENDENTE (DENY), GERENTE (SELECT, INSERT, UPDATE), ADMINISTRADOR (SELECT, INSERT, UPDATE)"
      },
      {
        attr: "codigo_comprovante_estorno",
        desc: "Identificador da transacao ou comprovante de reembolso emitido pelo terminal POS/banco.",
        type: "VARCHAR(100)",
        constraints: ["[NULL]"],
        lgpd: "N/A",
        lineage: "Origem: Terminal POS externo (RF08) | Destino: Rastreabilidade financeira (PR01).",
        rbac: "ATENDENTE (DENY), GERENTE (SELECT, INSERT, UPDATE), ADMINISTRADOR (SELECT, INSERT, UPDATE)"
      },
      {
        attr: "situacao_estorno",
        desc: "Estado atual do fluxo de estorno (no DDL: 0 - EM ANDAMENTO, 1 - CONCLUIDO).",
        type: "VARCHAR(45)",
        constraints: ["[NOT NULL]"],
        lgpd: "N/A",
        lineage: "Origem: Modulo de Estornos (RF08) | Destino: Controle de pendencias financeiras.",
        rbac: "ATENDENTE (DENY), GERENTE (SELECT, INSERT, UPDATE), ADMINISTRADOR (SELECT, INSERT, UPDATE)"
      }
    ]
  },
  {
    name: "forma_pagamento",
    purpose: "Tabela de dominio parametrizada (3FN) contendo os meios de pagamento aceitos pela loja.",
    columns: [
      {
        attr: "id_forma_pagamento",
        desc: "Identificador unico surrogate da forma de pagamento.",
        type: "BIGINT",
        constraints: ["[PK]", "[NOT NULL]", "[AUTO_INCREMENT]"],
        lgpd: "N/A",
        lineage: "Origem: SGBD (AUTO_INCREMENT) | Destino: Pedidos e relatorios de faturamento.",
        rbac: "ATENDENTE (SELECT), GERENTE (SELECT), ADMINISTRADOR (SELECT)"
      },
      {
        attr: "nome",
        desc: "Descricao unica do meio de pagamento (ex: Dinheiro, PIX, Cartao de Credito).",
        type: "VARCHAR(100)",
        constraints: ["[NOT NULL]", "[UNIQUE]"],
        lgpd: "N/A",
        lineage: "Origem: Administracao de Dominios (RF05) | Destino: Tela de fechamento de pedido.",
        rbac: "ATENDENTE (SELECT), GERENTE (SELECT), ADMINISTRADOR (SELECT, INSERT, UPDATE)"
      },
      {
        attr: "permite_pagamento",
        desc: "Indicador booleano de habilitacao/parcelamento (DEFAULT 0; nomeado permite_parcelamento nos requisitos).",
        type: "TINYINT(1)",
        constraints: ["[NOT NULL]"],
        lgpd: "N/A",
        lineage: "Origem: Administracao de Dominios (RF05) | Destino: Regras de pagamento do pedido.",
        rbac: "ATENDENTE (SELECT), GERENTE (SELECT), ADMINISTRADOR (SELECT, INSERT, UPDATE)"
      },
      {
        attr: "ativo",
        desc: "Flag de exclusao logica (DEFAULT 1). Impede uso de meios descontinuados em novos pedidos.",
        type: "TINYINT(1)",
        constraints: ["[NOT NULL]"],
        lgpd: "N/A",
        lineage: "Origem: Regra RN06 / RF05 | Destino: Filtro de formas de pagamento ativas.",
        rbac: "ATENDENTE (SELECT), GERENTE (SELECT), ADMINISTRADOR (SELECT, UPDATE)"
      },
      {
        attr: "pedido_id_pedido",
        desc: "Chave estrangeira presente no DDL atual referenciando pedido.",
        type: "BIGINT",
        constraints: ["[FK]", "[NOT NULL]", "[INDEX]"],
        lgpd: "N/A",
        lineage: "Origem: pedido.id_pedido | Destino: Vinculo de pedido no DDL atual.",
        rbac: "GERENTE (SELECT), ADMINISTRADOR (SELECT, INSERT, UPDATE)"
      }
    ]
  },
  {
    name: "historico_preco",
    purpose: "Registro historico imutavel de alteracoes no preco de tabela dos produtos (RN08).",
    columns: [
      {
        attr: "id_historico_preco",
        desc: "Identificador unico surrogate do evento de reajuste de preco.",
        type: "BIGINT",
        constraints: ["[PK]", "[NOT NULL]", "[AUTO_INCREMENT]"],
        lgpd: "N/A",
        lineage: "Origem: SGBD (AUTO_INCREMENT via Trigger) | Destino: Auditoria de precificacao.",
        rbac: "ATENDENTE (DENY), GERENTE (SELECT), ADMINISTRADOR (SELECT)"
      },
      {
        attr: "preco_anterior",
        desc: "Valor unitario de tabela praticado antes da alteracao.",
        type: "DECIMAL(10,2)",
        constraints: ["[NOT NULL]"],
        lgpd: "N/A",
        lineage: "Origem: OLD.produto.preco_tabela | Destino: Analise de evolucao de precos.",
        rbac: "ATENDENTE (DENY), GERENTE (SELECT), ADMINISTRADOR (SELECT)"
      },
      {
        attr: "preco_novo",
        desc: "Novo valor unitario de tabela aplicado ao produto.",
        type: "DECIMAL(10,2)",
        constraints: ["[NOT NULL]"],
        lgpd: "N/A",
        lineage: "Origem: NEW.produto.preco_tabela | Destino: Analise de evolucao de precos.",
        rbac: "ATENDENTE (DENY), GERENTE (SELECT), ADMINISTRADOR (SELECT)"
      },
      {
        attr: "data_alteracao",
        desc: "Data e hora exata do reajuste de preco (DEFAULT CURRENT_TIMESTAMP).",
        type: "DATETIME",
        constraints: ["[NOT NULL]"],
        lgpd: "N/A",
        lineage: "Origem: SGBD (CURRENT_TIMESTAMP) | Destino: Linha do tempo de precos (RN08).",
        rbac: "ATENDENTE (DENY), GERENTE (SELECT), ADMINISTRADOR (SELECT)"
      }
    ]
  },
  {
    name: "item_pedido",
    purpose: "Entidade associativa que registra os produtos, quantidades e precos congelados de cada pedido.",
    columns: [
      {
        attr: "id_item_pedido",
        desc: "Identificador unico surrogate da linha do item no pedido.",
        type: "BIGINT",
        constraints: ["[PK]", "[NOT NULL]", "[AUTO_INCREMENT]"],
        lgpd: "N/A",
        lineage: "Origem: SGBD (AUTO_INCREMENT) | Destino: Comprovante de venda e auditoria.",
        rbac: "ATENDENTE (SELECT, INSERT), GERENTE (SELECT, INSERT), ADMINISTRADOR (SELECT)"
      },
      {
        attr: "quantidade",
        desc: "Quantidade de unidades vendidas do produto no pedido (CHECK > 0).",
        type: "INT",
        constraints: ["[NOT NULL]"],
        lgpd: "N/A",
        lineage: "Origem: Tela de Vendas (RF02) | Destino: Baixa em produto.saldo_estoque e calculo de valor_bruto.",
        rbac: "ATENDENTE (SELECT, INSERT, UPDATE se ABERTO), GERENTE (SELECT, INSERT, UPDATE se ABERTO), ADMINISTRADOR (SELECT)"
      },
      {
        attr: "preco_unitario_venda",
        desc: "Preco unitario congelado automaticamente a partir de produto.preco_tabela no ato da venda (RN03).",
        type: "DECIMAL(10,2)",
        constraints: ["[NOT NULL]"],
        lgpd: "N/A",
        lineage: "Origem: produto.preco_tabela (via Trigger) | Destino: Calculo de valor_bruto e retencao fiscal (PR01).",
        rbac: "ATENDENTE (SELECT), GERENTE (SELECT), ADMINISTRADOR (SELECT)"
      }
    ]
  },
  {
    name: "log_auditoria",
    purpose: "Trilha de auditoria imutavel (append-only) para rastreamento de operacoes sensiveis e conformidade legal.",
    columns: [
      {
        attr: "id_log_auditoria",
        desc: "Identificador unico surrogate do evento de auditoria.",
        type: "BIGINT",
        constraints: ["[PK]", "[NOT NULL]", "[AUTO_INCREMENT]"],
        lgpd: "N/A",
        lineage: "Origem: SGBD (AUTO_INCREMENT via Trigger) | Destino: Consulta de auditoria e compliance.",
        rbac: "ATENDENTE (DENY), GERENTE (DENY), ADMINISTRADOR (SELECT exclusivo)"
      },
      {
        attr: "tabela_afetada",
        desc: "Nome da tabela alvo da operacao auditada.",
        type: "VARCHAR(100)",
        constraints: ["[NOT NULL]"],
        lgpd: "N/A",
        lineage: "Origem: Trigger de Auditoria (RNF01) | Destino: Filtros de investigacao e compliance.",
        rbac: "ATENDENTE (DENY), GERENTE (DENY), ADMINISTRADOR (SELECT)"
      },
      {
        attr: "id_registro_afetado",
        desc: "Chave primaria do registro modificado na tabela auditada.",
        type: "BIGINT",
        constraints: ["[NOT NULL]"],
        lgpd: "N/A",
        lineage: "Origem: PK do registro afetado | Destino: Rastreamento historico por entidade.",
        rbac: "ATENDENTE (DENY), GERENTE (DENY), ADMINISTRADOR (SELECT)"
      },
      {
        attr: "operacao",
        desc: "Tipo de evento executado (INSERT, UPDATE, INATIVACAO, CANCELAMENTO, ANONIMIZACAO).",
        type: "VARCHAR(45)",
        constraints: ["[NOT NULL]"],
        lgpd: "N/A",
        lineage: "Origem: Trigger / Stored Procedure | Destino: Relatorios de seguranca e auditoria.",
        rbac: "ATENDENTE (DENY), GERENTE (DENY), ADMINISTRADOR (SELECT)"
      },
      {
        attr: "data_hora",
        desc: "Carimbo temporal exato da operacao (DEFAULT CURRENT_TIMESTAMP).",
        type: "DATETIME",
        constraints: ["[NOT NULL]"],
        lgpd: "N/A",
        lineage: "Origem: SGBD (CURRENT_TIMESTAMP) | Destino: Retencao Marco Civil e CTN (PR05 / PR01).",
        rbac: "ATENDENTE (DENY), GERENTE (DENY), ADMINISTRADOR (SELECT)"
      },
      {
        attr: "ip_origem",
        desc: "Endereco IPv4 ou IPv6 da sessao que originou a operacao (Marco Civil da Internet).",
        type: "VARCHAR(45)",
        constraints: ["[NOT NULL]"],
        lgpd: "DP",
        lineage: "Origem: Camada de Aplicacao / Sessao | Destino: Evidencia de acesso (PR05).",
        rbac: "ATENDENTE (DENY), GERENTE (DENY), ADMINISTRADOR (SELECT)"
      },
      {
        attr: "valor_anterior",
        desc: "Snapshot JSON do estado anterior do registro (com mascaramento de dados sensiveis).",
        type: "JSON",
        constraints: ["[NULL]"],
        lgpd: "DP",
        lineage: "Origem: OLD.* (Trigger BEFORE/AFTER) | Destino: Pericia de alteracoes (RNF01).",
        rbac: "ATENDENTE (DENY), GERENTE (DENY), ADMINISTRADOR (SELECT)"
      },
      {
        attr: "valor_novo",
        desc: "Snapshot JSON do novo estado do registro apos a operacao.",
        type: "JSON",
        constraints: ["[NULL]"],
        lgpd: "DP",
        lineage: "Origem: NEW.* (Trigger AFTER) | Destino: Pericia de alteracoes (RNF01).",
        rbac: "ATENDENTE (DENY), GERENTE (DENY), ADMINISTRADOR (SELECT)"
      }
    ]
  },
  {
    name: "movimentacao_estoque",
    purpose: "Kardex completo de entradas por compra, saidas por venda, estornos e ajustes de inventario.",
    columns: [
      {
        attr: "id_movimentacao_estoque",
        desc: "Identificador unico surrogate da movimentacao de estoque.",
        type: "INT",
        constraints: ["[PK]", "[NOT NULL]", "[AUTO_INCREMENT]"],
        lgpd: "N/A",
        lineage: "Origem: SGBD (AUTO_INCREMENT) | Destino: Auditoria de estoque (RF10).",
        rbac: "ATENDENTE (INSERT indireto via venda), GERENTE (SELECT, INSERT), ADMINISTRADOR (SELECT, INSERT)"
      },
      {
        attr: "tipo_movimentacao",
        desc: "Natureza da operacao (ENTRADA_COMPRA, SAIDA_VENDA, ENTRADA_ESTORNO, AJUSTE_POSITIVO, AJUSTE_NEGATIVO).",
        type: "VARCHAR(45)",
        constraints: ["[NOT NULL]"],
        lgpd: "N/A",
        lineage: "Origem: Venda (RF02), Estorno (RF08) ou Ajuste (RF10) | Destino: Relatorios de giro e kardex.",
        rbac: "ATENDENTE (INSERT indireto), GERENTE (SELECT, INSERT), ADMINISTRADOR (SELECT, INSERT)"
      },
      {
        attr: "quantidade",
        desc: "Quantidade de unidades movimentadas na operacao (CHECK > 0).",
        type: "INT",
        constraints: ["[NOT NULL]"],
        lgpd: "N/A",
        lineage: "Origem: item_pedido.quantidade ou Formulario RF10 | Destino: Atualizacao de produto.saldo_estoque.",
        rbac: "ATENDENTE (INSERT indireto), GERENTE (SELECT, INSERT), ADMINISTRADOR (SELECT, INSERT)"
      },
      {
        attr: "saldo_anterior",
        desc: "Saldo fisico do produto imediatamente antes da movimentacao (sob bloqueio FOR UPDATE).",
        type: "INT",
        constraints: ["[NOT NULL]"],
        lgpd: "N/A",
        lineage: "Origem: produto.saldo_estoque (pre-operacao) | Destino: Rastreabilidade de inventario.",
        rbac: "ATENDENTE (DENY), GERENTE (SELECT), ADMINISTRADOR (SELECT)"
      },
      {
        attr: "saldo_posterior",
        desc: "Saldo fisico resultante imediatamente apos a movimentacao.",
        type: "INT",
        constraints: ["[NOT NULL]"],
        lgpd: "N/A",
        lineage: "Origem: Calculo atomico na transacao | Destino: Conferencia de saldo em produto.",
        rbac: "ATENDENTE (DENY), GERENTE (SELECT), ADMINISTRADOR (SELECT)"
      },
      {
        attr: "documento_referencia",
        desc: "Numero da nota fiscal de compra, termo de inventario ou referencia externa.",
        type: "VARCHAR(100)",
        constraints: ["[NULL]"],
        lgpd: "N/A",
        lineage: "Origem: Formulario de Movimentacao (RF10) | Destino: Auditoria fiscal e de compras.",
        rbac: "GERENTE (SELECT, INSERT), ADMINISTRADOR (SELECT, INSERT)"
      },
      {
        attr: "observacao",
        desc: "Anotacoes operacionais sobre avarias, divergencias ou motivo do ajuste.",
        type: "TEXT",
        constraints: ["[NULL]"],
        lgpd: "N/A",
        lineage: "Origem: Formulario de Movimentacao (RF10) | Destino: Consulta gerencial.",
        rbac: "GERENTE (SELECT, INSERT), ADMINISTRADOR (SELECT, INSERT)"
      },
      {
        attr: "data_movimentacao",
        desc: "Data e hora do lancamento no kardex (DEFAULT CURRENT_TIMESTAMP).",
        type: "VARCHAR(45)",
        constraints: ["[NOT NULL]"],
        lgpd: "N/A",
        lineage: "Origem: SGBD (CURRENT_TIMESTAMP) | Destino: Linha do tempo de estoque.",
        rbac: "GERENTE (SELECT), ADMINISTRADOR (SELECT)"
      }
    ]
  },
  {
    name: "pedido",
    purpose: "Cabecalho das vendas presenciais e nao presenciais, controlando situacao, descontos e totais.",
    columns: [
      {
        attr: "id_pedido",
        desc: "Identificador unico surrogate do pedido de venda.",
        type: "BIGINT",
        constraints: ["[PK]", "[NOT NULL]", "[AUTO_INCREMENT]"],
        lgpd: "N/A",
        lineage: "Origem: SGBD (AUTO_INCREMENT) | Destino: Comprovante, estorno, kardex e auditoria.",
        rbac: "ATENDENTE (SELECT proprios, INSERT), GERENTE (SELECT todos, INSERT), ADMINISTRADOR (SELECT todos)"
      },
      {
        attr: "modalidade_venda",
        desc: "Canal de realizacao da venda (0 - PRESENCIAL, 1 - NAO_PRESENCIAL).",
        type: "VARCHAR(45)",
        constraints: ["[NOT NULL]"],
        lgpd: "N/A",
        lineage: "Origem: Tela de Vendas (RF02) | Destino: Obrigatoriedade de endereco (RN02) e regra CDC 7 dias (PR02).",
        rbac: "ATENDENTE (SELECT, INSERT), GERENTE (SELECT, INSERT), ADMINISTRADOR (SELECT)"
      },
      {
        attr: "data_hora",
        desc: "Data e hora de abertura/emissao do pedido (DEFAULT CURRENT_TIMESTAMP).",
        type: "DATETIME",
        constraints: ["[NOT NULL]"],
        lgpd: "N/A",
        lineage: "Origem: SGBD (CURRENT_TIMESTAMP) | Destino: Relatorios historicos (RF04) e retencao de 5 anos (PR01).",
        rbac: "ATENDENTE (SELECT), GERENTE (SELECT), ADMINISTRADOR (SELECT)"
      },
      {
        attr: "data_entrega",
        desc: "Data de recebimento efetivo em vendas nao presenciais (base para contagem de 7 dias do CDC).",
        type: "VARCHAR(45)",
        constraints: ["[NULL]"],
        lgpd: "N/A",
        lineage: "Origem: Confirmacao de Entrega (RF02/RF08) | Destino: Validacao de estorno (PR02).",
        rbac: "ATENDENTE (SELECT, UPDATE), GERENTE (SELECT, UPDATE), ADMINISTRADOR (SELECT)"
      },
      {
        attr: "data_cancelamento",
        desc: "Data e hora em que o pedido foi cancelado.",
        type: "DATETIME",
        constraints: ["[NULL]"],
        lgpd: "N/A",
        lineage: "Origem: sp_cancelar_pedido_estorno (RF08) | Destino: Auditoria de cancelamentos.",
        rbac: "ATENDENTE (SELECT), GERENTE (SELECT, UPDATE), ADMINISTRADOR (SELECT)"
      },
      {
        attr: "situacao",
        desc: "Maquina de estados do pedido (0 - ABERTO, 1 - FINALIZADO, 2 - CANCELADO).",
        type: "VARCHAR(45)",
        constraints: ["[NOT NULL]"],
        lgpd: "N/A",
        lineage: "Origem: Fluxo de Pedido (RN01 / RN07) | Destino: Bloqueio de edicao apos finalizacao.",
        rbac: "ATENDENTE (SELECT, INSERT), GERENTE (SELECT, INSERT, UPDATE para CANCELADO), ADMINISTRADOR (SELECT)"
      },
      {
        attr: "valor_bruto",
        desc: "Somatorio de (quantidade * preco_unitario_venda) dos itens do pedido (DEFAULT 0).",
        type: "DECIMAL(10,2)",
        constraints: ["[NOT NULL]"],
        lgpd: "N/A",
        lineage: "Origem: Itens do Pedido (RN05) | Destino: Calculo de valor_liquido e relatorios (RF04).",
        rbac: "ATENDENTE (SELECT), GERENTE (SELECT), ADMINISTRADOR (SELECT)"
      },
      {
        attr: "valor_desconto",
        desc: "Desconto concedido dentro da alcada: ate 10% ATENDENTE, ate 30% GERENTE (DEFAULT 0).",
        type: "DECIMAL(10,2)",
        constraints: ["[NOT NULL]"],
        lgpd: "N/A",
        lineage: "Origem: Tela de Vendas (RF02 / RN05) | Destino: Calculo de valor_liquido e auditoria de descontos.",
        rbac: "ATENDENTE (SELECT, INSERT/UPDATE <= 10%), GERENTE (SELECT, INSERT/UPDATE <= 30%), ADMINISTRADOR (SELECT)"
      },
      {
        attr: "valor_liquido",
        desc: "Valor final a pagar pelo cliente, equivalente a valor_bruto - valor_desconto (RN05).",
        type: "DECIMAL(10,2)",
        constraints: ["[NOT NULL]"],
        lgpd: "N/A",
        lineage: "Origem: Calculo RN05 | Destino: Pagamento POS, estorno e retencao tributaria (PR01).",
        rbac: "ATENDENTE (SELECT), GERENTE (SELECT), ADMINISTRADOR (SELECT)"
      },
      {
        attr: "codigo_transacao_pagamento",
        desc: "NSU ou codigo de autorizacao retornado pelo terminal POS externo.",
        type: "VARCHAR(100)",
        constraints: ["[NULL]"],
        lgpd: "N/A",
        lineage: "Origem: Terminal POS externo (RF02) | Destino: Conciliacao de vendas e estornos.",
        rbac: "ATENDENTE (SELECT, INSERT), GERENTE (SELECT, INSERT, UPDATE), ADMINISTRADOR (SELECT)"
      },
      {
        attr: "item_pedido_id_item_pedido",
        desc: "Chave estrangeira presente no DDL atual referenciando item_pedido.",
        type: "BIGINT",
        constraints: ["[FK]", "[NOT NULL]", "[INDEX]"],
        lgpd: "N/A",
        lineage: "Origem: item_pedido.id_item_pedido | Destino: Vinculo de item no DDL atual.",
        rbac: "ATENDENTE (SELECT, INSERT), GERENTE (SELECT, INSERT), ADMINISTRADOR (SELECT)"
      },
      {
        attr: "estorno_id_estorno",
        desc: "Chave estrangeira presente no DDL atual referenciando estorno.",
        type: "BIGINT",
        constraints: ["[FK]", "[NOT NULL]", "[INDEX]"],
        lgpd: "N/A",
        lineage: "Origem: estorno.id_estorno | Destino: Vinculo de estorno no DDL atual.",
        rbac: "GERENTE (SELECT, INSERT, UPDATE), ADMINISTRADOR (SELECT)"
      }
    ]
  },
  {
    name: "produto",
    purpose: "Catalogo de produtos cosmeticos com controle de SKU, preco vigente, saldo fisico, lote e validade ANVISA.",
    columns: [
      {
        attr: "id_produto",
        desc: "Identificador unico surrogate do produto.",
        type: "BIGINT",
        constraints: ["[PK]", "[NOT NULL]", "[AUTO_INCREMENT]"],
        lgpd: "N/A",
        lineage: "Origem: SGBD (AUTO_INCREMENT) | Destino: Itens de pedido, historico_preco e kardex.",
        rbac: "ATENDENTE (SELECT ativos), GERENTE (SELECT), ADMINISTRADOR (SELECT)"
      },
      {
        attr: "codigo_sku",
        desc: "Codigo de identificacao unico do produto no catalogo (Stock Keeping Unit).",
        type: "VARCHAR(50)",
        constraints: ["[NOT NULL]", "[UNIQUE]"],
        lgpd: "N/A",
        lineage: "Origem: Cadastro de Produtos (RF03) | Destino: Busca rapida no PDV e inventario.",
        rbac: "ATENDENTE (SELECT), GERENTE (SELECT, INSERT, UPDATE), ADMINISTRADOR (SELECT, INSERT, UPDATE)"
      },
      {
        attr: "descricao",
        desc: "Nome comercial e especificacao do item cosmetico.",
        type: "VARCHAR(255)",
        constraints: ["[NULL]"],
        lgpd: "N/A",
        lineage: "Origem: Cadastro de Produtos (RF03) | Destino: Comprovante do pedido e catalogo.",
        rbac: "ATENDENTE (SELECT), GERENTE (SELECT, INSERT, UPDATE), ADMINISTRADOR (SELECT, INSERT, UPDATE)"
      },
      {
        attr: "preco_tabela",
        desc: "Preco unitario vigente de venda no catalogo (CHECK > 0).",
        type: "DECIMAL(10,2)",
        constraints: ["[NOT NULL]"],
        lgpd: "N/A",
        lineage: "Origem: Cadastro de Produtos (RF03) | Destino: Copia congelada em item_pedido e historico_preco.",
        rbac: "ATENDENTE (SELECT), GERENTE (SELECT, INSERT, UPDATE), ADMINISTRADOR (SELECT, INSERT, UPDATE)"
      },
      {
        attr: "saldo_estoque",
        desc: "Quantidade fisica disponivel para venda imediata (CHECK >= 0).",
        type: "INT",
        constraints: ["[NOT NULL]"],
        lgpd: "N/A",
        lineage: "Origem: Entrada inicial (RF03) / Movimentacoes (RF02, RF08, RF10) | Destino: Trava de venda (RN04).",
        rbac: "ATENDENTE (SELECT), GERENTE (SELECT, UPDATE via RF10), ADMINISTRADOR (SELECT, UPDATE via RF10)"
      },
      {
        attr: "lote_atual",
        desc: "Codigo do lote de fabricacao vigente para rastreabilidade sanitaria ANVISA (PR04).",
        type: "VARCHAR(30)",
        constraints: ["[NOT NULL]"],
        lgpd: "N/A",
        lineage: "Origem: Cadastro/Entrada de Lote (RF03/RF10) | Destino: Rastreabilidade sanitaria (PR04).",
        rbac: "ATENDENTE (SELECT), GERENTE (SELECT, INSERT, UPDATE), ADMINISTRADOR (SELECT, INSERT, UPDATE)"
      },
      {
        attr: "data_validade",
        desc: "Data de vencimento sanitario do lote atual. Vendas bloqueadas se vencido (PR04).",
        type: "DATE",
        constraints: ["[NOT NULL]"],
        lgpd: "N/A",
        lineage: "Origem: Cadastro/Entrada de Lote (RF03/RF10) | Destino: Trava sanitaria na venda (PR04).",
        rbac: "ATENDENTE (SELECT), GERENTE (SELECT, INSERT, UPDATE), ADMINISTRADOR (SELECT, INSERT, UPDATE)"
      },
      {
        attr: "registro_anvisa",
        desc: "Numero de registro ou notificacao do cosmetico junto a ANVISA (RDC 07/2015).",
        type: "VARCHAR(20)",
        constraints: ["[NULL]"],
        lgpd: "N/A",
        lineage: "Origem: Cadastro de Produtos (RF03) | Destino: Auditoria sanitaria (PR04).",
        rbac: "ATENDENTE (SELECT), GERENTE (SELECT, INSERT, UPDATE), ADMINISTRADOR (SELECT, INSERT, UPDATE)"
      },
      {
        attr: "data_cadastro",
        desc: "Data e hora de inclusao do produto no catalogo (DEFAULT CURRENT_TIMESTAMP).",
        type: "DATETIME",
        constraints: ["[NOT NULL]"],
        lgpd: "N/A",
        lineage: "Origem: SGBD (CURRENT_TIMESTAMP) | Destino: Auditoria de catalogo.",
        rbac: "ATENDENTE (SELECT), GERENTE (SELECT), ADMINISTRADOR (SELECT)"
      },
      {
        attr: "ativo",
        desc: "Flag de exclusao logica (DEFAULT 1). Produtos inativos sao bloqueados em novas vendas (RN06).",
        type: "TINYINT(1)",
        constraints: ["[NOT NULL]"],
        lgpd: "N/A",
        lineage: "Origem: Gestao de Catalogo (RF03) | Destino: Filtro de catalogo ativo.",
        rbac: "ATENDENTE (SELECT), GERENTE (SELECT, UPDATE), ADMINISTRADOR (SELECT, UPDATE)"
      },
      {
        attr: "historico_preco_id_historico_preco",
        desc: "Chave estrangeira presente no DDL atual referenciando historico_preco.",
        type: "BIGINT",
        constraints: ["[FK]", "[NOT NULL]", "[INDEX]"],
        lgpd: "N/A",
        lineage: "Origem: historico_preco.id_historico_preco | Destino: Vinculo de historico no DDL atual.",
        rbac: "GERENTE (SELECT), ADMINISTRADOR (SELECT)"
      },
      {
        attr: "movimentacao_estoque_id_movimentacao_estoque",
        desc: "Chave estrangeira presente no DDL atual referenciando movimentacao_estoque.",
        type: "INT",
        constraints: ["[FK]", "[NOT NULL]", "[INDEX]"],
        lgpd: "N/A",
        lineage: "Origem: movimentacao_estoque.id_movimentacao_estoque | Destino: Vinculo de estoque no DDL atual.",
        rbac: "GERENTE (SELECT, INSERT), ADMINISTRADOR (SELECT, INSERT)"
      },
      {
        attr: "item_pedido_id_item_pedido",
        desc: "Chave estrangeira presente no DDL atual referenciando item_pedido.",
        type: "BIGINT",
        constraints: ["[FK]", "[NOT NULL]", "[INDEX]"],
        lgpd: "N/A",
        lineage: "Origem: item_pedido.id_item_pedido | Destino: Vinculo de item no DDL atual.",
        rbac: "ATENDENTE (SELECT, INSERT), GERENTE (SELECT, INSERT), ADMINISTRADOR (SELECT)"
      }
    ]
  },
  {
    name: "usuario",
    purpose: "Cadastro de operadores internos do sistema com autenticacao segura e perfil de acesso RBAC.",
    columns: [
      {
        attr: "id_usuario",
        desc: "Identificador unico surrogate do operador do sistema.",
        type: "BIGINT",
        constraints: ["[PK]", "[NOT NULL]", "[AUTO_INCREMENT]"],
        lgpd: "N/A",
        lineage: "Origem: SGBD (AUTO_INCREMENT) | Destino: Pedidos, estornos, estoque, precos e log_auditoria.",
        rbac: "ATENDENTE (DENY), GERENTE (SELECT), ADMINISTRADOR (SELECT)"
      },
      {
        attr: "nome",
        desc: "Nome completo do colaborador operador do sistema.",
        type: "VARCHAR(100)",
        constraints: ["[NOT NULL]"],
        lgpd: "DP",
        lineage: "Origem: Administracao de Usuarios (RF05) | Destino: Identificacao em pedidos e relatorios.",
        rbac: "ATENDENTE (DENY), GERENTE (SELECT), ADMINISTRADOR (SELECT, INSERT, UPDATE)"
      },
      {
        attr: "login",
        desc: "Identificador unico de acesso (username) para autenticacao.",
        type: "VARCHAR(100)",
        constraints: ["[NOT NULL]", "[UNIQUE]"],
        lgpd: "DP",
        lineage: "Origem: Administracao de Usuarios (RF05) | Destino: Autenticacao e sessao RBAC.",
        rbac: "ATENDENTE (DENY), GERENTE (SELECT), ADMINISTRADOR (SELECT, INSERT, UPDATE)"
      },
      {
        attr: "email",
        desc: "E-mail corporativo unico do usuario para recuperacao e contato.",
        type: "VARCHAR(255)",
        constraints: ["[NOT NULL]", "[UNIQUE]"],
        lgpd: "DP",
        lineage: "Origem: Administracao de Usuarios (RF05) | Destino: Comunicacoes administrativas.",
        rbac: "ATENDENTE (DENY), GERENTE (SELECT), ADMINISTRADOR (SELECT, INSERT, UPDATE)"
      },
      {
        attr: "senha_hash",
        desc: "Resumo criptografico da senha em Argon2id ou bcrypt custo >= 12 (nunca texto claro).",
        type: "VARCHAR(255)",
        constraints: ["[NOT NULL]"],
        lgpd: "DPS",
        lineage: "Origem: Servico de Autenticacao (RF05 / RNF09) | Destino: Validacao de login (nao exportavel).",
        rbac: "ATENDENTE (DENY), GERENTE (DENY), ADMINISTRADOR (INSERT/UPDATE via hash seguro; leitura restrita ao modulo auth)"
      },
      {
        attr: "perfil",
        desc: "Papel RBAC atribuido ao operador (0 - ATENDENTE, 1 - GERENTE, 2 - ADMINISTRADOR).",
        type: "VARCHAR(45)",
        constraints: ["[NOT NULL]"],
        lgpd: "N/A",
        lineage: "Origem: Administracao de Usuarios (RF05) | Destino: Controle de alcadas e permissoes (RNF01).",
        rbac: "ATENDENTE (DENY), GERENTE (SELECT), ADMINISTRADOR (SELECT, INSERT, UPDATE)"
      },
      {
        attr: "data_cadastro",
        desc: "Data e hora de criacao da conta do operador (DEFAULT CURRENT_TIMESTAMP).",
        type: "DATETIME",
        constraints: ["[NOT NULL]"],
        lgpd: "N/A",
        lineage: "Origem: SGBD (CURRENT_TIMESTAMP) | Destino: Auditoria de contas.",
        rbac: "ATENDENTE (DENY), GERENTE (SELECT), ADMINISTRADOR (SELECT)"
      },
      {
        attr: "data_ultimo_acesso",
        desc: "Data e hora da ultima autenticacao bem-sucedida do usuario.",
        type: "DATETIME",
        constraints: ["[NULL]"],
        lgpd: "N/A",
        lineage: "Origem: Servico de Autenticacao (RF05) | Destino: Monitoramento de contas inativas.",
        rbac: "ATENDENTE (DENY), GERENTE (SELECT), ADMINISTRADOR (SELECT, UPDATE automatico)"
      },
      {
        attr: "ativo",
        desc: "Flag de exclusao logica (DEFAULT 1). Usuarios com ativo = 0 tem login bloqueado (RN06).",
        type: "TINYINT(1)",
        constraints: ["[NOT NULL]"],
        lgpd: "N/A",
        lineage: "Origem: Administracao de Usuarios (RF05) | Destino: Trava de autenticacao e novos pedidos.",
        rbac: "ATENDENTE (DENY), GERENTE (SELECT), ADMINISTRADOR (SELECT, UPDATE)"
      },
      {
        attr: "pedido_id_pedido",
        desc: "Chave estrangeira presente no DDL atual referenciando pedido.",
        type: "BIGINT",
        constraints: ["[FK]", "[NOT NULL]", "[INDEX]"],
        lgpd: "N/A",
        lineage: "Origem: pedido.id_pedido | Destino: Vinculo de pedido no DDL atual.",
        rbac: "GERENTE (SELECT), ADMINISTRADOR (SELECT, INSERT, UPDATE)"
      },
      {
        attr: "estorno_id_estorno",
        desc: "Chave estrangeira presente no DDL atual referenciando estorno.",
        type: "BIGINT",
        constraints: ["[FK]", "[NOT NULL]", "[INDEX]"],
        lgpd: "N/A",
        lineage: "Origem: estorno.id_estorno | Destino: Vinculo de estorno no DDL atual.",
        rbac: "GERENTE (SELECT), ADMINISTRADOR (SELECT, INSERT, UPDATE)"
      },
      {
        attr: "movimentacao_estoque_id_movimentacao_estoque",
        desc: "Chave estrangeira presente no DDL atual referenciando movimentacao_estoque.",
        type: "INT",
        constraints: ["[FK]", "[NOT NULL]", "[INDEX]"],
        lgpd: "N/A",
        lineage: "Origem: movimentacao_estoque.id_movimentacao_estoque | Destino: Vinculo de estoque no DDL atual.",
        rbac: "GERENTE (SELECT), ADMINISTRADOR (SELECT, INSERT, UPDATE)"
      },
      {
        attr: "historico_preco_id_historico_preco",
        desc: "Chave estrangeira presente no DDL atual referenciando historico_preco.",
        type: "BIGINT",
        constraints: ["[FK]", "[NOT NULL]", "[INDEX]"],
        lgpd: "N/A",
        lineage: "Origem: historico_preco.id_historico_preco | Destino: Vinculo de historico no DDL atual.",
        rbac: "GERENTE (SELECT), ADMINISTRADOR (SELECT, INSERT, UPDATE)"
      },
      {
        attr: "log_auditoria_id_log_auditoria",
        desc: "Chave estrangeira presente no DDL atual referenciando log_auditoria.",
        type: "BIGINT",
        constraints: ["[FK]", "[NOT NULL]", "[INDEX]"],
        lgpd: "N/A",
        lineage: "Origem: log_auditoria.id_log_auditoria | Destino: Vinculo de auditoria no DDL atual.",
        rbac: "ADMINISTRADOR (SELECT, INSERT, UPDATE)"
      }
    ]
  }
];

function getLgpdBadge(level) {
  if (level === "DPS") {
    return '<span class="badge badge-dps">[DPS] Sensivel</span>';
  }
  if (level === "DP") {
    return '<span class="badge badge-dp">[DP] Pessoal</span>';
  }
  return '<span class="badge badge-na">[N/A]</span>';
}

function renderDictionary() {
  const nav = document.getElementById("sidebar-nav");
  const container = document.getElementById("dictionary-container");

  nav.innerHTML = "";
  container.innerHTML = "";

  DATA_DICTIONARY.forEach((table) => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = `#${table.name}`;
    link.dataset.target = table.name;
    link.innerHTML = `<span>${table.name}</span><span class="col-count">${table.columns.length}</span>`;
    link.addEventListener("click", () => {
      document.getElementById("sidebar").classList.remove("open");
    });
    li.appendChild(link);
    nav.appendChild(li);

    const section = document.createElement("section");
    section.id = table.name;
    section.className = "card table-section";
    section.dataset.tableName = table.name.toLowerCase();

    const rowsHtml = table.columns
      .map((col) => {
        const constraintsHtml = col.constraints
          .map((c) => `<span class="constraint-tag">${c}</span>`)
          .join("");
        return `
          <tr data-attr-name="${col.attr.toLowerCase()}">
            <td class="col-attr">${col.attr}</td>
            <td>${col.desc}</td>
            <td class="col-type">${col.type}</td>
            <td>${constraintsHtml}</td>
            <td>${getLgpdBadge(col.lgpd)}</td>
            <td>${col.lineage}</td>
            <td>${col.rbac}</td>
          </tr>
        `;
      })
      .join("");

    section.innerHTML = `
      <div class="table-section-header">
        <h3>${table.name}</h3>
        <span class="table-attr-count">${table.columns.length} atributos</span>
      </div>
      <p class="table-purpose">${table.purpose}</p>
      <div class="table-responsive">
        <table class="dict-table">
          <thead>
            <tr>
              <th>Atributo</th>
              <th>Descricao / Regra de Negocio</th>
              <th>Tipo e Tamanho</th>
              <th>Constraints</th>
              <th>Privacidade (LGPD/GDPR)</th>
              <th>Linhagem (Data Lineage)</th>
              <th>Controle de Acesso (RBAC)</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </div>
    `;

    container.appendChild(section);
  });
}

function setupSearchFilter() {
  const input = document.getElementById("search-input");
  const stats = document.getElementById("search-stats");
  const emptyState = document.getElementById("empty-state");

  input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();
    const sections = document.querySelectorAll(".table-section");
    const navLinks = document.querySelectorAll("#sidebar-nav a");

    let visibleTables = 0;
    let visibleCols = 0;

    sections.forEach((section) => {
      const tableName = section.dataset.tableName;
      const tableMatches = tableName.includes(query);
      const rows = section.querySelectorAll("tbody tr");
      let matchingRowsInTable = 0;

      rows.forEach((row) => {
        const attrName = row.dataset.attrName;
        if (!query || tableMatches || attrName.includes(query)) {
          row.classList.remove("hidden");
          matchingRowsInTable++;
          visibleCols++;
        } else {
          row.classList.add("hidden");
        }
      });

      const navLink = Array.from(navLinks).find(
        (a) => a.dataset.target === tableName
      );

      if (matchingRowsInTable > 0) {
        section.classList.remove("hidden");
        if (navLink) navLink.parentElement.classList.remove("hidden");
        visibleTables++;
      } else {
        section.classList.add("hidden");
        if (navLink) navLink.parentElement.classList.add("hidden");
      }
    });

    stats.textContent = `${visibleTables} tabelas | ${visibleCols} atributos`;
    emptyState.classList.toggle("hidden", visibleTables > 0);
  });
}

function setupThemeToggle() {
  const btn = document.getElementById("theme-toggle");
  const icon = document.getElementById("theme-icon");
  const label = document.getElementById("theme-label");
  const root = document.documentElement;

  const savedTheme = localStorage.getItem("altivez-theme") || "light";
  applyTheme(savedTheme);

  btn.addEventListener("click", () => {
    const current = root.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem("altivez-theme", next);
  });

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (theme === "dark") {
      icon.className = "fa-solid fa-sun";
      label.textContent = "Modo Claro";
    } else {
      icon.className = "fa-solid fa-moon";
      label.textContent = "Modo Escuro";
    }
  }
}

function setupDerModal() {
  const modal = document.getElementById("der-modal");
  const openBtn = document.getElementById("open-der-btn");
  const closeBtn = document.getElementById("close-der-btn");
  const zoomInBtn = document.getElementById("zoom-in-btn");
  const zoomOutBtn = document.getElementById("zoom-out-btn");
  const resetBtn = document.getElementById("zoom-reset-btn");
  const panzoomEl = document.getElementById("panzoom-element");
  const wrapper = document.getElementById("der-panzoom-wrapper");

  let panzoomInstance = null;

  function initPanzoom() {
    if (!panzoomInstance && typeof Panzoom !== "undefined") {
      panzoomInstance = Panzoom(panzoomEl, {
        maxScale: 10,
        minScale: 0.2,
        step: 0.3,
        canvas: true
      });
      wrapper.addEventListener("wheel", panzoomInstance.zoomWithWheel, {
        passive: false
      });
    }
  }

  openBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
    initPanzoom();
    if (panzoomInstance) {
      requestAnimationFrame(() => {
        panzoomInstance.reset({ animate: false });
      });
    }
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  zoomInBtn.addEventListener("click", () => {
    if (panzoomInstance) panzoomInstance.zoomIn();
  });

  zoomOutBtn.addEventListener("click", () => {
    if (panzoomInstance) panzoomInstance.zoomOut();
  });

  resetBtn.addEventListener("click", () => {
    if (panzoomInstance) panzoomInstance.reset();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      modal.classList.add("hidden");
    }
  });
}

function setupSidebarMobile() {
  const toggleBtn = document.getElementById("sidebar-toggle");
  const sidebar = document.getElementById("sidebar");
  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderDictionary();
  setupSearchFilter();
  setupThemeToggle();
  setupDerModal();
  setupSidebarMobile();
});