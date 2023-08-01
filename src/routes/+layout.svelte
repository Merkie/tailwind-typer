<script>
	import Header from '$components/Header.svelte';
	import '../app.css';
</script>

<Header />
<slot />

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.stone.950);
		color: theme(colors.stone.200);
	}
</style>
