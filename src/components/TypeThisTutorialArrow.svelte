<script lang="ts">
	import { scale } from 'svelte/transition';
	import TypeThis from './svgs/TypeThis.svelte';
	import Arrow from './svgs/Arrow.svelte';
</script>

<span
	out:scale
	class="bobbing absolute -left-[10px] -top-[65px] flex items-center gap-2 text-sm text-orange-600 md:-left-[65px] md:-top-[85px]"
>
	<div class="w-[100px] md:w-[140px]">
		<TypeThis />
	</div>
	<div
		class="absolute -bottom-[0px] -right-[70px] w-[50px] -rotate-[20deg] scale-y-[-1] md:-bottom-[80px] md:right-[80px] md:w-[70px] md:rotate-[120deg] md:scale-y-[1]"
	>
		<Arrow />
	</div>
</span>
