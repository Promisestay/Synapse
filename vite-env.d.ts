interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_PUBLIC_STRIPE_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
