import { writable, type Writable } from 'svelte/store';

export const CurrentUserInput = writable('');
export const StringToType = writable('');
export const FinishedStrings: Writable<string[]> = writable([]);

// export const ElapsedTimeFreeze = writable(0);

export const ElapsedTime = writable(0);
let elapsedTime = 0;
ElapsedTime.subscribe((value) => {
	elapsedTime = value;
});

let timerInterval: number | null = null;
let timerState = 'stopped';
let startTime: number | null = null;

function updateTimer() {
	ElapsedTime.set(Date.now() - (startTime || 0));
}

export function startTimer() {
	if (timerState === 'stopped') {
		startTime = Date.now() - elapsedTime;
		timerInterval = window.setInterval(updateTimer, 1);
		timerState = 'running';
	}
}

export function stopTimer() {
	if (timerState === 'running' && timerInterval) {
		clearInterval(timerInterval);
		timerInterval = null;
		timerState = 'stopped';
	}
}

export function clearTimer() {
	stopTimer();
	ElapsedTime.set(0);
}
