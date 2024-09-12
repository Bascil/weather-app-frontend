# weather-app-frontend

Frontend for Weather App built in NextJs 14. The frontend is decoupled from backend.

## Table of Contents

- [Technologies](#technologies)
- [Approach](#approach)
- [Installation](#installation)

### Technologies

- **NextJs 14**: Excellent choice for modern, performant, and SEO-friendly web applications.
- **Tailwind CSS**: Utility first CSS framework.
- **Ripple UI**: For modern and beatiful tailwind SS components.

### Approach

- State Maangement: Used Redux Toolkit for managing global state efficiently and thunks for handling asynchronous operations like API calls.

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

```
NEXT_PUBLIC_APP_ENV=local
NEXT_PUBLIC_BACKEND_URL=http://localhost:8080/api/v1
```

**NEXT_PUBLIC_BACKEND_URL** is set to localhost assuming the backend was setup using docker as per the readme instructions [here](https://github.com/Bascil/weather-app-backend).

5. Run the application

```
npm run dev
```
