# Techstack projektu Code4Motion

## Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS (z konfiguracją stylu retro)
- shadcn/ui
- Framer Motion (animacje)
- @react-three/fiber (integracja Three.js z React)
- drei (gotowe komponenty: kamera, światło, orbit controls)
- Zustand (zarządzanie stanem interfejsu)

## Grafika 3D
- Blender / Spline (modelowanie robota)
- glTF + DRACO (lekki format i kompresja modeli)
- Stylizacja 3D: wireframe, glow, siatki horyzontalne, styl lat 80.

## Backend
- tRPC (typowane API bez REST)
- Prisma ORM (typowany dostęp do danych)
- Zod (runtime validation danych wejściowych i wyjściowych)
- NextAuth.js (uwierzytelnianie użytkowników)

## Baza danych
- PostgreSQL (produkcja)
- SQLite (środowisko deweloperskie)

## DevOps
- Vercel (hosting Next.js, auto deployment)
- GitHub Actions (CI/CD, testy, linting)
- ESLint + Prettier (formatowanie i jakość kodu)

## Testowanie
- Vitest (testy jednostkowe)
- Playwright (testy E2E i UI)

## Monitoring i analityka
- Sentry (monitorowanie błędów)
- Plausible (analityka bez cookies)

