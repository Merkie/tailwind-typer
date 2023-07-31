<script lang="ts">
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';

	const DEFAULT_CLASS_LIST =
		'rounded-md border border-orange-500 bg-orange-600 p-2 px-8 font-medium uppercase text-orange-50 hover:brightness-110 active:brightness-90';

	let classList = DEFAULT_CLASS_LIST;
	let currentTypedClass = '';
	let elementClasses = '';
	let errors = 0;
	let hasTyped = false;

	let interval: number;
	let seconds = 0;

	const startInterval = () => {
		clearInterval(interval);
		interval = setInterval(() => {
			seconds++;
			console.log(seconds);
		}, 10);
	};

	onMount(() => {
		window.addEventListener('keypress', (e) => {
			if (!hasTyped) {
				hasTyped = true;
				startInterval();
			}
			if (e.key === ' ') {
				if (currentTypedClass === classList.split(' ')[0]) {
					elementClasses += currentTypedClass + ' ';
					currentTypedClass = '';
					classList = classList.substring(classList.split(' ')[0].length + 1, classList.length);
				} else {
					errors++;
				}
			} else if (e.key === classList[currentTypedClass.length]) {
				currentTypedClass += e.key;
			} else {
				errors++;
			}
		});
	});

	const msToSecondStamp = (ms: number) => `${(ms / 100).toFixed(2)}`.replace('.', ':');

	$: {
		if (classList.length === 0) {
			classList = DEFAULT_CLASS_LIST;
			currentTypedClass = '';
			elementClasses = '';
			errors = 0;
			seconds = 0;
			hasTyped = false;
		}
	}
</script>

<main class="flex h-screen w-screen flex-col items-center justify-center gap-8 text-stone-200">
	<div class="relative">
		<div class="w-screen max-w-[400px] overflow-hidden">
			<p class="whitespace-nowrap">
				<span class="font-bold text-stone-50"
					>{currentTypedClass}<span class="font-normal text-stone-300 opacity-50"
						>{classList.substring(currentTypedClass.length, classList.length)}</span
					></span
				>
			</p>
		</div>

		{#if !hasTyped}
			<span
				transition:scale
				class="bobbing absolute -top-[25px] left-0 flex items-center gap-2 text-sm text-stone-500"
				>Type This <i class="bi bi-arrow-down" /></span
			>
		{/if}
		<p />
	</div>

	<div
		class="dots grid w-screen max-w-[400px] place-items-center rounded-md border border-stone-800 bg-stone-900 p-4 py-8"
	>
		<button class={elementClasses + 'transition-all'}>{hasTyped ? 'example button' : ''}</button>
	</div>

	<p class="w-screen max-w-[400px] text-left text-sm text-stone-500">
		Mistakes: {errors}
		Time: {msToSecondStamp(seconds)}
	</p>
</main>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.stone.950);
	}
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
</style>
