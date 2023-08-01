<script lang="ts">
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import TypingWindow from '$components/TypingWindow.svelte';
	import ElementPreview from '$components/ElementPreview.svelte';
	import Stats from '$components/Stats.svelte';
	import { makeRandomSelection } from '$lib/utils';
	import { elements } from '$lib/elements';
	import LookHere from '$components/svgs/LookHere.svelte';
	import Arrow from '$components/svgs/Arrow.svelte';
	import TypeThis from '$components/svgs/TypeThis.svelte';
	import { CurrentUserInput, FinishedStrings, StringToType } from '$lib/stores';
	import TypeThisTutorialArrow from '$components/TypeThisTutorialArrow.svelte';
	import LookHereTutorialArrow from '$components/LookHereTutorialArrow.svelte';

	// App state
	let selectedElement = makeRandomSelection(elements);
	let hasTyped = false;
	let mistakes = 0;
	let typingTextColor = 'text-stone-200';
	let refreshing = false;
	let displayedTutorial = false;
	let displayTutorialArrows = true;

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

	// Key press listener on the window
	// This will also capture the keyboard events from <input /> tags
	onMount(async () => {
		window.addEventListener('keypress', async (e: KeyboardEvent) => {
			// Start the timer when the user starts typing
			if (!hasTyped) {
				toggleTimer();
				hasTyped = true;
				displayedTutorial = true;
			}

			// If the key pressed is correct... (the next one in line)
			if (e.key === $StringToType[$CurrentUserInput.length]) {
				// append the key to the current type
				$CurrentUserInput = $StringToType.slice(0, $CurrentUserInput.length + 1);

				// If the user is done typing the entire class list...
				if ($CurrentUserInput === $StringToType) {
					// Add the class list onto the finishedTyping array and reset some state
					$FinishedStrings = [...$FinishedStrings, $StringToType];
					$StringToType = '';
					$CurrentUserInput = '';
				}
			} else {
				mistakes++; // Add a mistake

				// Make the white text flash red
				// TODO: handle this better
				typingTextColor = 'text-red-300';
				await new Promise((r) => setTimeout(r, 100));
				typingTextColor = 'text-stone-200';
			}
		});
	});

	const resetStateAndRefreshComponent = async () => {
		refreshing = true;
		secondsFreeze = seconds; // Freeze the stopwatch

		await new Promise((r) => setTimeout(r, 3000));
		toggleTimer();

		// Get a new random element
		selectedElement = makeRandomSelection(elements);

		/// Reset stores
		$StringToType = '';
		$CurrentUserInput = '';
		$FinishedStrings = [];

		// Reset local state
		seconds = 0;
		mistakes = 0;
		hasTyped = false;
		refreshing = false;
	};

	$: displayTutorialArrows = !hasTyped && $StringToType.length > 1 && !displayedTutorial;

	$: {
		if (
			!refreshing &&
			$StringToType === '' &&
			$FinishedStrings.length === Object.keys(selectedElement.classes).length
		)
			resetStateAndRefreshComponent();
	}
</script>

<main class="flex h-screen w-screen flex-col items-center justify-center gap-8">
	<div class="relative">
		{#if !refreshing}
			<div in:scale>
				<TypingWindow
					{typingTextColor}
					classesLength={Object.keys(selectedElement.classes).length}
				/>
			</div>
		{:else}
			<p in:scale class="text-sm">Nice work! Refreshing Component in 3 seconds...</p>
		{/if}
		{#if displayTutorialArrows}
			<TypeThisTutorialArrow />
		{/if}
	</div>

	<div class="relative w-screen max-w-[400px]">
		<p class="mb-2 text-sm text-stone-500">Element preview:</p>
		{#key refreshing}
			<ElementPreview {selectedElement} />
		{/key}
		{#if displayTutorialArrows}
			<LookHereTutorialArrow />
		{/if}
	</div>

	<Stats {seconds} {secondsFreeze} {mistakes} {refreshing} />
</main>
