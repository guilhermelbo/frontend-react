/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BAYER_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
