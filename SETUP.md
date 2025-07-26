# 🚀 Quick Setup Guide

## Prerequisites
- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)

## Installation Steps

1. **Clone the repository:**
```bash
git clone https://github.com/shreyo-ghosh/my-portfolio.git
cd my-portfolio
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start development server:**
```bash
npm run dev
```

4. **Open your browser:**
Visit [http://localhost:5173](http://localhost:5173)

## Available Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run deploy` - Deploy to GitHub Pages

## Troubleshooting

### "vite is not recognized" error:
This happens when dependencies aren't installed. Run:
```bash
npm install
```

### Port already in use:
If port 5173 is busy, Vite will automatically use the next available port.

### Build errors:
Make sure you're using Node.js version 16 or higher:
```bash
node --version
```

## Customization

1. **Update contact info** in `src/Home.jsx`
2. **Modify services and pricing** in the `services` array
3. **Change styling** in `src/index.css`

## Deployment

The portfolio is automatically deployed to GitHub Pages at:
**https://shreyo-ghosh.github.io/my-portfolio/**

To deploy your own version:
1. Fork this repository
2. Enable GitHub Pages in your repository settings
3. Run `npm run deploy`

---

For more details, see the main [README.md](README.md) file.