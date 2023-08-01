<script lang="ts">
	import { ElapsedTime } from '$lib/timer';
	export let mistakeCount: number;
</script>

<p class="w-full max-w-[400px] text-sm text-stone-500">
	Mistakes: {mistakeCount} • Time: {`${($ElapsedTime / 1000).toFixed(2)}`.replace('.', ':')}
</p>
