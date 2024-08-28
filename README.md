# weather-app-frontend

Frontend for Weather App built in NextJs 14. The frontend is decoupled from backend and is hosted on Netlify.

## Table of Contents

- [Technologies](#technologies)
- [Demo](#demo)
- [Approach](#approach)
- [Installation](#installation)
- [Usage](#usage)
- [Benchmarking](#benchmarking)
- [Testing](#testing)

### Technologies

- **NextJs 14**: Excellent choice for modern, performant, and SEO-friendly web applications.

- **Google Cloud Run**: Serverless container runtime hosting backend.

### Demo

- **Live Demo**: [Link](https://weather-app-frontend-ui.netlify.app)
- **Backend Repo**: [Repo](https://github.com/Bascil/weather-app-backend)

### Approach

- Maintainability: Clean code practices, unit tests, and CI/CD with google cloud build.

### Installation

This project can be run locally backend url will be set in .env.local file

1. Clone the repository

```
git clone git@github.com:Bascil/weather-app-frontend.git
cd weather-app-frontend
```

2. Install npm dependencies

```
npm install
```

3. Create .env.local file

```
touch .env.local
```

4. Set env vars in .env.local

NEXT_PUBLIC_APP_ENV=local
NEXT_PUBLIC_BACKEND_URL=http://localhost:8080/api/v1

**NEXT_PUBLIC_BACKEND_URL** is set to localhost assuming the backend was setup using docker as per the readme instructions [here](https://github.com/Bascil/weather-app-backend)

Optionally you can set backend url to point to cloud run instance, but you may experience CORS issues

```
NEXT_PUBLIC_BACKEND_URL=https://weather-app-backend-hwiqzxsgfq-uc.a.run.app/api/v1
```

5. Run the application

```
npm run dev
```
