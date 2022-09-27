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

async function handleCache(req) {
	const cachedItem = await caches.match(req)
	if (cachedItem) {
		console.log('performing swr for', req)
		return cachedItem
	}
	console.log('handling ', req)
	const resp = await fetch(req)
	const cache = await caches.open(APP_CACHE_NAME)
	await cache.put(req, resp.clone())
	return resp
}

self.addEventListener('fetch', async (event) => {
	event.respondWith(handleCache(event.request))
})
