# SolarFinder Admin Module

## Overview

This is a modular admin system for the SolarFinder platform, built with React, TypeScript, and TailwindCSS. It provides a comprehensive administration interface with 4 main modules:

1. **Leads Management** - Track and manage potential customers
2. **Members Management** - Manage user accounts and subscriptions
3. **Sponsored Companies** - Handle sponsored company listings
4. **Access Management** - Control product access permissions

## Features

- **Modular Architecture** - Each module is independent and can be developed separately
- **Responsive Design** - Works on desktop and mobile devices
- **Persistent Filters** - Filters are saved in the URL and persist on page reload
- **Type Safety** - Full TypeScript support with strict typing
- **Reusable Components** - Common components like FilterBar, DataTable, CardList can be reused across modules
- **Navigation** - Tab-based navigation with Lucide icons
- **API Integration** - Ready to connect to Rails backend via RESTful API

## Tech Stack

- **Frontend**: React 18, TypeScript, TailwindCSS, Lucide Icons
- **Routing**: React Router v6
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Testing**: Jest, React Testing Library
- **Linting**: ESLint, Prettier

## Project Structure

```
src/
├── admin/
│   ├── layout/
│   │   └── AdminLayout.tsx
│   ├── components/
│   │   ├── FilterBar.tsx
│   │   ├── DataTable.tsx
│   │   ├── CardList.tsx
│   │   ├── TabNavigator.tsx
│   │   └── SearchInput.tsx
│   ├── leads/
│   │   └── LeadList.tsx
│   ├── members/
│   │   └── MemberList.tsx
│   ├── sponsored/
│   │   └── SponsoredList.tsx
│   ├── access/
│   │   └── AccessList.tsx
│   └── hooks/
│       ├── useFilterParams.ts
│       └── useApi.ts
├── services/
│   └── api.ts
└── types/
    └── global.d.ts
```

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Build for production: `npm run build`

## Usage

To add a new module:
1. Create a new folder in `src/admin/` with the module name
2. Create the necessary components (List, Detail, Filters)
3. Add the module to the TabNavigator
4. Add the route to `src/routes.ts`

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run lint` - Lint code
- `npm run format` - Format code

### Environment Variables

Create a `.env` file in the root directory:

```
VITE_API_URL=http://localhost:3000/api/v1
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## License

See [LICENSE.md](LICENSE.md) for licensing information.

## Support

For support, please contact the development team.