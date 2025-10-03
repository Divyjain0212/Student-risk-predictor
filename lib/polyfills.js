// Global polyfills for server-side rendering
if (typeof global !== 'undefined' && typeof global.self === 'undefined') {
  global.self = global;
}

if (typeof globalThis !== 'undefined' && typeof globalThis.self === 'undefined') {
  globalThis.self = globalThis;
}