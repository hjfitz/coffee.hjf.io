/* @jsx h */
import "preact/debug";

import {h, render} from 'preact'
import {useEffect, useRef, useState} from 'preact/hooks'
import { find, pickBy, propEq } from 'ramda'

import {BrewStyle, brewStyles, getHumanReadableRatio, getRatioForCalculation} from './coffee'

interface BrewstyleState extends BrewStyle {
	selected?: boolean
}


type CalculatorProps = BrewStyle

const Calculator = ({ratioWater, ratioCoffee = 1, name}: CalculatorProps) => {
	const [waterVal, setWaterVal] = useState(ratioWater)
	const [coffeeVal, setCoffeeVal] = useState(ratioCoffee)

	// hack for using props as state
	useEffect(() => {
		setWaterVal(ratioWater)
		setCoffeeVal(ratioCoffee)
	}, [ratioWater, ratioCoffee])

	const onWaterChange = (ev: KeyboardEvent) => {
		if (!ev.target) return
		const tgt = ev.target as HTMLInputElement
		const newWaterVal = parseInt(tgt.value, 10)
		const newCoffeeVal = (ratioCoffee / ratioWater) * newWaterVal

		setWaterVal(newWaterVal)
		setCoffeeVal(newCoffeeVal)
	}


	const onCoffeeChange = (ev: KeyboardEvent) => {
		if (!ev.target) return
		const tgt = ev.target as HTMLInputElement
		const newCoffeeVal = parseInt(tgt.value, 10)
		const newWaterVal = (ratioWater / ratioCoffee) * newCoffeeVal

		setWaterVal(newWaterVal)
		setCoffeeVal(newCoffeeVal)
	}

	return (
		<div>
			<h2>{name}: {ratioCoffee}:{ratioWater}</h2>
			<input type="number" value={coffeeVal}  onKeyUp={onCoffeeChange} />
			<input type="number" value={waterVal} onKeyUp={onWaterChange} />
		</div>
	)
}

const findSelected = find(propEq('selected', true))

const App = () => {
	const [styles, setStyles] = useState<BrewstyleState[]>(brewStyles)

	function select(toSelect: BrewstyleState) {
		return function() {
			const newState = brewStyles.map(style => ({...style, selected: style.name === toSelect.name}))
			setStyles(newState)
		}
	}

	const selected = findSelected(styles) as BrewstyleState

	return (
		<main class="container mx-auto max-w-2xl">
			<header>
				<h1>Coffee Ratio Calculator</h1>
			</header>
			{selected && (
				<section>
					<Calculator {...selected} />
				</section>
			)}
			<section class="flex flex-wrap justify-between">
				{styles.map((style) => {
					return (
						<div 
							class="inline rounded-lg bg-gradient-to-r from-sky-400 to-sky-300 hover:from-sky-500 hover:to-sky-400 ease-linear transition-all py-2 px-4 my-2 cursor-pointer" 
							onClick={select(style)}
						>
							<div class="flex">
								<p class="inline leading-8 pr-2 text-white">{style.name} <strong>{getHumanReadableRatio(style)}</strong></p>
								<img class="h-8 inline invert" src={style.src} alt={style.name} />
							</div>
						</div>
					)
				})}
			</section>
		</main>
	)
}

function main() {
	const rootNode = document.getElementById('main')
	if (!rootNode) {
		document.writeln('Error: Unable to find root node')
		throw new Error('Unable to find root node')
	}

	render(<App />, rootNode)
}

main()
