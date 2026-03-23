# TWR Funnel Builder - Technical Challenge

Ferramenta visual de alta performance para estruturação e análise de funis de marketing, desenvolvida com React e Next.js.

---

## Diferenciais de Engenharia

Para este desafio, foram implementadas soluções focadas em escalabilidade, performance e experiência do usuário (UX):

* **Arquitetura de Estado e Imutabilidade:** Implementação do padrão de "Injeção Dinâmica de Handlers" via `useMemo`. Esta abordagem garante que o estado dos nós permaneça como dado puro (JSON serializável), facilitando a persistência, enquanto as funções de interação são injetadas apenas em tempo de execução, otimizando o ciclo de vida dos componentes.
* **Interface de Trabalho Otimizada (Collapsible Panel):** Desenvolvimento de um painel de controle retrátil que se converte em um Floating Action Button (FAB). Esta funcionalidade maximiza a área útil do canvas, permitindo a gestão de fluxos complexos sem obstrução visual.
* **Persistência com Estratégia de Debounce:** Sistema de salvamento automático no `localStorage` com intervalo de 500ms (debounce). Esta técnica mitiga gargalos de I/O no navegador, garantindo fluidez total durante a manipulação de múltiplos nós.
* **Feedback de Sincronização:** Indicador de status em tempo real que fornece confirmação visual do salvamento dos dados, elevando a confiabilidade da aplicação.

---

## Stack Tecnológica

* **Framework:** Next.js 14 (App Router)
* **Engine Visual:** React Flow
* **Estilização:** Tailwind CSS
* **Componentes de UI:** shadcn/ui
* **Iconografia:** Lucide React

---

## Instruções de Instalação e Execução

1.  **Clonagem do repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/meu-desafio-twr.git](https://github.com/seu-usuario/meu-desafio-twr.git)
    ```

2.  **Instalação de dependências:**
    ```bash
    npm install
    ```

3.  **Execução do ambiente de desenvolvimento:**
    ```bash
    npm run dev
    ```

4.  **Acesso local:**
    Disponível em [http://localhost:3000](http://localhost:3000)

---

## Funcionalidades Implementadas

* Gestão dinâmica de etapas (Inclusão, Edição de rótulos e Exclusão).
* Sistema de conexões lógicas entre componentes do funil.
* Geração de métricas simuladas (Acessos e Conversão) por nó.
* Persistência de dados entre sessões do navegador.
* Interface adaptativa para otimização de espaço de trabalho.

---

**Desenvolvido por Pedro Lucas (PL)**
