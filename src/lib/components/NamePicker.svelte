<script lang="ts">
	import { invalidateAll } from '$app/navigation';

	let user: string;
</script>

<div class="grid grid-cols-[1fr_auto] gap-2 items-center mb-4">
	<input class="input" type="text" placeholder="change name" bind:value={user} />
	<button
		on:click={() => {
			if (user) document.cookie = `user=${user}`;
			else document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
			invalidateAll();
		}}
		class="btn variant-filled-success aspect-square p-3 text-xl"
	>
		<iconify-icon icon="mdi:tick" />
	</button>
</div>
