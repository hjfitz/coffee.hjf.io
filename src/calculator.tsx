/* @jsx h */
import {h} from 'preact'
import {useState, useEffect} from 'preact/hooks'
import {BrewStyle} from './coffee'
import {Timer} from './timer'

type CalculatorProps = BrewStyle


export const Calculator = ({defaultWater = 250, ratioWater, ratioCoffee = 1, name, src}: CalculatorProps) => {
	const calculateCoffee = (water: number) => ((ratioCoffee / ratioWater) * water).toFixed(0)
	const calculateWater = (coffee: number) => ((ratioWater / ratioCoffee) / coffee).toFixed(0)

	const [coffeeVal, setCoffeeVal] = useState<string | number>(calculateCoffee(defaultWater))
	const [waterVal, setWaterVal] = useState<string | number>(defaultWater)

	useEffect(() => {
		setWaterVal(defaultWater)
		setCoffeeVal(calculateCoffee(defaultWater))
	}, [ratioWater, ratioCoffee])


	const onWaterChange = (ev: KeyboardEvent) => {
		if (!ev.target) return
		const tgt = ev.target as HTMLInputElement
		const newWaterVal = parseInt(tgt.value, 10)
		const newCoffeeVal = calculateCoffee(newWaterVal)

		setWaterVal(newWaterVal)
		setCoffeeVal(newCoffeeVal)
	}


	const onCoffeeChange = (ev: KeyboardEvent) => {
		if (!ev.target) return
		const tgt = ev.target as HTMLInputElement
		const newCoffeeVal = parseInt(tgt.value, 10)
		const newWaterVal = calculateWater(newCoffeeVal)

		setWaterVal(newWaterVal)
		setCoffeeVal(newCoffeeVal)
	}

	return (
		<div className="flex flex-col h-full">
			<header className="flex flex-col items-center mt-4">
				<h2 className="text-4xl text-white ">{name} - {ratioCoffee}:{ratioWater}</h2>
				<div>
					<img className="invert h-36 w-auto m-8" src={src} />
				</div>
			</header>
			<div class="flex-1 flex flex-col sm:flex-row justify-evenly bg-gray-100 rounded-t-lg pt-8 pb-4 px-8 border border-gray-100">
				<section class="flex flex-col items-center justify-evenly ">
					<div class="w-64 pb-8">
						<label class="block text-zinc-400 text-sm">Coffee (g):</label>
						<input class="drop-shadow-md rounded px-2 py-1 border-slate-600 w-full" type="number" value={coffeeVal}  onKeyUp={onCoffeeChange} />
					</div>
					<div class="w-64">
						<label class="block text-zinc-400 text-sm">Water (g):</label>
						<input class="drop-shadow-md rounded px-2 py-1 border-slate-600 w-full" type="number" value={waterVal} onKeyUp={onWaterChange} />
					</div>
				</section>
				<section class="pt-8 sm:pt-0">
					<Timer />
				</section>
			</div>
		</div>
	)
}

