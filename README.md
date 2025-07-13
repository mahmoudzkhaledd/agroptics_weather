# Geoptics Weather

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Git** - Version control system
- **Docker** - Container platform
- **Docker Compose** - Multi-container Docker applications

## Quick Start

Follow these steps to get the application running locally:

### 1. Clone the Repository

```bash
git clone https://github.com/mahmoudzkhaledd/geoptics_weather.git
```

### 2. Navigate to Docker Directory

```bash
cd geoptics_weather/docker
```

### 3. Build and Start Services

```bash
docker-compose build
docker-compose up -d
```

This command will:
- Build all necessary Docker images
- Start all services in detached mode (background)

### 4. Access the Application

Open your web browser and navigate to:

```
http://localhost:3000
```

## Additional Commands

### Stop Services
```bash
docker-compose down
```

### View Logs
```bash
docker-compose logs -f
```

### Rebuild Services
```bash
docker-compose build --no-cache
docker-compose up -d
```
