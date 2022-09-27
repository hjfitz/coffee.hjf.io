/* @jsx h */
import {h} from 'preact'
import {useState, useEffect} from 'preact/hooks'
import {BrewStyle} from './coffee'
import {Timer} from './timer'

type CalculatorProps = BrewStyle


export const Calculator = ({defaultWater = 250, ratioWater, ratioCoffee = 1, name, src}: CalculatorProps) => {
	const calculateCoffee = (water: number) => ((ratioCoffee / ratioWater) * water).toFixed(0)
	const calculateWater = (coffee: number) => ((ratioWater / ratioCoffee) * coffee).toFixed(0)

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
				<h2 className="text-4xl text-white">{name} - {ratioCoffee}:{ratioWater}</h2>
				<div>
					<img className="m-8 w-auto h-36 invert" src={src} />
				</div>
			</header>
			<div className="flex flex-col flex-1 justify-evenly px-8 pt-8 pb-4 bg-gray-100 rounded-t-lg border border-gray-100 sm:flex-row">
				<section className="flex flex-col justify-evenly items-center">
					<div className="pb-8 w-64">
						<label className="block text-sm text-zinc-400">Coffee (g):</label>
						<input className="py-1 px-2 w-full rounded drop-shadow-md border-slate-600" type="number" value={coffeeVal}  onKeyUp={onCoffeeChange} />
					</div>
					<div className="w-64">
						<label className="block text-sm text-zinc-400">Water (g):</label>
						<input className="py-1 px-2 w-full rounded drop-shadow-md border-slate-600" type="number" value={waterVal} onKeyUp={onWaterChange} />
					</div>
				</section>
				<section className="pt-8 sm:pt-0">
					<Timer />
				</section>
			</div>
		</div>
	)
}
