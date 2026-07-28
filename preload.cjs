// Preload fix: Node 22+/25 exposes a broken localStorage global
// when --localstorage-file is not set. Delete it so libraries that
// check typeof localStorage !== 'undefined' fall back properly.
if (typeof globalThis.localStorage !== 'undefined') {
  if (typeof globalThis.localStorage.getItem !== 'function') {
    delete globalThis.localStorage;
  }
}
