interface AppConfig {
  APP_ENV: string;
  BACKEND_URL: string;
}

export const app: AppConfig = {
  APP_ENV: process.env.NEXT_PUBLIC_APP_ENV! || "local",
  BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL!,
};
