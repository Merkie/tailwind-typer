<script lang="ts">
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import TypingWindow from '$components/TypingWindow.svelte';
	import ElementPreview from '$components/ElementPreview.svelte';
	import Stats from '$components/Stats.svelte';
	import TypeThisTutorialArrow from '$components/TypeThisTutorialArrow.svelte';
	import LookHereTutorialArrow from '$components/LookHereTutorialArrow.svelte';
	import { CurrentUserInput, FinishedStrings, StringToType } from '$lib/stores';
	import { clearTimer, startTimer, stopTimer, ElapsedTime } from '$lib/timer';
	import { makeRandomSelection } from '$lib/utils';
	import { elements } from '$lib/elements';
	import RefreshMessage from '$components/RefreshMessage.svelte';

	// App state
	let selectedElement: {
		html: string;
		classes: Record<string, string>;
	} | null = null;
	let mistakeCount = 0;
	let hasTyped = false;
	let refreshing = false;
	let displayedTutorial = false;
	let displayTutorialArrows = true;
	let typingTextColor = 'text-stone-200'; // TODO: get rid of this

	// Key press listener on the window
	// This will also capture the keyboard events from <input /> tags
	onMount(async () => {
		selectedElement = makeRandomSelection(elements);
		window.addEventListener('keypress', async (e: KeyboardEvent) => {
			// Start the timer when the user starts typing
			if (!hasTyped) {
				startTimer();
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
				mistakeCount++; // Add a mistake

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
		stopTimer();

		await new Promise((r) => setTimeout(r, 3000));
		clearTimer();

		// Get a new random element
		selectedElement = makeRandomSelection(elements);

		/// Reset stores
		$StringToType = '';
		$CurrentUserInput = '';
		$FinishedStrings = [];

		// Reset local state
		mistakeCount = 0;
		hasTyped = false;
		refreshing = false;
	};

	// Controls if the tutorial arrows should be displayed
	$: displayTutorialArrows = !hasTyped && $StringToType.length > 1 && !displayedTutorial;

	$: {
		// If the user has finished typing all the classes...
		if (selectedElement)
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
		{#if !refreshing && selectedElement}
			<div in:scale>
				<TypingWindow
					{typingTextColor}
					classesLength={Object.keys(selectedElement.classes).length}
				/>
			</div>
		{:else}
			<div in:scale>
				<RefreshMessage />
			</div>
		{/if}
		{#if displayTutorialArrows}
			<TypeThisTutorialArrow />
		{/if}
	</div>

	<div class="relative w-screen max-w-[400px]">
		<p class="mb-2 text-sm text-stone-500">Element preview:</p>
		{#if selectedElement}
			{#key refreshing}
				<ElementPreview {selectedElement} />
			{/key}
		{/if}
		{#if displayTutorialArrows}
			<LookHereTutorialArrow />
		{/if}
	</div>

	<Stats {mistakeCount} />
</main>
