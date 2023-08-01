<script lang="ts">
	import { onMount } from 'svelte';

	let seconds = 3;

	onMount(() => {
		const interval = setInterval(() => {
			seconds--;
			if (seconds === 0) {
				clearInterval(interval);
			}
		}, 1000);
	});
</script>

<p class="text-sm">
	Nice work! Refreshing Component in {seconds} second{seconds > 1 ? 's' : ''}...
</p>
