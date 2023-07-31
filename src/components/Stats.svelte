<script lang="ts">
	export let mistakes: number;
	export let refreshing: boolean;
	export let seconds: number;
	export let secondsFreeze: number;
</script>

<p class="text-sm text-stone-500">
	Mistakes: {mistakes} • Time: {`${((refreshing ? secondsFreeze : seconds) / 100).toFixed(
		2
	)}`.replace('.', ':')}
</p>
