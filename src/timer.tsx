/* @jsx h */
import {h} from 'preact'
import {useState, useEffect} from 'preact/hooks'

// given some seconds, return mm:ss
function secondsToHuman(seconds: number) {
	const minutes = Math.floor(seconds / 60)
	const secondsLeft = seconds % 60

	const minutesStr = minutes.toString().padStart(2, '0')
	const secondsStr = secondsLeft.toString().padStart(2, '0')

	return `${minutesStr}:${secondsStr}`
}

export const Timer = () => {
	const [seconds, setSeconds] = useState(0);
	const [timing, setTiming] = useState(false);

	const toggleTiming = () => setTiming(cur => !cur)

	const resetTimer = () => {
		setTiming(false)
		setSeconds(0)
	}

	useEffect(() => {
		// typehack because node
		let interval: ReturnType<typeof setInterval> | null = null
		if (timing) {
			interval = setInterval(() => {
				setSeconds(s => s + 1)
			}, 1e3);
		} else {
			if (interval) clearInterval(interval)
		}
		return () => interval && clearInterval(interval)
	}, [timing]);

	return (
		<div class="flex flex-col items-center h-full justify-around">
			<header class="text-5xl text-indigo-700 font-light bg-white px-6 py-3 rounded drop-shadow sm:w-full w-64 text-center">{secondsToHuman(seconds)}</header>
			<div class="flex justify-evenly sm:justify-between w-full text-indigo-700 pt-4 sm:pt-0">
				<button class="bg-white drop-shadow px-6 py-2 rounded hover:bg-indigo-100 transition ease duration-300 mr-4" onClick={toggleTiming}>{timing ? 'Pause' : 'Start'}</button>
				<button class="bg-white drop-shadow px-6 py-2 rounded hover:bg-indigo-100 transition ease duration-300 ml-4" onClick={resetTimer}>Reset</button>
			</div>
		</div>
	)
}
