# Dicionário de Dados — Cosmético Altivez

Uma aplicação web para consulta e visualização do dicionário de dados do sistema operacional e de vendas da Cosmético Altivez, com foco em governança de dados, metadados, privacidade e modelagem de informações.

## Visão geral

Este projeto apresenta um catálogo de tabelas, colunas, regras de negócio e classificações de privacidade do banco de dados MySQL 8.0 utilizado pela empresa. A interface permite navegar pelos metadados do sistema, filtrar tabelas e atributos, visualizar o DER (Diagrama Entidade-Relacionamento) e consultar a documentação de requisitos e regras de negócio.

O repositório foi desenvolvido como uma ferramenta de apoio ao entendimento do banco de dados, facilitando a análise de:

- estruturas de tabelas e atributos;
- regras de negócio e governança;
- dados pessoais e sensíveis conforme LGPD;
- relacionamento entre entidades;
- documentação técnica e de requisitos.

## Funcionalidades

- Navegação por tabelas do sistema;
- Busca por nome de tabela e coluna;
- Visualização de metadados e atributos;
- Classificação de dados por sensibilidade LGPD;
- Modal com diagrama ER interativo;
- Zoom e deslocamento do DER;
- Acesso à especificação de requisitos e regras de negócio em PDF;
- Interface responsiva em tema claro/escuro.

## Stack tecnológica

- HTML5
- CSS3
- JavaScript
- MySQL 8.0 (InnoDB)
- Bibliotecas front-end:
  - Font Awesome
  - Panzoom

## Estrutura do projeto

```text
.
├── assets/
│   └── der.png                 # Diagrama entidade-relacionamento
├── docs/
│   └── Especificacao_Requisitos_Regras_Negocio_BD.pdf
├── index.html                 # Página principal da aplicação
├── script.js                  # Lógica de renderização e interação
├── style.css                  # Estilos visuais
├── LICENSE                    # Licença do projeto
├── README.md                  # Documentação do projeto
└── .github/                   # Configurações do GitHub
```

## Como executar

Como o projeto é um site estático, basta abrir o arquivo `index.html` em um navegador.

### Opção 1: abrir diretamente

- Abra o arquivo `index.html` no navegador.

### Opção 2: servir localmente

Se preferir, pode executar um servidor local simples:

```bash
python -m http.server 8000
```

Depois acesse:

```text
http://localhost:8000
```

## Diagrama ER

O projeto inclui o diagrama de relacionamento do banco de dados em:

- `assets/der.png`

Também é possível visualizar o DER diretamente na interface web através do botão "Visualizar DER (Modal)".

## Documentação

A documentação técnica e de requisitos do projeto está disponível em:

- `docs/Especificacao_Requisitos_Regras_Negocio_BD.pdf`

Esse documento descreve o escopo, requisitos e regras de negócio do banco de dados do sistema.

## Escopo do sistema

A base relacional cobre o ecossistema de gestão operacional e vendas da Cosmético Altivez, incluindo:

- usuários e perfis RBAC;
- clientes e endereços com aderência à LGPD;
- catálogo de produtos com lote, validade e ANVISA;
- histórico de preços;
- estoque;
- pedidos com preço congelado e regras de desconto;
- cancelamentos e estornos;
- auditoria imutável;
- retenção fiscal e conformidade regulatória.

## Classificação LGPD

A interface marca os atributos conforme a classificação de dados:

- `[DPS]` — Dado Pessoal Sensível
- `[DP]` — Dado Pessoal
- `[N/A]` — Não Aplicável

## Autores/Responsáveis

Projeto desenvolvido com base no contexto acadêmico e de governança de dados da empresa Cosmético Altivez, com participação dos responsáveis:

- Hiago Rocha de Melo
- Kalil Ian Rodrigues
- Matheus Cardoso Sena
- Matheus Silva Melo

Orientação acadêmica:

- Prof. Dr. Diego Carvalho

## Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo `LICENSE` para mais detalhes.

## Observações

Este repositório foi estruturado para servir como um dicionário de dados de referência para o sistema, facilitando a compreensão de metadados, regras operacionais e estrutura relacional da aplicação de gestão da empresa.

---

Se quiser, também posso criar uma versão mais "bonita" do README com badges, emoji, screenshots e uma seção de demo com imagens do projeto.
