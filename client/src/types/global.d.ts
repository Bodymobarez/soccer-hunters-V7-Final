// Global type declarations

interface Window {
  global: Window;
  process: { env: Record<string, any> };
  Buffer: { isBuffer: (obj: any) => boolean };
  currentSiteLanguage: string;
}

// Make TypeScript aware of the extension we added to the Window interface
declare interface Window {
  global: Window;
  process: { env: Record<string, any> };
  Buffer: { isBuffer: (obj: any) => boolean };
  currentSiteLanguage: string;
}
