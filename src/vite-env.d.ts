/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_PROJECT_ID: string
    readonly VITE_API_TOKEN: string
    readonly VITE_BACKEND: string
    readonly VITE_VERSION_API: string
}
interface ImportMeta {
    readonly env: ImportMetaEnv
}
