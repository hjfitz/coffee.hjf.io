
export interface BrewStyle {
	readonly name: string
	readonly ratioCoffee?: number // assume 1 if not there
	readonly ratioWater: number
	readonly src: string
}


export const brewStyles: BrewStyle[] = [
	{ name: 'Espresso', ratioWater: 2, src: '/espresso.png' },
	{ name: 'V60', ratioWater: 50, ratioCoffee: 3, src: '/v60.png' },
	{ name: 'Aeropress', ratioWater: 6, src: '/aeropress.png', },
	{ name: 'French Press', ratioWater: 12, src: '/french-press.png' },
	{ name: 'Moka Pot', ratioWater: 10, src: '/moka-pot.png' },
	{ name: 'Cold Brew', ratioWater: 40, ratioCoffee: 9, src: '/cold-brew.png', },
] 

export function getHumanReadableRatio(style: BrewStyle): string {
	const ratioCoffee = style.ratioCoffee || 1 
	return `${ratioCoffee}:${style.ratioWater}`
}

export function getRatioForCalculation(style: BrewStyle): number {
	const ratioCoffee = style.ratioCoffee || 1 
	return ratioCoffee / style.ratioWater
}
// <a href="https://www.flaticon.com/free-icons/ice" title="ice icons">Ice icons created by photo3idea_studio - Flaticon</a>
