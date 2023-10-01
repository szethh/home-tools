<script lang="ts">
	import { invalidate, invalidateAll } from '$app/navigation';

	const routes = [
		{ name: 'Groceries', href: '/groceries', icon: 'material-symbols:shopping-cart' },
		{ name: 'Config', href: '/config', icon: 'mdi:wrench' }
	];

	let user: string;
</script>

<div class="my-4">
	<div class="flex flex-col gap-4 items-center">
		<div class="grid grid-cols-[1fr_auto] gap-2 items-center">
			<input class="input" type="text" placeholder="change name" bind:value={user} />
			<button
				on:click={() => {
					if (user) document.cookie = `user=${user}`;
					else document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
					invalidateAll();
				}}
				class="btn variant-filled-success aspect-square"
			>
				<iconify-icon icon="mdi:tick" />
			</button>
		</div>

		{#each routes as route}
			<a href={route.href} class="flex items-center gap-4 text-xl card px-20 py-4">
				<iconify-icon icon={route.icon} />
				{route.name}
			</a>
			<hr />
		{/each}
	</div>
</div>
