<main class="mx-auto flex h-screen w-screen max-w-[600px] flex-col">
	<p class="mb-4 mt-16 text-2xl text-stone-200">Components:</p>
	<div class="flex w-full flex-wrap justify-evenly gap-4">
		<button
			class="rounded-md border border-orange-500 bg-orange-600 p-2 px-8 font-medium uppercase text-orange-50 hover:brightness-110 active:brightness-90"
		>
			click me
		</button>

		<button
			class="rounded-full border border-purple-500 bg-purple-600 p-2 px-16 font-medium uppercase text-purple-50 hover:brightness-110 active:brightness-90"
		>
			click me
		</button>

		<button
			class="rounded-md border border-stone-100 p-4 px-12 text-xl font-medium uppercase text-stone-50 hover:bg-stone-100 hover:text-stone-500 hover:brightness-110 active:brightness-90"
		>
			click me
		</button>

		<div
			class="grid h-[60px] w-[60px] place-items-center rounded-full bg-stone-700 text-2xl text-stone-200"
		>
			<i class="bi bi-person-fill" />
		</div>

		<div
			class="flex rounded-md border border-orange-300 bg-orange-50 text-orange-600 ring-orange-500 focus-within:ring-2"
		>
			<div
				class="grid place-items-center rounded-l-md border-r border-orange-300 bg-orange-100 p-2 px-4 text-orange-500"
			>
				<i class="bi bi-envelope-fill" />
			</div>
			<input
				placeholder="Email"
				type="text"
				class="min-w-[250px] bg-transparent p-2 outline-none"
			/>
		</div>

		<a href="#" class="text-orange-500 underline hover:brightness-110"
			>My portfolio <i class="bi bi-arrow-right-short" /></a
		>
	</div>
</main>
