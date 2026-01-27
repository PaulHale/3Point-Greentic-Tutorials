/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly GREENTIC_ENDPOINT?: string;
  readonly GREENTIC_TENANT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
