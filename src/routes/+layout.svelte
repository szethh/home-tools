<script lang="ts">
	import '../app.postcss';
	import 'iconify-icon';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { AppBar, AppShell, storePopup, initializeStores, Toast } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	initializeStores();

	export let data;
	$: ({ user } = data);
</script>

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
