<script lang="ts">
	import { page } from '$app/stores';
	import Nav from '$lib/components/Nav.svelte';
	import { cn } from '@/utils';
	let pathname = $derived($page.url.pathname);
	let { children } = $props();
</script>

<Nav>
	{@render navLink({ href: '/admin', text: 'dashboard' })}
	{@render navLink({ href: '/admin/products', text: 'products' })}
	{@render navLink({ href: '/admin/users', text: 'customers' })}
	{@render navLink({ href: '/admin/others', text: 'sales' })}
	<!-- Todo: Logout button -->
</Nav>

<div class="container my-6">
	<!--This will render page.svelte-->
	{@render children()}
</div>

{#snippet navLink({ href, text }: { href: string; text: string })}
	<a
		{href}
		class={cn(
			'p-4 capitalize hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground',
			pathname === href && 'bg-background text-foreground'
		)}
	>
		{text}</a
	>
{/snippet}
