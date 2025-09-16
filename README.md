# Fruit Delivery

React + Vite app serving a mock fruit catalog with authentication, cart, and payment demo flows.

## Local Development

```bash
npm install
npm run dev
```
Open http://localhost:5173/login and sign in with `demo@example.com` / `password`.

## Production Build

```bash
npm run build
npm run preview
```

## Docker

Build and run:
```bash
docker build -t fruit-delivery .
docker run --rm -p 5173:80 fruit-delivery
```

Compose:
```bash
docker compose up --build
```

## Kubernetes (Helm)

Chart under `helm/fruit-delivery`.
```bash
helm install fruit-delivery ./helm/fruit-delivery --namespace hypergo --create-namespace \
  --set image.repository=<your-registry>/fruit-delivery --set image.tag=<tag>
```

Port-forward:
```bash
kubectl port-forward svc/fruit-delivery-fruit-delivery 5173:80 -n hypergo
```
