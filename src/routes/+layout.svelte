<script lang="ts">
	import '../app.postcss';
	import 'iconify-icon';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { AppBar, AppShell, storePopup, initializeStores, Toast } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	initializeStores();

	import { pwaInfo } from 'virtual:pwa-info';
	import { onMount } from 'svelte';

	onMount(async () => {
		if (pwaInfo) {
			const { registerSW } = await import('virtual:pwa-register');
			registerSW({
				immediate: true,
				onRegistered(r) {
					// uncomment following code if you want check for updates
					// r && setInterval(() => {
					//    console.log('Checking for sw update')
					//    r.update()
					// }, 20000 /* 20s for testing purposes */)
					console.log(`SW Registered: ${r}`);
				},
				onRegisterError(error) {
					console.log('SW registration error', error);
				}
			});
		}
	});
	$: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : '';

	export let data;
	$: ({ user } = data);
</script>

<svelte:head>
	{@html webManifest}
</svelte:head>

<Toast />

<AppShell>
	<AppBar gridColumns="grid-cols-1 items-center" slotDefault="place-self-center">
		<div class="text-center">
			<a href="/" class="font-heading-token text-2xl">Tools</a>
			<div class="text-sm text-tertiary-400">(logged in as {user})</div>
		</div>
	</AppBar>

	<slot />
</AppShell>
