# SmartCity

## Descrição do Projeto

Este projeto é uma aplicação web robusta desenvolvida para monitorar e gerenciar dados de sensores e ambientes. Ele oferece uma interface intuitiva onde usuários podem visualizar informações de sensores, gerenciar ambientes, consultar um histórico detalhado de medições e localizar sensores geograficamente em um mapa interativo.

A aplicação foi desenvolvada com um backend em Django REST Framework para a API e um frontend moderno em React, estilizado com Tailwind CSS, proporcionando uma experiência de usuário fluida e responsiva.

## Funcionalidades Principais

* **Gerenciamento de Sensores:**
    * Visualização de uma lista de sensores.
    * Edição de informações de sensores (nome, MAC Address, status, localização, unidade de medida).
    * Exclusão de sensores.
* **Gerenciamento de Ambientes:**
    * Visualização de uma lista de ambientes.
    * Edição de informações de ambientes (SIG, descrição, NI, responsável).
    * Exclusão de ambientes.
* **Histórico de Dados:**
    * Consulta detalhada do histórico de medições de sensores.
    * Opções de filtro por ID do sensor.
    * Gráficos interativos para visualização de tendências dos dados.
    * Exclusão de registros históricos.
* **Visualização em Mapa:**
    * Localização de sensores específicos em um mapa interativo.
    * Busca de sensores por ID para visualização de suas coordenadas.

## Tecnologias Utilizadas

**Backend:**
* **Python:** Linguagem de programação.
* **Django:** Framework web de alto nível.
* **Django REST Framework (DRF):** Para construção das APIs RESTful.
* **Django REST Framework SimpleJWT (SimpleJWT):** Para autenticação baseada em tokens JWT.
* **Pandas:** Biblioteca para manipulação e análise de dados.


**Frontend:**
* **React:** Biblioteca JavaScript para construção de interfaces de usuário.
* **Tailwind CSS:** Framework CSS utilitário para estilização rápida e responsiva.
* **Axios:** Cliente HTTP baseado em Promises para fazer requisições à API.
* **React Router DOM:** Para gerenciamento de rotas no frontend.
* **Recharts:** Biblioteca de gráficos para React (usada no Histórico).
* **React-Leaflet:** Componentes React para o mapa Leaflet (usado na página de Mapa).
* **React Icons:** Biblioteca de ícones.

## Configuração e Instalação

Siga os passos abaixo para configurar e rodar o projeto na máquina local.

### 1. Backend (API Django)

1.  **Clone o repositório do seu backend:**
    ```bash
    git clone
    cd backend
    ```

2.  **Crie o ambiente virtual (`.env`):**
    ```bash
    py -m venv .env
    ```
    Entre na env:
    ```bash
    .env\scripts\activate
    ```

3.  **Instale as dependências do backend:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Inicie o servidor de desenvolvimento do backend:**
    ```bash
    python manage.py runserver
    ```
    O backend estará rodando em `http://127.0.0.1:8000/`.

### 2. Frontend (Aplicação React)

1.  **Clone o repositório do seu frontend:**
    ```bash
    git clone 
    cd frontend
    ```

2.  **Instale as dependências do frontend:**
    ```bash
    npm install
    ```

3.  **Inicie o servidor de desenvolvimento do frontend:**
    ```bash
    npm run dev
    ```
    A aplicação frontend estará acessível geralmente em `http://localhost:5173/` ou outra porta disponível.

## Uso da Aplicação

Após iniciar o backend e o frontend, navegue até a URL do frontend em seu navegador.
* Faça login com suas credenciais.
* Explore as páginas de `Sensores`, `Ambientes`, `Histórico` e `Mapas` através da barra lateral para gerenciar e visualizar seus dados.
* Utilize as funcionalidades de edição e exclusão conforme necessário.
* No histórico, filtre os dados e visualize os gráficos interativos.
* No mapa, utilize a busca por ID para localizar sensores.

---