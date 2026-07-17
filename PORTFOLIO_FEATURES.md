# 🚀 Chamuditha Dilanka - Professional Portfolio

A **fully responsive, pixel-perfect, 3D animated portfolio website** built with Next.js 16, Framer Motion, and Tailwind CSS. Showcasing 10+ years of full-stack & mobile development expertise.

## ✨ Features

### 🎨 **Design & Animation**
- ✅ **3D Transforms & Parallax** - Mouse-tracking 3D cards, rotating orbs, floating elements
- ✅ **Smooth Animations** - Framer Motion with spring physics, staggered reveals
- ✅ **Glassmorphism UI** - Frosted glass effects with backdrop blur
- ✅ **Gradient Animations** - Animated gradient text, borders, and backgrounds
- ✅ **Particle Effects** - Floating particles on hero section
- ✅ **Glow Effects** - Neon glows, pulse animations, ambient lighting

### 📱 **Fully Responsive**
- ✅ **Mobile-First Design** - Optimized for all screen sizes (320px - 4K)
- ✅ **Touch-Friendly** - Proper spacing, tap targets, mobile gestures
- ✅ **Adaptive Layouts** - Grid/flex layouts that adapt to viewport
- ✅ **Responsive Typography** - Fluid font sizes using Tailwind
- ✅ **Mobile Navigation** - Hamburger menu with smooth animations
- ✅ **Optimized Images** - Next.js Image component with lazy loading

### 🎯 **Sections**
1. **Navbar** - Sticky navigation with active section highlighting
2. **Hero** - Typewriter effect, 3D avatar card, CTA buttons, scroll indicator
3. **About** - 3D tilt card, stats counters, tech stack badges
4. **Skills** - Animated skill bars, category cards, learning section
5. **Projects** - Filterable project grid, real GitHub data, language badges
6. **Experience** - Timeline with animated dots, work & education
7. **Contact** - Glassmorphic form, contact info cards, availability status
8. **Footer** - Social links, navigation, back-to-top button

### ⚡ **Performance**
- ✅ **Static Generation** - Pre-rendered pages for instant load
- ✅ **Code Splitting** - Lazy-loaded components
- ✅ **Image Optimization** - WebP, responsive images
- ✅ **CSS-in-JS** - Tailwind for minimal CSS
- ✅ **Smooth Scrolling** - Native scroll behavior

### 🔧 **Tech Stack**
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Images**: Next.js Image
- **Language**: TypeScript
- **Deployment**: Vercel-ready

## 🚀 Quick Start

### Installation
```bash
cd portfolio
npm install
```

### Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### Production Build
```bash
npm run build
npm start
```

## 📝 Customization

### Update Your Info
Edit `data/portfolio.ts`:
```typescript
export const portfolioData = {
  name: "Your Name",
  title: "Your Title",
  email: "your@email.com",
  github: "https://github.com/yourname",
  linkedin: "https://linkedin.com/in/yourname",
  avatar: "https://avatars.githubusercontent.com/u/YOUR_ID?v=4",
  // ... more fields
};
```

### Modify Colors
Edit CSS variables in `app/globals.css`:
```css
:root {
  --purple: #7c3aed;
  --cyan: #06b6d4;
  --pink: #ec4899;
  /* ... */
}
```

### Add/Remove Sections
Edit `app/page.tsx` to add or remove sections.

## 📊 Responsive Breakpoints

| Device | Width | Optimized |
|--------|-------|-----------|
| Mobile | 320px - 640px | ✅ |
| Tablet | 641px - 1024px | ✅ |
| Desktop | 1025px - 1920px | ✅ |
| 4K | 1921px+ | ✅ |

## 🎬 Animation Features

- **Typewriter Effect** - Hero title typing animation
- **3D Card Tilt** - Mouse-tracking 3D transforms
- **Parallax Scrolling** - Depth-based movement
- **Staggered Reveals** - Sequential element animations
- **Floating Elements** - Continuous motion animations
- **Pulse Glows** - Breathing glow effects
- **Smooth Transitions** - Spring physics animations
- **Scroll Indicators** - Bounce animations

## 📱 Mobile Optimizations

- Hamburger menu for navigation
- Touch-friendly button sizes (48px minimum)
- Optimized 3D transforms (reduced on mobile)
- Responsive grid layouts
- Mobile-first CSS approach
- Proper viewport meta tags
- Optimized images for mobile

## 🔗 Links

- **GitHub**: [chamudithadilanka](https://github.com/chamudithadilanka)
- **LinkedIn**: [Chamuditha Dilanka](https://www.linkedin.com/in/chamuditha-dilanka-35199b2a8/)
- **Email**: chamuditha@example.com

## 📄 License

MIT License - Feel free to use this portfolio as a template!

---

**Built with ❤️ using Next.js & Framer Motion**
