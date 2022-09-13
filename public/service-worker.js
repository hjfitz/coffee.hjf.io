async function cacheResources(resources) {
	const cache = await caches.open('v1')
	await cache.addAll(resources)
}

self.addEventListener('install', (event) => {
	event.waitUntil(
		cacheResources([
			'/',
			'/index.html',

			// styles
			'/style.css',

			// script
			'/dist/main.js',

			// images
			'/aeropress.png',
			'/cold-brew.png',
			'/espresso.png',
			'/french-press.png',
			'/moka-pot.png',
			'/v60.png',
		])
	)
})
