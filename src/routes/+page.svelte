<script lang="ts">
	import NamePicker from '$lib/components/NamePicker.svelte';

	const routes = [
		{ name: 'Groceries', href: '/groceries', icon: 'material-symbols:shopping-cart' }
		// { name: 'Appreciation Jar', href: '/jar', icon: 'mdi:heart' }
	];
</script>

<div class="my-4 flex justify-center">
	<div class="grid grid-flow-row gap-4 items-center mx-20">
		<NamePicker />

		{#each routes as route}
			<a href={route.href} class="flex items-center gap-4 text-xl card px-20 py-4">
				<iconify-icon icon={route.icon} />
				{route.name}
			</a>
		{/each}
	</div>
</div>
