<script lang="ts">
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import { writable, type Writable } from 'svelte/store';
	import TypingWindow from '$components/TypingWindow.svelte';
	import ElementPreview from '$components/ElementPreview.svelte';
	import Stats from '$components/Stats.svelte';
	import { components, type ComponentObject } from '$lib/components';
	import { makeRandomSelection } from '$lib/utils';

	const currentType = writable('');
	const typingQueue = writable('');
	const finishedTyping: Writable<string[]> = writable([]);

	let hasTyped = false;
	let mistakes = 0;

	let typingTextColor = 'text-stone-200';

	let componentToBeTyped: ComponentObject;
	let refreshing = false;

	// Bottom Stopwatch Timer
	let timerRunning = false;
	let seconds = 0;
	let secondsFreeze = 0;
	let interval: number;
	const toggleTimer = () => {
		if (timerRunning) {
			clearInterval(interval);
			timerRunning = false;
		} else {
			interval = setInterval(() => {
				seconds++;
			}, 10);
			timerRunning = true;
		}
	};

	// Refresh State + Component
	const refreshComponent = async () => {
		console.log(188);
		refreshing = true;
		secondsFreeze = seconds;

		await new Promise((r) => setTimeout(r, 3000));

		toggleTimer();

		componentToBeTyped = makeRandomSelection(components);
		seconds = 0;
		mistakes = 0;
		hasTyped = false;
		refreshing = false;
	};

	onMount(async () => {
		// Get component on page load
		componentToBeTyped = makeRandomSelection(components);

		window.addEventListener('keypress', async (e) => {
			if (!hasTyped) {
				toggleTimer();
				hasTyped = true;
			}
			if (e.key === $typingQueue[$currentType.length]) {
				$currentType = $typingQueue.slice(0, $currentType.length + 1);
				if ($currentType === $typingQueue) {
					$finishedTyping = [...$finishedTyping, $typingQueue];
					$typingQueue = '';
					$currentType = '';
				}
			} else {
				mistakes++;
				typingTextColor = 'text-red-300';
				await new Promise((r) => setTimeout(r, 100));
				typingTextColor = 'text-stone-200';
			}
		});
	});
</script>

<main class="flex h-screen w-screen flex-col items-center justify-center gap-8">
	{#if !refreshing}
		<TypingWindow
			{hasTyped}
			{currentType}
			{typingQueue}
			{finishedTyping}
			{typingTextColor}
			classesLength={1 +
				(componentToBeTyped?.children?.filter((child) => child.classes).length || 0)}
		/>
	{:else}
		<p class="text-sm">Nice work! Refreshing Component in 3 seconds...</p>
	{/if}

	<div class="w-screen max-w-[400px]">
		<p class="mb-2 text-sm text-stone-500">Element preview:</p>
		{#if componentToBeTyped}
			<ElementPreview
				{componentToBeTyped}
				{typingQueue}
				{currentType}
				{refreshComponent}
				{finishedTyping}
			/>
		{/if}
	</div>

	<Stats {seconds} {secondsFreeze} {mistakes} {refreshing} />
</main>
