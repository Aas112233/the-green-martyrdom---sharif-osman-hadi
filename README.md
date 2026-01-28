# The Green Martyrdom - Sharif Osman Hadi

A digital tribute and archive website dedicated to Sharif Osman Hadi. This project serves as a comprehensive platform to preserve and showcase his biography, speeches, poetry, and a multimedia gallery.

## Features

- **Multimedia Gallery**: Curated collection of photos and videos.
- **Biographical Timeline**: Interactive timeline of key life events.
- **Literary Works**: Access to poetry and written works.
- **Speeches & Documents**: Archive of speeches and historical documents.
- **Bilingual Support**: Interface available in English and Bengali (implied).
- **Responsive Design**: Modern, responsive UI built with Tailwind CSS.
- **System Integrity Check**: Custom hook for system security verification.

## Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Routing**: [React Router DOM](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn

### Installation

1.  **Clone the repository** (if applicable) or download the source code.
2.  **Install dependencies**:

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Environment Setup**:
    Create a `.env` or `.env.local` file in the root directory if necessary (refer to `config` or existing `.env.example`).

### Running the Application

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in your terminal).

### Building for Production

Build the application for deployment:

```bash
npm run build
```

The output will be in the `dist` directory.

## Project Structure

- `src/components`: Reusable UI components (Gallery, Hero, Navigation, etc.)
- `src/contexts`: React Context providers (LanguageContext)
- `src/hooks`: Custom React hooks (useSystemIntegrity)
- `src/config`: Configuration files
- `public`: Static assets

## License

[License Information Here]
