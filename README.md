# Amazon.com.tr Clone

A modern e-commerce platform clone built with Next.js, TypeScript, and Tailwind CSS, designed as a minimal clone of Amazon.com.tr. The project replicates essential e-commerce functionalities and is currently under active development.

## 🚧 Development Status

This project is currently in active development. Features and documentation will be updated regularly.

## ✨ Features

- Product browsing with category pages and an "All categories" menu
- Product search by title and category, with an empty state when nothing matches
- Shopping cart management
- User registration, login and account management (client-side mock, see below)
- Multiple delivery address management
- Checkout flow: delivery address, payment method and order review (no real payment is processed)
- Order confirmation page and order history under "Siparişlerim" (orders are listed with their status; there is no shipment tracking)
- Responsive design for all devices

## 🔐 Authentication (demo only)

This is a front-end demo without a backend. Accounts, the signed-in session, the cart and orders are kept in the browser's `localStorage`.

- Passwords are never stored. Registration saves a salted PBKDF2-SHA-256 hash (Web Crypto API, random 16-byte salt per user, 600,000 iterations) and login re-derives and compares it.
- Plain-text passwords saved by earlier versions are hashed automatically the next time the app loads.
- Hashing only keeps the password itself out of storage. Anyone with access to the browser can still read or change the local data, so do not use a real password. A production app needs server-side authentication.
- The Web Crypto API needs a secure context, so serve the app over HTTPS or from `localhost`.

## 🛠️ Tech Stack

- [Next.js 13](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Static type checking
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Re-usable components
- [Zustand](https://zustand-demo.pmnd.rs/) - State management
- [React Hook Form](https://react-hook-form.com/) - Form handling
- [Zod](https://zod.dev/) - Schema validation
- [Lucide Icons](https://lucide.dev/) - Icon library

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mustafakbaser/Amazon-clone-app.git
```

2. Install dependencies:
```bash
cd Amazon-clone-app
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

`npm run build` creates a static export in the `out/` directory (`output: 'export'` in `next.config.js`), which can be served by any static host.

## 📁 Project Structure

```
├── app/              # Next.js app directory
│   ├── account/      # Account pages and order history
│   ├── auth/         # Login and registration pages
│   ├── cart/         # Shopping cart
│   ├── category/     # Category pages
│   ├── checkout/     # Checkout and order confirmation
│   ├── product/      # Product pages
│   └── search/       # Search results
├── components/       # Reusable components
│   ├── header/       # Header, search bar and category menu
│   ├── ui/           # UI components (shadcn/ui)
│   └── ...           # Feature components (account, cart, checkout, layout, product, search)
├── hooks/            # React hooks
└── lib/              # Utilities and configurations
    ├── auth/         # Password hashing and mock user storage (demo only)
    ├── constants/    # Constants and static data
    ├── store/        # Zustand store configurations
    ├── types/        # TypeScript type definitions
    ├── catalog.ts    # Search and category helpers
    └── utils.ts      # Utility functions
```

## 🧪 Checks

There is no automated test suite yet. Lint and type-check the project with:

```bash
npm run lint
npm run build
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request