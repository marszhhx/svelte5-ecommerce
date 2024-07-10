<script lang="ts">
	import PageHeader from '@/components/PageHeader.svelte';
	import { Button } from '@/components/ui/button';
	import * as Table from '$lib/components/ui/table';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';

	import { CheckCircle, MoreVertical, XCircle } from 'lucide-svelte/icons';
	import { formatCurrency, formatNumber } from '$lib/utils';

	let { data } = $props();
	let { products } = $derived(data);
</script>

<div class="flex items-center justify-between">
	<PageHeader>Products</PageHeader>
	<Button href="/admin/products/new">Add Product</Button>
</div>

<Table.Root>
	<Table.Header>
		<Table.Row>
			<Table.Head class="w-0">
				<span class="sr-only">Available for Purchase</span>
			</Table.Head>
			<Table.Head>Name</Table.Head>
			<Table.Head>Price</Table.Head>
			<Table.Head class="w-0">
				<span class="sr-only">Actions</span>
			</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each products as product}
			<Table.Row>
				<Table.Cell>
					{#if product.isAvailableForPurchase}
						<span class="sr-only">Available</span>
						<CheckCircle />
					{:else}
						<span class="sr-only">Not Available</span>
						<XCircle />
					{/if}
				</Table.Cell>
				<Table.Cell>{product.name}</Table.Cell>
				<Table.Cell>{formatCurrency(product.priceInCents / 100)}</Table.Cell>
				<Table.Cell class="text-right">
					{formatNumber(product._count.Order)}
				</Table.Cell>
				<Table.Cell class="text-right">
					<DropdownMenu.Root>
						<DropdownMenu.Trigger>
							<MoreVertical />
							<span class="sr-only">Action</span>
						</DropdownMenu.Trigger>
						<DropdownMenu.Content>
							<DropdownMenu.Item href="/admin/products/{product.id}/download" download
								>Download</DropdownMenu.Item
							>
							<DropdownMenu.Item href="/admin/products/{product.id}/edit">Edit</DropdownMenu.Item>
							<form action="?/toggleAvailability" method="POST" use:enhance>
								<button type="submit" class="w-full">
									<DropdownMenu.Item>
										{#if product.isAvailableForPurchase}
											Deactivate
										{:else}
											Activate
										{/if}
									</DropdownMenu.Item>
								</button>
								<input type="hidden" name="id" value={product.id} />
								<input
									type="checkbox"
									name="isAvailableForPurchase"
									class="hidden"
									checked={!product.isAvailableForPurchase}
								/>
							</form>
							<!-- delete -->
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
