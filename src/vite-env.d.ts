/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_API_ORIGIN_URL: string;
  readonly VITE_APP_API_AUTH_URL: string;
  readonly VITE_APP_API_ADMIN_URL: string;
  readonly VITE_APP_FETCH_TIMEOUT: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
