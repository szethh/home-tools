<script lang="ts">
	import 'iconify-icon';
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
	import { enhance } from '$app/forms';

	import { getToastStore } from '@skeletonlabs/skeleton';
	import type { GroceryItem } from '$lib/schema.js';

	const toastStore = getToastStore();

	export let data;
	$: ({ shoppingList } = data);

	$: console.log(shoppingList);

	let items: (GroceryItem & { form?: HTMLFormElement })[];
	$: items = shoppingList.sort((a, b) => Number(a.status) - Number(b.status));
</script>

<div class="p-5 flex flex-col gap-4">
	<form method="post" action="?/new" use:enhance>
		<div class="flex">
			<input type="text" placeholder="what do we need?" name="item" class="input" />

			<button class="variant-ghost-secondary btn border-2 aspect-square text-3xl p-2" type="submit">
				<iconify-icon icon="material-symbols:add" />
			</button>
		</div>
	</form>

	{#each items as item, i (item.id)}
		<div animate:flip={{ duration: 200 }} in:fly={{ duration: 200 }}>
			<form
				method="post"
				action="?/update"
				bind:this={item.form}
				use:enhance={({ formData, cancel }) => {
					console.log('submitting');

					if (!formData.has('name')) cancel();

					return async ({ result, update }) => {
						if (result.type === 'failure') {
							// svelte does not allow type annotations inside the markup...
							// so we use string templating to 'force' msg to be a string
							// otherwise typescript complains
							const msg = `${result.data?.message ?? 'Oops!'}`;
							toastStore.trigger({ message: msg });
						}
						update();
					};
				}}
			>
				<div class="flex items-center gap-2">
					<input type="hidden" name="itemId" value={item.id} />

					<input
						type="checkbox"
						name="status"
						checked={item.status}
						class="checkbox input w-10 h-10 rounded-full"
						on:input={() => {
							item.form?.requestSubmit();
						}}
					/>

					<div class="input-group input-group-divider grid-cols-[1fr_auto]">
						<input type="text" name="name" bind:value={item.name} class="input" />

						<!-- on:focusout={() => {
								item.form?.requestSubmit();
							}} -->

						<form method="post" action="?/remove" use:enhance>
							<input type="hidden" name="itemId" value={item.id} />

							<button class="btn variant-filled-error aspect-square" type="submit">
								<iconify-icon icon="mdi:remove" />
							</button>
						</form>
					</div>
				</div>
			</form>
		</div>
	{/each}
</div>
