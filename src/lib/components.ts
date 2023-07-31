// Define the type for a single child element
export type ChildElement = {
	element: string;
	icon?: string;
	classes?: string[];
	children?: ChildElement[];
	placeholder?: string;
};

// Define the type for a single component object
export type ComponentObject = {
	element: string;
	classes: string[];
	children?: ChildElement[];
};

export const components: ComponentObject[] = [
	{
		element: 'button',
		classes: [
			'rounded-md',
			'border',
			'border-orange-500',
			'bg-orange-600',
			'p-2',
			'px-8',
			'font-medium',
			'uppercase',
			'text-orange-50',
			'hover:brightness-110',
			'active:brightness-90'
		]
	},
	{
		element: 'button',
		classes: [
			'rounded-full',
			'border',
			'border-purple-500',
			'bg-purple-600',
			'p-2',
			'px-16',
			'font-medium',
			'uppercase',
			'text-purple-50',
			'hover:brightness-110',
			'active:brightness-90'
		]
	},
	{
		element: 'button',
		classes: [
			'rounded-md',
			'border',
			'border-stone-100',
			'p-4',
			'px-12',
			'text-xl',
			'font-medium',
			'uppercase',
			'text-stone-50',
			'hover:bg-stone-100',
			'hover:text-stone-500',
			'hover:brightness-110',
			'active:brightness-90'
		]
	},
	{
		element: 'div',
		classes: [
			'grid',
			'h-[60px]',
			'w-[60px]',
			'place-items-center',
			'rounded-full',
			'bg-stone-700',
			'text-2xl',
			'text-stone-200'
		],
		children: [
			{
				element: 'i',
				icon: 'person-fill'
			}
		]
	},
	{
		element: 'div',
		classes: [
			'flex',
			'rounded-md',
			'border',
			'border-orange-300',
			'bg-orange-50',
			'text-orange-600',
			'ring-orange-500',
			'focus-within:ring-2'
		],
		children: [
			{
				element: 'div',
				classes: [
					'rounded-l-md',
					'border-r',
					'border-orange-300',
					'bg-orange-100',
					'p-2',
					'px-4',
					'text-orange-500'
				],
				children: [
					{
						element: 'i',
						icon: 'envelope-fill'
					}
				]
			},
			{
				element: 'input',
				placeholder: 'Email',
				classes: ['min-w-[250px]', 'bg-transparent', 'p-2', 'outline-none']
			}
		]
	},
	{
		element: 'a',
		classes: ['text-orange-500', 'underline', 'hover:brightness-110'],
		children: [
			{
				element: 'i',
				icon: 'arrow-right-short'
			}
		]
	}
];
