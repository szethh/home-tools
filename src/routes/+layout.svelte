<script lang="ts">
	import '../app.postcss';
	import 'iconify-icon';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import {
		AppBar,
		AppShell,
		storePopup,
		initializeStores,
		Toast,
		Drawer,
		type DrawerSettings
	} from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	initializeStores();

	import { getDrawerStore } from '@skeletonlabs/skeleton';
	const drawerStore = getDrawerStore();

	const drawerSettings: DrawerSettings = {
		meta: { foo: 'bar', fizz: 'buzz', age: 40 }
	};

	const routes = [
		{ name: 'Groceries', href: '/groceries', icon: 'material-symbols:shopping-cart' }
	];
</script>

<Toast />
<Drawer position="left">
	<div class="mx-12">
		<div class="my-5 font-heading-token text-xl">Tools</div>

		<div class="flex flex-col gap-4">
			<hr />
			{#each routes as route}
				<a href={route.href} class="flex items-center gap-4 text-xl">
					<iconify-icon icon={route.icon} />
					{route.name}
				</a>
				<hr />
			{/each}
		</div>
	</div>
</Drawer>

<AppShell>
	<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
		<button
			slot="lead"
			class="flex items-center text-3xl"
			on:click={() => {
				drawerStore.open();
			}}
		>
			<iconify-icon icon="mdi:menu" />
		</button>

		<a href="/">Heyy</a>

		<div slot="trail" class="flex items-center text-3xl">
			<iconify-icon icon="mdi:user-outline" />
		</div>
	</AppBar>

	<slot />
</AppShell>
