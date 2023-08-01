import { writable, type Writable } from 'svelte/store';

export const CurrentUserInput = writable('');
export const StringToType = writable('');
export const FinishedStrings: Writable<string[]> = writable([]);
