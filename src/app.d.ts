// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}

import 'vite-plugin-pwa/info';
import 'vite-plugin-pwa/svelte';

declare module 'virtual:pwa-register' {
	import type { RegisterSWOptions } from 'vite-plugin-pwa/types';

	export type { RegisterSWOptions };

	export function registerSW(options?: RegisterSWOptions): (reloadPage?: boolean) => Promise<void>;
}
