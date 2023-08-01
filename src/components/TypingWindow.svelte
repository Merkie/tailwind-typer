<script lang="ts">
	import type { Writable } from 'svelte/store';
	import { scale } from 'svelte/transition';
	import TypeThis from './svgs/TypeThis.svelte';
	import Arrow from './svgs/Arrow.svelte';
	import LookHere from './svgs/LookHere.svelte';

	export let typingQueue: Writable<string>;
	export let hasTyped: boolean;
	export let currentType: Writable<string>;
	export let finishedTyping: Writable<string[]>;
	export let classesLength: number;
	export let typingTextColor: string;
	export let displayedTutorial: boolean;

	let typingWindowElem: HTMLDivElement;
	let textWidth: number;
</script>

<div
	bind:this={typingWindowElem}
	in:scale
	class="relative w-fit rounded-md p-2 ring-orange-600 ring-opacity-20 transition-all focus-within:ring-4"
	style="max-width: min(90vw, 600px)"
>
	<input
		on:input|stopPropagation={(e) => {
			//@ts-ignore
			e.target.value = '';
		}}
		type="text"
		class="absolute left-0 top-0 z-20 h-full w-full bg-transparent text-transparent outline-none"
	/>
	<div class="w-full overflow-hidden rounded-md">
		<div
			class="absolute left-0 top-0 z-20 h-full w-[40px] rounded-l-md bg-gradient-to-r from-stone-950 to-transparent"
		/>
		<div
			class="absolute right-0 top-0 z-20 h-full w-[40px] rounded-r-md bg-gradient-to-l from-stone-950 to-transparent"
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
	{#if !hasTyped && $typingQueue && !displayedTutorial}
		<span
			transition:scale
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
		<span
			transition:scale
			class="bobbing absolute -bottom-[215px] right-[40px] flex items-center gap-2 text-sm text-orange-600 md:-bottom-[85px] md:-right-[45px]"
		>
			<div class="-rotate-[20deg] md:rotate-[20deg]">
				<div class="w-[120px]">
					<LookHere />
				</div>

				<!-- Desktop -->
				<div
					class="absolute -bottom-[65px] -right-[50px] hidden w-[60px] md:block"
					style="transform: scaleY(-1) rotate(-40deg)"
				>
					<Arrow />
				</div>

				<!-- Mobile -->
				<div class="absolute -bottom-[25px] -right-[43px] block w-[40px] rotate-[20deg] md:hidden">
					<Arrow />
				</div>
			</div>
		</span>
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
