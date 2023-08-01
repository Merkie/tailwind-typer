<script lang="ts">
	import { browser } from '$app/environment';
	import type { ComponentObject } from '$lib/components';
	import { onMount } from 'svelte';
	import type { Writable } from 'svelte/store';

	export let currentType: Writable<string>;
	export let typingQueue: Writable<string>;
	export let finishedTyping: Writable<string[]>;
	export let componentToBeTyped: ComponentObject;
	export let refreshComponent: () => void;

	let node: HTMLDivElement;

	const renderComponent = () => {
		let fullyTyped = true;

		while (node.firstChild) {
			node.removeChild(node.firstChild);
		}
		const elem = document.createElement(componentToBeTyped.element);

		if (['a', 'button'].includes(componentToBeTyped.element)) {
			elem.innerText = 'click here';
		}

		if ($finishedTyping.includes(componentToBeTyped.classes.join(' '))) {
			elem.classList.add(...componentToBeTyped.classes);
		} else {
			fullyTyped = false;
			if ($typingQueue.length < 1) $typingQueue = componentToBeTyped.classes.join(' ');
			if ($typingQueue === componentToBeTyped.classes.join(' ')) {
				elem.classList.add(...$currentType.split(' ').filter((c) => c.length > 1));
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
					if ($finishedTyping.includes(child.classes.join(' '))) {
						childElem.classList.add(...child.classes);
					} else {
						fullyTyped = false;
						if ($typingQueue.length < 1) {
							$typingQueue = child.classes.join(' ');
						}
						if ($typingQueue === child.classes.join(' ')) {
							childElem.classList.add(...$currentType.split(' ').filter((c) => c.length > 1));
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
							if ($finishedTyping.includes(grandchild.classes.join(' '))) {
								grandchildElem.classList.add(...grandchild.classes);
							} else {
								fullyTyped = false;
								if ($typingQueue.length < 1) $typingQueue = grandchild.classes.join(' ');
								if ($typingQueue === grandchild.classes.join(' ')) {
									grandchildElem.classList.add(
										...$currentType.split(' ').filter((c) => c.length > 1)
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

		if (fullyTyped) refreshComponent();
	};

	$: {
		$currentType;
		$typingQueue;
		componentToBeTyped;
		if (browser && node) renderComponent();
	}
</script>

<div
	bind:this={node}
	class="dots grid w-full place-items-center rounded-md border border-stone-800 bg-stone-900 p-4 py-8"
/>

<style lang="postcss">
	.dots {
		background-image: radial-gradient(theme(colors.stone.800) 1px, transparent 0);
		background-size: 15px 15px;
		background-position: -5px -5px;
	}
</style>
