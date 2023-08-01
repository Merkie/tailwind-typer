<script>
	import { scale } from 'svelte/transition';
	import LookHere from './svgs/LookHere.svelte';
	import Arrow from './svgs/Arrow.svelte';
</script>

<span out:scale class="bobbing absolute -bottom-[90px] right-[40px] text-orange-600 md:right-[0px]">
	<div class="-rotate-[10deg]">
		<div class="w-[120px] md:w-[150px]">
			<LookHere />
		</div>
		<div
			class="absolute -bottom-[25px] -right-[43px] w-[60px] rotate-[18deg] md:-bottom-[35px] md:w-[80px]"
		>
			<Arrow />
		</div>
	</div>
</span>
