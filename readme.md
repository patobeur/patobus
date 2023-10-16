# Patobus

## Setup
```
# Install dependencies (only the first time)
npm install

# Run the local server at localhost:8080
npm run dev

# Build for production in the dist/ directory
npm run build
```

```
{
  "name": "patobus",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "devDependencies": {
    "vite": "^4.3.9"
  },
  "dependencies": {
    "three": "^0.157.0"
  }
}
```