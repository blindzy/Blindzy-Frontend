# 🪟 Blindzy Frontend - Developer Documentation

This project is a high-performance, modern e-commerce storefront for window coverings, built with the **Astro** framework. It uses a "headless" architecture, decoupling the UI from the content and commerce engines.

---

## 🏗️ Core Architecture

The application is built on three main pillars:
1.  **Astro (The Orchestrator):** Manages routing, SEO, and static site generation. It uses "Islands Architecture" to hydrate interactive components only when needed.
2.  **Strapi (Content Engine):** Provides marketing content, testimonials, blog posts, and legal policies via a REST API.
3.  **Medusa (Commerce Engine):** Handles the complex e-commerce logic: product catalogs, cart management, customer accounts, and the checkout flow.

---

## 📂 Detailed `src/` Directory Breakdown

Understanding how the code works starts with the `src/` folder:

### 1. `pages/` (The Router)
Astro uses file-based routing. Every `.astro` file here is a route.
-   `index.astro`: The homepage. It orchestrates multiple React "islands" (Hero, Products, Clients).
-   `blinds/`, `curtains/`, `shutters/`: These directories contain the product-specific category and detail pages.
-   `auth/`: Handles authentication callbacks (like Google OAuth).
-   **Execution Flow:** When a user hits a route, Astro executes the "frontmatter" (the code between `---`) on the server to fetch initial data (e.g., from Strapi) before sending HTML to the client.

### 2. `components/` (The UI Library)
Most components are written in **React (.tsx)** for state management and interactivity.
-   **Hydration:** Pay attention to directives like `client:load` (loads immediately) or `client:visible` (loads when scrolled into view) in the `.astro` pages.
-   **Structure:** Each sub-folder (e.g., `product/`, `checkout/`) typically contains the main component file and its specific sub-components.

### 3. `services/` (The Business Logic)
This is where the application communicates with the **Medusa** backend.
-   **Pattern:** Logic is encapsulated in classes (e.g., `CreateAddToCart`) to keep components clean.
-   **Key Services:**
    -   `add-to-cart.ts`: Manages the lifecycle of adding items to the Medusa cart.
    -   `create-address.ts`: Handles customer shipping/billing address persistence.

### 4. `lib/` (Infrastructure)
Contains the core configurations for external integrations.
-   `strapi.ts`: A robust fetch wrapper that handles environment URLs, endpoint formatting, and unwrapping Strapi's nested JSON responses.
-   `sdk.ts`: Initializes the `@medusajs/js-sdk`. Use this SDK throughout the app for type-safe Medusa interactions.

### 5. `hooks/` & `utils/` (Client-Side Logic)
-   **`useLenis.ts` / `lenis.ts`**: Implements "Smooth Scrolling". The manager ensures only one instance of Lenis runs and provides global access to scroll controls.
-   **`useGoogleMapsAutoComplete.ts`**: Plugs into the Google Places API to provide address suggestions during checkout.
-   **`middleware.ts`**: Intercepts requests to check for the `access_token` cookie, redirecting unauthorized users away from `/user` or `/checkout`.

### 6. `interfaces/` (Type Safety)
Centralized TypeScript interfaces. This ensures that data fetched from Strapi or Medusa is consistently typed across both Astro pages and React components.

---

## 🔄 Data Flow Example: Homepage Testimonials

1.  **Request:** User visits `/`.
2.  **Server-Side:** `src/pages/index.astro` calls `fetchApi` (from `lib/strapi.ts`).
3.  **Data Fetching:** The `strapi.ts` utility hits the Strapi endpoint and cleans the data.
4.  **Component Injection:** The fetched data is passed as a prop to the `<Clients />` React component.
5.  **Hydration:** Astro renders the static HTML for the testimonials. On the client, the `Clients` component hydrates (`client:visible`) to enable the slider/carousel interactivity.

---

## 🛠️ Developer Checklist

-   **Environment Variables:** Ensure `PUBLIC_STRAPI_API_URL` and `PUBLIC_API_URL` (Medusa) are defined.
-   **Styling:** We use **Tailwind CSS**. Global variables (colors, fonts) are managed in `src/styles/global.css`.
-   **Adding a Page:** Create a new `.astro` file in `src/pages/`.
-   **Adding a Feature:** 
    1. Define interfaces in `src/interfaces/`.
    2. Add service logic in `src/services/` if it hits Medusa.
    3. Create React components in `src/components/`.
    4. Implement the page in `src/pages/`.

---

## 🚦 Navigation & State
-   **Auth:** Managed via cookies (`access_token`).
-   **Scrolling:** Controlled by Lenis on desktop (>1024px).
-   **Layout:** All pages should be wrapped in the `<Layout />` component found in `src/layouts/Layout.astro` for consistent SEO and header/footer behavior.
