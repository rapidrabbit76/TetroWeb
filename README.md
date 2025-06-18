# TetroWeb

Welcome to the TetroWeb project! This is a full-stack monorepo application built with a modern technology stack, featuring a Python backend, a Next.js frontend, and a modular architecture.

## Architecture Overview

The project is structured as a monorepo managed by `uv` workspaces. This approach promotes code reuse and clean separation of concerns, drawing inspiration from Clean Architecture and Domain-Driven Design principles.

### Workspace Structure

-   `📂 projects/`: Contains the primary applications.
    -   `🚀 tetroweb-backend`: The core API service built with FastAPI.
    -   `🌐 tetroweb-web`: The frontend application built with Next.js.
-   `📂 features/`: Contains shared libraries (kernels) used across the projects.
    -   `⚙️ tetroweb-shared-kernel`: Core domain models, settings, and infrastructure interfaces.
    -   `🔗 tetroweb-shared-kernel-infra-fastapi`: Reusable FastAPI-specific components.
    -   `🗃️ tetroweb-shared-kernel-infra-database-sqla`: SQLAlchemy and data persistence components.

## Tech Stack

| Category           | Technology                                                              |
| ------------------ | ----------------------------------------------------------------------- |
| **Backend**        | Python 3.12+, FastAPI, SQLAlchemy, Alembic, `dependency-injector`       |
| **Frontend**       | Next.js, React, TypeScript, Geist Font                                  |
| **Database**       | PostgreSQL, Redis (for caching)                                         |
| **Tooling**        | `uv`, `ruff`, `pytest`, `pre-commit`, `hatchling`                        |

## Getting Started

### Prerequisites

-   Python >= 3.12
-   [uv](https://github.com/astral-sh/uv) (`pip install uv`)
-   Node.js and `pnpm`

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd TetroWeb
    ```

2.  **Install Python dependencies:**
    Install all dependencies for the Python workspaces from the root directory.
    ```bash
    uv sync
    ```

3.  **Install frontend dependencies:**
    ```bash
    cd projects/tetroweb-web
    pnpm install
    ```

### Running the Application

#### Backend Server

1.  Navigate to the backend project:
    ```bash
    cd projects/tetroweb-backend
    ```
2.  Create and configure your `.env` file based on the required settings in `src/tetroweb/backend/settings.py`.
3.  Run the development server:
    ```bash
    fastapi dev src/tetroweb/backend/main.py --port 8080 --host 0.0.0.0
    ```

#### Frontend Application

1.  Navigate to the frontend project:
    ```bash
    cd projects/tetroweb-web
    ```
2.  Run the development server:
    ```bash
    pnpm dev
    ```
3.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

### Database Migrations

The backend uses Alembic to manage database schema changes.

-   **Navigate to the backend directory:**
    ```bash
    cd projects/tetroweb-backend
    ```
-   **Create a new migration:**
    ```bash
    alembic revision --autogenerate -m "Your migration message"
    ```
-   **Apply migrations:**
    ```bash
    alembic upgrade head
    ```

### Testing

The project uses `pytest` for backend testing. To run the test suite, execute the following command from the **root directory**:

```bash
pytest
```