/* @jsx h */
import 'preact/debug'

import {h, render} from 'preact'
import {useState} from 'preact/hooks'
import {find, propEq} from 'ramda'

import {BrewStyle, brewStyles, getHumanReadableRatio} from './coffee'
import {useServiceWorker} from './register-service-worker'
import {Calculator} from './calculator'


interface BrewstyleState extends BrewStyle {
	selected?: boolean
}



const findSelected = find(propEq('selected', true))

const App = () => {
	const [styles, setStyles] = useState<BrewstyleState[]>(brewStyles.map((style, idx) => ({...style, selected: idx === 0})))

	useServiceWorker()

	function select(toSelect: BrewstyleState) {
		return function() {
			const newState = brewStyles.map(style => ({...style, selected: style.name === toSelect.name}))
			setStyles(newState)
		}
	}

	// @ts-expect-error ramda has some of the worst types
	const selected = findSelected(styles) as BrewstyleState

	return (
		<main className="h-full flex flex-col justify-between">
			<div className="bg-indigo-900 flex-1">
				<section className="container mx-auto max-w-none w-full md:max-w-2xl pt-8 h-full flex flex-col">
					<header className="text-white text-center text-[3rem] font-semibold">
						<h1>Coffee Ratio Calculator</h1>
					</header>
					
					{selected && (
						<section class="flex-1">
							<Calculator {...selected} />
						</section>
					)}
				</section>
			</div>
			<div className="bg-grey-100 basis-1/3">
				<section className="container mx-auto max-w-2xl flex flex-wrap justify-center pt-4 md:pt-0 bg-gray-100 border border-gray-100 md:justify-between pb-16 items-end min-h-full px-8">
					{styles.map((style) => {
						return (
							<div 
								className="inline drop-shadow-sm hover:drop-shadow-md rounded-lg bg-gradient-to-r from-sky-400 to-sky-300 hover:from-sky-500 hover:to-sky-400 ease-linear transition-all py-2 px-4 m-2 cursor-pointer" 
								onClick={select(style)}
							>
								<div className="flex">
									<p className="inline leading-8 pr-2 text-white">{style.name} <strong>{getHumanReadableRatio(style)}</strong></p>
									<img className="h-8 inline invert" src={style.src} alt={style.name} />
								</div>
							</div>
						)
					})}
				</section>
			</div>
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
