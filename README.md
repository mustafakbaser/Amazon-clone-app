# Amazon.com.tr Clone

A modern e-commerce platform clone built with Next.js, TypeScript, and Tailwind CSS, designed as a minimal clone of Amazon.com.tr. The project replicates essential e-commerce functionalities and is currently under active development.

## 🚧 Development Status

This project is currently in active development. Features and documentation will be updated regularly.

## ✨ Features

- Product browsing and search
- Shopping cart management
- User authentication and account management
- Order tracking
- Multiple delivery address management
- Secure checkout process
- Responsive design for all devices

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
cd amazon-clone-app
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── app/              # Next.js app directory
│   ├── account/      # Account management pages
│   ├── auth/         # Authentication pages
│   ├── cart/         # Shopping cart
│   ├── checkout/     # Checkout process
│   └── product/      # Product pages
├── components/       # Reusable components
│   ├── ui/           # UI components
│   └── layout/       # Layout components
├── lib/              # Utilities and configurations
│   ├── constants/    # Constants and static data
│   ├── store/        # Zustand store configurations
│   ├── types/        # TypeScript type definitions
│   └── utils.ts      # Utility functions
└── public/           # Static assets
```

## 🧪 Running Tests (In Progress)

```bash
npm run test
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