# Web Scraping Dinâmico - Mercado Livre 

Este é um projeto simples, mas robusto, de Web Scraping desenvolvido em **Node.js** com a biblioteca **Puppeteer**. O objetivo principal do script é realizar uma busca automatizada no site do Mercado Livre e extrair dados detalhados dos anúncios lidando com o carregamento dinâmico da página.

##  O que o projeto faz?

O script não apenas raspa uma página estática, mas navega dinamicamente pelo site como um usuário real:
1. Acessa a página inicial do Mercado Livre.
2. Digita um termo de busca (ex: "macbook") e aguarda o carregamento completo da rede (`networkidle2`).
3. Extrai todos os links da página de resultados.
4. Entra, um por um, nos links dos anúncios encontrados.
5. Coleta e estrutura os seguintes dados em um objeto JavaScript:
   * **Título** do produto.
   * **Preço**.
   * **Nome do Vendedor**.

##  Desafios Resolvidos no Código

Lidar com sites modernos (SPAs) exige estratégias específicas. Este código implementa:
* **Espera Explícita:** Uso de `waitForSelector` para garantir que elementos dinâmicos carreguem na tela antes da extração de dados.
* **Fallback de Dados:** Lógica de tratamento de erros no `evaluate` para capturar o nome do vendedor. Como o Mercado Livre possui diferentes estruturas (Páginas de Catálogo vs. Lojas Oficiais), o código tenta buscar a informação e retorna um valor padrão ("Vendedor Oculto/Desconhecido") caso a classe CSS não exista, evitando que o script quebre.

##  Tecnologias Utilizadas

* Node.js
* Puppeteer

##  Como rodar o projeto na sua máquina

1. Clone este repositório:
   git clone https://github.com/Eduardodanield/Busca_ML.git

2. Acesse a pasta do projeto:
   cd Busca_ML

3. Instale as dependências:
   npm install

4. Execute o robô:
   node index.js

---
*Desenvolvido durante os estudos de automação e scraping de páginas dinâmicas.*
