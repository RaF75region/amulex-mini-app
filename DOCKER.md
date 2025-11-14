# Docker for Next.js Deployment

## 📦 Quick Start

### Development
```bash
npm run dev
```

### Production with Docker

1. **Build and run with Docker Compose:**
```bash
docker-compose up -d
```

2. **Build only the app:**
```bash
docker build -t amulex-mini-app .
```

3. **Run the container:**
```bash
docker run -p 3000:3000 \
  -e DATABASE_URL="postgresql://user:pass@host:5432/db" \
  amulex-mini-app
```

## 🏗️ Docker Architecture

### Multi-Stage Build
- **deps**: Install production dependencies
- **builder**: Build the Next.js application
- **runner**: Minimal production runtime

### Image Size Optimization
- Uses Alpine Linux (minimal footprint)
- Multi-stage build removes dev dependencies
- Standalone output reduces image size by ~70%
- Total image size: ~150-200MB

### Security Features
- Non-root user execution
- Minimal attack surface (Alpine)
- No unnecessary tools in production
- Health checks for container orchestration

## 🗄️ Database Setup

### PostgreSQL Connection
```env
DATABASE_URL=postgresql://postgres:postgres@db:5432/amulex
```

### Run migrations (if using Prisma)
```bash
# Inside container
docker exec -it amulex-mini-app npx prisma migrate deploy
```

## 🔧 Environment Variables

Required variables in production:
```env
NODE_ENV=production
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
```

## 📊 Monitoring

### Health Check Endpoint
```
GET /api/health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2025-11-14T...",
  "uptime": 123.45
}
```

### Docker Health Check
Automatic health checks every 30s:
```bash
docker ps
# Shows health status: healthy/unhealthy
```

## 🚀 Production Deployment

### Using Docker Compose (Recommended)
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop services
docker-compose down
```

### Manual Deployment
```bash
# Build
docker build -t amulex-mini-app:latest .

# Push to registry
docker tag amulex-mini-app:latest registry.example.com/amulex-mini-app:latest
docker push registry.example.com/amulex-mini-app:latest

# Deploy
docker pull registry.example.com/amulex-mini-app:latest
docker run -d -p 3000:3000 \
  --name amulex-mini-app \
  --restart unless-stopped \
  -e DATABASE_URL="..." \
  registry.example.com/amulex-mini-app:latest
```

## 🔄 Updates

```bash
# Rebuild and restart
docker-compose up -d --build

# Or pull latest and restart
docker-compose pull
docker-compose up -d
```

## 🐛 Debugging

### View logs
```bash
docker logs amulex-mini-app -f
```

### Execute commands in container
```bash
docker exec -it amulex-mini-app sh
```

### Database access
```bash
docker exec -it amulex-db psql -U postgres -d amulex
```

## 📈 Performance Tips

1. **Use .dockerignore** - Already configured to exclude unnecessary files
2. **Multi-stage builds** - Reduces final image size
3. **Layer caching** - Dependencies cached separately from code
4. **Health checks** - Automatic container restart on failure
5. **Resource limits** - Add to docker-compose.yml:
```yaml
services:
  app:
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 512M
```

## 🔐 Security Checklist

- ✅ Non-root user
- ✅ Minimal base image (Alpine)
- ✅ No unnecessary tools
- ✅ Environment variables for secrets
- ✅ Health checks enabled
- ✅ Production dependencies only

## 🌐 Kubernetes Deployment (Optional)

If deploying to K8s, create deployment.yaml:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: amulex-mini-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: amulex-mini-app
  template:
    metadata:
      labels:
        app: amulex-mini-app
    spec:
      containers:
      - name: app
        image: amulex-mini-app:latest
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: url
```
