# 🍕 Mutant Pizza Builder

An interactive web app that combines pizza creation with mutation testing education. Build your perfect pizza while learning software testing concepts!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fgertoska%2Fmutant-pizza-builder)
[![Tests](https://github.com/gertoska/mutant-pizza-builder/actions/workflows/ci.yml/badge.svg)](https://github.com/gertoska/mutant-pizza-builder/actions/workflows/ci.yml)
[![Mutation testing badge](https://img.shields.io/endpoint?style=flat&url=https%3A%2F%2Fbadge-api.stryker-mutator.io%2Fgithub.com%2Fgertoska%2Fmutant-pizza-builder%2Fmain)](https://dashboard.stryker-mutator.io/reports/github.com/gertoska/mutant-pizza-builder/main)

[🚀 Demo](https://mutant-pizza-builder.vercel.app) | [📖 Documentation](docs/README.md) | [🐛 Issues](https://github.com/gertoska/mutant-pizza-builder/issues)

![Pizza Builder Demo](public/demo.gif)

## ✨ Features

- 🛠️ **Interactive Pizza Builder**
  - Multiple crust options (thin, thick, stuffed)
  - Extensive topping selection
  - Real-time price calculation
  - Visual pizza preview

- 📚 **Learn Mutation Testing**
  - Built-in examples of mutation testing concepts
  - Interactive tutorials and explanations
  - Real-world testing scenarios

- 💻 **Developer Experience**
  - 100% TypeScript coverage
  - Comprehensive test suite
  - Modern tooling and best practices

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/gertoska/mutant-pizza-builder.git

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to start building your pizza!

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run tests with coverage
npm run test:coverage

# Run mutation tests
npm run test:mutation
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Testing**: Jest, React Testing Library, Stryker
- **Deployment**: Vercel
- **Quality**: ESLint, Prettier

## 📖 Mutation Testing Guide

Mutation testing helps ensure your test suite's effectiveness by introducing small code changes ("mutants") and verifying if your tests catch them. Learn more:

- [Introduction to Mutation Testing](docs/mutation-testing.md)
- [Example Mutations](docs/example-mutations.md)
- [Testing Best Practices](docs/testing-practices.md)

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Pizza vector images by [Vecteezy](https://www.vecteezy.com)
- Inspired by Josh Goldberg's work on mutation testing and the [RoboCafe example](https://github.com/JoshuaKGoldberg/robocafe-example)
- Built with ❤️ by [gertoska](https://github.com/gertoska)
