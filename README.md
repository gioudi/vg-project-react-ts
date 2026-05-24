# 🎮 VGDB Frontend: Feature-Driven Client Interface

This repository houses the modern, high-performance web interface for the **Video Game Database (VGDB)** system. Built using **React**, **Vite**, and strict **TypeScript**, the client operates as an independent web application decoupled from backend execution configurations.

---

## 🏛️ Architectural Design Patterns

### 1. Feature-Driven Architecture (Screaming Architecture)
Folders are structured around clear business modules rather than arbitrary technical layers. 

* **The Layout:** Structural blocks reside under explicit feature packages: `gameCatalog` and `gameInventory`.
* **The "Why":** This layout directly reflects our backend microservices topology. If the search microservice alters its payload specification, developers modify files inside the isolated `gameCatalog` directory, eliminating cross-contamination or regressions across independent application views.

### 2. Gateway Proxy / API Client Wrapper Pattern
UI components are completely decoupled from raw network connection configurations via a centralized network execution abstraction (`gatewayClient.ts`).

* **The "Why":** Components never call raw asynchronous tools natively; they utilize the configured proxy wrapper instance. If the backend API Gateway moves from port `8000` to an alternate cluster domain, or if a global authorization interceptor (JWT injection) is required, modifications remain isolated to **one single file** inside the structural stack.

---

## 🗂️ File Framework Structure

Utility, file systems, style protocols, and services strictly maintain standard **camelCase** formatting. User Interface components require standard **PascalCase** initialization for correct compilation mapping inside the React framework engine.

```text
src/
├── components/             # PascalCase global reusable UI blocks
│   └── Navbar.tsx          # Main structural navigation frame
├── features/
│   ├── gameCatalog/        # Matches Catalog/Search Microservice context
│   │   ├── components/
│   │   │   └── CatalogPage.tsx
│   │   └── hooks/          # Custom query hook primitives
│   └── gameInventory/      # Matches Management/CRUD Microservice context
│       ├── components/
│       │   └── InventoryPage.tsx
│       └── hooks/          # Custom mutation hook primitives
├── routes/
│   └── AppRoutes.tsx       # Centralized browser client state router
├── services/
│   └── gatewayClient.ts    # API Client Wrapper Pattern (camelCase)
└── styles/
    └── globalStyles.scss   # Modular layout rules and variables (camelCase)

🛠️ Local Environment Execution Blueprint
Dependencies Installation
From inside the root layout of the vgdb-frontend directory, trigger local compilation caching packages:


 npm install
Run the Application Dev Server
Instantiate Vite's real-time hot-reloading rendering runtime:


 npm run dev
Navigate to your active local workspace loop: http://localhost:5173.

Verification Test Metrics
Routing Verification: Selecting navigation items inside the Navbar must trigger smooth, immediate component swaps across CatalogPage and InventoryPage paths via React Router Dom, executing zero physical browser page-refresh queries.

Network Proxy Target Validation: Ensure services/gatewayClient.ts targets the centralized API Gateway port specifically: http://localhost:8000/api/v1.