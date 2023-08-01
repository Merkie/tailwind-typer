<script lang="ts">
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import { writable, type Writable } from 'svelte/store';
	import TypingWindow from '$components/TypingWindow.svelte';
	import ElementPreview from '$components/ElementPreview.svelte';
	import Stats from '$components/Stats.svelte';
	import { makeRandomSelection } from '$lib/utils';
	import { elements } from '$lib/elements';

	// Stores
	// TODO: Move to new file
	const currentType = writable('');
	const typingQueue = writable('');
	const finishedTyping: Writable<string[]> = writable([]);

	// App state
	let selectedElement = makeRandomSelection(elements);
	let hasTyped = false;
	let mistakes = 0;
	let typingTextColor = 'text-stone-200';
	let refreshing = false;
	let displayedTutorial = false;

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

	const handleKeypress = async (e: KeyboardEvent) => {
		// Start the timer when the user starts typing
		if (!hasTyped) {
			toggleTimer();
			hasTyped = true;
			displayedTutorial = true;
		}

		// If the key pressed is correct... (the next one in line)
		if (e.key === $typingQueue[$currentType.length]) {
			// append the key to the current type
			$currentType = $typingQueue.slice(0, $currentType.length + 1);

			// If the user is done typing the entire class list...
			if ($currentType === $typingQueue) {
				// Add the class list onto the finishedTyping array and reset some state
				$finishedTyping = [...$finishedTyping, $typingQueue];
				$typingQueue = '';
				$currentType = '';
			}
		} else {
			mistakes++; // Add a mistake

			// Make the white text flash red
			// TODO: handle this better
			typingTextColor = 'text-red-300';
			await new Promise((r) => setTimeout(r, 100));
			typingTextColor = 'text-stone-200';
		}
	};

	onMount(async () => {
		window.addEventListener('keypress', handleKeypress);
	});

	const resetStateAndRefreshComponent = async () => {
		refreshing = true;
		secondsFreeze = seconds; // Freeze the stopwatch

		await new Promise((r) => setTimeout(r, 3000));
		toggleTimer();

		// Get a new random element
		selectedElement = makeRandomSelection(elements);

		/// Reset stores
		$typingQueue = '';
		$currentType = '';
		$finishedTyping = [];

		// Reset local state
		seconds = 0;
		mistakes = 0;
		hasTyped = false;
		refreshing = false;
	};

	$: {
		if (
			!refreshing &&
			$typingQueue === '' &&
			$finishedTyping.length === Object.keys(selectedElement.classes).length
		)
			resetStateAndRefreshComponent();
	}
</script>

<main class="flex h-screen w-screen flex-col items-center justify-center gap-8">
	{#if !refreshing}
		<div in:scale>
			<TypingWindow
				{handleKeypress}
				{displayedTutorial}
				{hasTyped}
				{currentType}
				{typingQueue}
				{finishedTyping}
				{typingTextColor}
				classesLength={Object.keys(selectedElement.classes).length}
			/>
		</div>
	{:else}
		<p in:scale class="text-sm">Nice work! Refreshing Component in 3 seconds...</p>
	{/if}

	<div class="w-screen max-w-[400px]">
		<p class="mb-2 text-sm text-stone-500">Element preview:</p>

		{#key refreshing}
			<ElementPreview {selectedElement} {typingQueue} {currentType} {finishedTyping} />
		{/key}
	</div>

	<Stats {seconds} {secondsFreeze} {mistakes} {refreshing} />
</main>
