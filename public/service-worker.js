const APP_CACHE_NAME = 'v2'

async function cacheResources(resources) {
	const cache = await caches.open(APP_CACHE_NAME)
	await cache.addAll(resources)
}

self.addEventListener('install', (event) => {
	console.log('Installed! Caching...')
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

self.addEventListener('fetch', async (event) => {
	const cachedItem = await caches.match(event.request)
	if (cachedItem) {
		console.log('performing swr for', event.request)
		event.respondWith(cachedItem)
		const networkResponse = await fetch(event.request)
		// stale-while-revalidate
		const cache = await caches.open(APP_CACHE_NAME)
		await cache.put(event.request, networkResponse)
	}
	const resp = await fetch(event.request)
	event.respondWith(resp)
})
