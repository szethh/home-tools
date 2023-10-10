<script lang="ts">
	import '../app.postcss';
	import 'iconify-icon';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { AppBar, AppShell, storePopup, initializeStores, Toast } from '@skeletonlabs/skeleton';
	import { onMount, tick } from 'svelte';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	initializeStores();

	// types not available :/
	interface BeforeInstallPrompt extends Event {
		prompt(): Promise<void>;
		readonly userChoice: Promise<{
			outcome: 'accepted' | 'dismissed';
			platform: string;
		}>;
	}
	let deferredPrompt: BeforeInstallPrompt | undefined;

	function setupEvent(e: Event) {
		e.preventDefault();
		deferredPrompt = e as BeforeInstallPrompt;
		// console.log(e);
	}

	async function handleInstall() {
		if (!deferredPrompt) return;

		deferredPrompt.prompt();
		let { outcome } = await deferredPrompt.userChoice;
		if (outcome === 'accepted') {
			deferredPrompt = undefined;
		}
	}

	export let data;
	$: ({ user } = data);
</script>

<svelte:window on:beforeinstallprompt={setupEvent} />

<svelte:head>
	<link rel="manifest" href="/manifest.webmanifest" />
</svelte:head>

<Toast />

<AppShell>
	<svelte:fragment slot="header">
		<AppBar
			gridColumns="grid-cols-3 items-center justify-between place-content-between"
			slotDefault="place-self-center"
			slotTrail="place-content-end"
		>
			<div slot="lead" />

			<div class="text-center">
				<a href="/" class="font-heading-token text-2xl">Home Tools</a>
				<div class="text-sm text-tertiary-400">(logged in as {user})</div>
			</div>

			<svelte:fragment slot="trail">
				{#if deferredPrompt}
					<button
						class="p-2 text-2xl variant-ghost-primary min-h-fit aspect-square"
						on:click={handleInstall}
					>
						<iconify-icon icon="material-symbols:download-sharp" />
					</button>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<slot />
</AppShell>
