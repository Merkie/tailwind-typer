<script lang="ts">
	import type { Writable } from 'svelte/store';

	export let currentType: Writable<string>;
	export let typingQueue: Writable<string>;
	export let finishedTyping: Writable<string[]>;
	export let selectedElement: { html: string; classes: Record<string, string> };

	let renderHtml: string;
	let cursorElement = '';

	const renderComponent = () => {
		renderHtml = selectedElement.html;

		// All the keys that point to the class list which the user will type
		const classes = Object.keys(selectedElement.classes);

		classes.forEach((className) => {
			const USER_FINISHED_TYPING_CLASSES = $finishedTyping.includes(
				selectedElement.classes[className]
			);

			if (USER_FINISHED_TYPING_CLASSES) {
				// Replace the class key with the actual class list string
				renderHtml = renderHtml.replace(
					`class="${className}"`,
					`class="${selectedElement.classes[className]}"`
				);
			} else {
				const TYPING_QUEUE_EMPTY = !$typingQueue || $typingQueue.length < 1;
				if (TYPING_QUEUE_EMPTY) {
					// Set the typing queue to the next class list in the array
					cursorElement = className;
					$typingQueue = selectedElement.classes[className];
				}

				// If the this element is the one the user is working on...
				if (className === cursorElement) {
					// Replace the class value with whatever the user has typed so far, this updates the classes live.
					renderHtml = renderHtml.replace(`class="${className}"`, `class="${$currentType}"`);
				} else {
					// Remove the class attribute from the element so it just displays without styling.
					renderHtml = renderHtml.replace(`class="${className}"`, ``);
				}
			}
		});
	};

	// Reactive Function / Effect
	// Rerenders the component whenever $currentType or $typingQueue changes
	$: {
		$currentType;
		$typingQueue;
		renderComponent();
	}
</script>

<div
	class="dots grid w-full min-w-[400px] place-items-center rounded-md border border-stone-800 bg-stone-900 p-4 py-8"
>
	{@html renderHtml}
</div>

<style lang="postcss">
	.dots {
		background-image: radial-gradient(theme(colors.stone.800) 1px, transparent 0);
		background-size: 15px 15px;
		background-position: -5px -5px;
	}
</style>
