<script lang="ts">
	import type { Writable } from 'svelte/store';
	import { scale } from 'svelte/transition';

	export let typingQueue: Writable<string>;
	export let hasTyped: boolean;
	export let currentType: Writable<string>;
	export let finishedTyping: Writable<string[]>;
	export let classesLength: number;
	export let typingTextColor: string;

	let typingWindowElem: HTMLDivElement;
	let textWidth: number;
</script>

<div
	bind:this={typingWindowElem}
	in:scale
	class="relative w-fit transition-all"
	style="max-width: min(90vw, 600px)"
>
	<div class="w-full overflow-hidden">
		<div
			class="absolute left-0 top-0 z-20 h-full w-[40px] bg-gradient-to-r from-stone-950 to-transparent"
		/>
		<div
			class="absolute right-0 top-0 z-20 h-full w-[40px] bg-gradient-to-l from-stone-950 to-transparent"
		/>
		<p
			class={'whitespace-nowrap px-4 text-2xl transition-all ' + typingTextColor}
			style={`transform: translateX(-${textWidth > 200 ? textWidth - 200 : 0}px`}
		>
			<span class="text-orange-500">{$currentType}</span><span
				>{$typingQueue.slice($currentType.length)}</span
			>
		</p>
	</div>
	{#if !hasTyped}
		<span
			transition:scale
			class="bobbing absolute -top-[25px] left-[15px] flex items-center gap-2 text-sm text-stone-500"
			>Type This <i class="bi bi-arrow-down" /></span
		>
	{/if}
	{#if classesLength > 1}
		<p transition:scale class="absolute -top-[25px] right-0 text-sm text-stone-500">
			{$finishedTyping.length + 1} / {classesLength}
		</p>
	{/if}
</div>

<p
	class="pointer-events-none fixed left-0 top-0 whitespace-nowrap px-4 text-2xl opacity-0 transition-all"
	bind:clientWidth={textWidth}
>
	{$currentType}
</p>

<style>
	.bobbing {
		animation: bobbing 2s infinite ease-in-out;
	}

	@keyframes bobbing {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-4px);
		}
	}
</style>
