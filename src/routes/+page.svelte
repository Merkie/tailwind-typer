<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import { components, type ComponentObject } from '$lib/components';
	import { browser } from '$app/environment';

	let typingWindowElem: HTMLDivElement;
	let typingQueue = '';
	let currentType = '';
	let finishedTyping: string[] = [];
	let hasTyped = false;
	let mistakeCounter = 0;
	let interval: number;
	let seconds = 0;
	let secondsFreeze = 0;
	let componentToBeTyped: ComponentObject;
	let node: HTMLDivElement;
	let refreshing = false;
	let textOffset = 0;
	let textWidth = 0;

	const startInterval = () => {
		clearInterval(interval);
		interval = setInterval(() => {
			seconds++;
		}, 10);
	};

	const stopInterval = () => {
		clearInterval(interval);
	};

	const makeRandomSelection = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

	const msToSecondStamp = (ms: number) => `${(ms / 100).toFixed(2)}`.replace('.', ':');

	const refreshComponent = async () => {
		secondsFreeze = seconds;
		refreshing = true;
		await new Promise((r) => setTimeout(r, 3000));
		componentToBeTyped = makeRandomSelection(components);
		stopInterval();
		renderComponent();
		seconds = 0;
		mistakeCounter = 0;
		hasTyped = false;
		refreshing = false;
	};

	const renderComponent = () => {
		let fullyTyped = true;

		while (node.firstChild) {
			node.removeChild(node.firstChild);
		}
		const elem = document.createElement(componentToBeTyped.element);

		if (['a', 'button'].includes(componentToBeTyped.element)) {
			elem.innerText = 'click here';
		}

		if (finishedTyping.includes(componentToBeTyped.classes.join(' '))) {
			elem.classList.add(...componentToBeTyped.classes);
		} else {
			fullyTyped = false;
			if (typingQueue.length < 1) typingQueue = componentToBeTyped.classes.join(' ');
			if (typingQueue === componentToBeTyped.classes.join(' ')) {
				elem.classList.add(...currentType.split(' ').filter((c) => c.length > 1));
			}
		}

		node.appendChild(elem);

		if (componentToBeTyped.children) {
			componentToBeTyped.children.forEach((child) => {
				const childElem = document.createElement(child.element);
				if (child.icon) {
					childElem.classList.add('bi', 'bi-' + child.icon);
				}
				if (child.classes) {
					if (finishedTyping.includes(child.classes.join(' '))) {
						childElem.classList.add(...child.classes);
					} else {
						fullyTyped = false;
						if (typingQueue.length < 1) {
							typingQueue = child.classes.join(' ');
						}
						if (typingQueue === child.classes.join(' ')) {
							childElem.classList.add(...currentType.split(' ').filter((c) => c.length > 1));
						}
					}
				}
				if (child.placeholder) {
					childElem.setAttribute('placeholder', child.placeholder);
				}
				if (child.children) {
					child.children.forEach((grandchild) => {
						const grandchildElem = document.createElement(grandchild.element);
						if (grandchild.icon) {
							grandchildElem.classList.add('bi', 'bi-' + grandchild.icon);
						}
						if (grandchild.classes) {
							if (finishedTyping.includes(grandchild.classes.join(' '))) {
								grandchildElem.classList.add(...grandchild.classes);
							} else {
								fullyTyped = false;
								if (typingQueue.length < 1) typingQueue = grandchild.classes.join(' ');
								if (typingQueue === grandchild.classes.join(' ')) {
									grandchildElem.classList.add(
										...currentType.split(' ').filter((c) => c.length > 1)
									);
								}
							}
						}
						childElem.appendChild(grandchildElem);
					});
				}
				elem.appendChild(childElem);
			});
		}

		if (fullyTyped) {
			refreshComponent();
		}
	};

	onMount(async () => {
		// Get component on page load
		componentToBeTyped = makeRandomSelection(components);

		window.addEventListener('keypress', async (e) => {
			if (!hasTyped) {
				startInterval();
				hasTyped = true;
			}
			if (e.key === typingQueue[currentType.length]) {
				if (e.key === ' ') {
					textOffset += (typingQueue.split(' ').at(-1) || []).length * 4;
				}
				currentType = typingQueue.slice(0, currentType.length + 1);
				if (currentType === typingQueue) {
					finishedTyping.push(typingQueue);
					typingQueue = '';
					currentType = '';
				}
			} else {
				mistakeCounter++;
				// change style of element
				typingWindowElem.classList.add('text-red-300');
				await new Promise((r) => setTimeout(r, 100));
				typingWindowElem.classList.remove('text-red-300');
			}
		});
	});

	$: {
		currentType;
		typingQueue;
		if (browser && node) renderComponent();
	}
</script>

<main class="flex h-screen w-screen flex-col items-center justify-center gap-8">
	{#if !refreshing}
		<div bind:this={typingWindowElem} in:scale class="relative transition-all">
			<div style="max-width: min(90vw, 600px)" class="relative w-fit overflow-hidden">
				<div
					class="absolute left-0 top-0 z-20 h-full w-[40px] bg-gradient-to-r from-stone-950 to-transparent"
				/>
				<div
					class="absolute right-0 top-0 z-20 h-full w-[40px] bg-gradient-to-l from-stone-950 to-transparent"
				/>
				<p
					class="whitespace-nowrap px-4 text-2xl transition-all"
					style={`transform: translateX(-${textWidth > 200 ? textWidth - 200 : 0}px`}
				>
					<span class="text-orange-500">{currentType}</span><span
						>{typingQueue.slice(currentType.length)}</span
					>
				</p>

				<p
					class="pointer-events-none fixed left-0 top-0 whitespace-nowrap px-4 text-2xl opacity-0 transition-all"
					style={`transform: translateX(-${textOffset}px)`}
					bind:clientWidth={textWidth}
				>
					{currentType}
				</p>
			</div>
			{#if !hasTyped}
				<span
					transition:scale
					class="bobbing absolute -top-[25px] left-0 flex items-center gap-2 text-sm text-stone-500"
					>Type This <i class="bi bi-arrow-down" /></span
				>
			{/if}
		</div>
	{:else}
		<p in:scale class="text-sm">Nice work! Refreshing Component in 3 seconds...</p>
	{/if}

	<div class="w-screen max-w-[400px]">
		<p class="mb-2 text-sm text-stone-500">Element preview:</p>
		<div
			bind:this={node}
			class="dots grid w-full place-items-center rounded-md border border-stone-800 bg-stone-900 p-4 py-8"
		/>
	</div>

	<p class="text-sm text-stone-500">
		Mistakes: {mistakeCounter} • Time: {msToSecondStamp(refreshing ? secondsFreeze : seconds)}
	</p>
</main>

<style lang="postcss">
	.dots {
		background-image: radial-gradient(theme(colors.stone.300) 1px, transparent 0);
		background-size: 15px 15px;
		background-position: -5px -5px;
	}
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

	.shake-animation {
		animation: shake 0.5s;
	}

	@keyframes shake {
		0% {
			transform: translateX(0);
		}
		25% {
			transform: translateX(-5px);
		}
		50% {
			transform: translateX(5px);
		}
		75% {
			transform: translateX(-5px);
		}
		100% {
			transform: translateX(0);
		}
	}
</style>
