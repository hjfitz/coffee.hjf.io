import { useEffect } from "preact/hooks"

const SERVICE_WORKER_OPTS = {
	scope: '/',
}

function handleFailedWorkerInstall(err?: any) {
	console.error('Unable to register worker')
	if (err) console.error(err)
}

export async function registerServiceWorker() {
	if (!('serviceWorker' in navigator)) {
		console.warn('Service worker API not present. Not registering!')
		return
	}

	const reg = await navigator.serviceWorker.register('/service-worker.js', SERVICE_WORKER_OPTS).catch(handleFailedWorkerInstall)

	if (!reg) {
		handleFailedWorkerInstall()
		return
	}

	if (reg.installing) {
		console.log('Installing worker...')
	} else if (reg.waiting) {
		console.log('Installed worker!')
	} else if (reg.active) {
		console.log('Worker ready to cache')
	}

}

export function useServiceWorker() {
	useEffect(() => {
		void registerServiceWorker()
	}, [])
}
