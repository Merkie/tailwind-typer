export const elements = [
	{
		html: `
      <button class="button">
        click me
      </button>
    `,
		classes: {
			button:
				'rounded-md border border-orange-500 bg-orange-600 p-2 px-8 font-medium uppercase text-orange-50 hover:brightness-110 active:brightness-90'
		}
	},
	{
		html: `
      <button class="button">
        click me
      </button>
    `,
		classes: {
			button:
				'rounded-full border border-purple-500 bg-purple-600 p-2 px-16 font-medium uppercase text-purple-50 hover:brightness-110 active:brightness-90'
		}
	},
	{
		html: `
      <button class="button">
        click me
      </button>
    `,
		classes: {
			button: `rounded-md border border-stone-100 p-4 px-12 text-xl font-medium uppercase text-stone-50 hover:bg-stone-100 hover:text-stone-500 hover:brightness-110 active:brightness-90`
		}
	},
	{
		html: `
      <div class="avatar">
        <i class="bi bi-person-fill"></i>
      </div>
    `,
		classes: {
			avatar: `grid h-[60px] w-[60px] place-items-center rounded-full bg-stone-700 text-2xl text-stone-200`
		}
	},
	{
		html: `
      <div class="input container">
        <div class="icon container">
          <i class="bi bi-envelope-fill"></i>
        </div>
        <input
          placeholder="Email"
          type="text"
          class="input"
        >
      </div>
    `,
		classes: {
			'input container':
				'flex rounded-md border border-orange-300 bg-orange-50 text-orange-600 ring-orange-500 focus-within:ring-2',
			'icon container':
				'rounded-l-md border-r border-orange-300 bg-orange-100 p-2 px-4 text-orange-500',
			input: 'min-w-[250px] bg-transparent p-2 outline-none'
		}
	},
	{
		html: `
      <a href="#" class="link">My portfolio <i class="bi bi-arrow-right-short"></i></a>
    `,
		classes: {
			link: 'text-orange-500 underline hover:brightness-110'
		}
	}
];
