<script lang="ts">
	import { CurrentUserInput, FinishedStrings, StringToType } from '$lib/stores';
	import { scale } from 'svelte/transition';

	export let classesLength: number;
	export let typingTextColor: string;

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
		on:input={(e) => {
			//@ts-ignore
			e.target.value = '';
			// we dont need to do anything else because the window listener will handle it
		}}
		type="text"
		class="absolute left-0 top-0 z-20 h-full w-full opacity-0 outline-none"
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
			<span class="text-orange-500">{$CurrentUserInput}</span><span
				>{$StringToType.slice($CurrentUserInput.length)}</span
			>
		</p>
	</div>
	{#if classesLength > 1}
		<p transition:scale class="absolute -top-[25px] right-0 text-sm text-stone-500">
			{$FinishedStrings.length + 1} / {classesLength}
		</p>
	{/if}
</div>

<p
	class="pointer-events-none fixed left-0 top-0 whitespace-nowrap px-4 text-2xl opacity-0 transition-all"
	bind:clientWidth={textWidth}
>
	{$CurrentUserInput}
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
