# Clinic Landing Page

A modern landing page for a clinic system API, built with React, Vite, and Tailwind CSS. The project is containerized using Docker.

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd clinic-landing-page
   ```

2. Ensure Docker and Docker Compose are installed.

3. Build and run the project:
   ```bash
   docker-compose up --build
   ```

4. Open the browser and navigate to `http://localhost:3000`.

## Environment Variables

- `VITE_API_URL`: The base URL for the API (set in `.env`).

## Project Structure

- `src/`: Contains React components and styles.
- `public/`: Static assets.
- `Dockerfile`: Docker configuration for the app.
- `docker-compose.yml`: Docker Compose configuration.