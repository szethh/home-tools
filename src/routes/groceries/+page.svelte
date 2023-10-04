<script lang="ts">
	import 'iconify-icon';
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
	import { enhance } from '$app/forms';

	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import type { GroceryItem } from '$lib/schema.js';
	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation';
	import { writable } from 'svelte/store';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';

	const toastStore = getToastStore();

	export let data;

	const groceryStore = (initial: GroceryItem[] = []) => {
		const store = writable(initial);

		function set(value: GroceryItem[]) {
			store.set(value.sort((a, b) => Number(a.status) - Number(b.status) || a.id - b.id));
		}

		return {
			...store,
			set
		};
	};

	let items = groceryStore();
	let itemsCopy: GroceryItem[];
	$: {
		// working copy
		$items = data.shoppingList;
		// to compare
		itemsCopy = structuredClone(data.shoppingList);
	}

	let updateTimeout: NodeJS.Timeout;
	$: {
		$items;
		if (browser) queueUpdate();
	}

	const queueUpdate = () => {
		clearTimeout(updateTimeout);
		updateTimeout = setTimeout(() => {
			const diff = $items.filter((a) =>
				itemsCopy.some((b) => b.id === a.id && (a.name !== b.name || a.status !== b.status))
			);

			if (diff.length) {
				fetch(`${$page.url}`, {
					method: 'post',
					body: JSON.stringify(diff)
				})
					.then(() => invalidate('db:groceries'))
					.catch((e) => {
						const t: ToastSettings = {
							message: e as string
						};
						toastStore.trigger(t);
					});
			}
		}, 1000);
	};

	onMount(() => {
		queueUpdate();
	});

	$: console.log($items);
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

	{#each $items as item, i (item.id)}
		<div animate:flip={{ duration: 200 }} in:fly={{ duration: 200 }}>
			<div class="flex items-center gap-2">
				<input type="hidden" name="itemId" value={item.id} />

				<input
					type="checkbox"
					name="status"
					bind:checked={item.status}
					class="checkbox input w-10 h-10 rounded-full"
				/>

				<div class="input-group input-group-divider grid-cols-[1fr_auto]">
					<input type="text" name="name" bind:value={item.name} class="input" />

					<form method="post" action="?/remove" use:enhance>
						<input type="hidden" name="itemId" value={item.id} />

						<button class="btn variant-filled-error aspect-square" type="submit">
							<iconify-icon icon="mdi:remove" />
						</button>
					</form>
				</div>
			</div>
		</div>
	{/each}
</div>
