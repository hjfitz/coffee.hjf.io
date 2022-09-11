/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
	plugins: [
		'@snowpack/plugin-postcss',
		'@snowpack/plugin-typescript'
	],
	routes: [
		{
			'match': 'routes', 
			'src': '.*', 
			'dest': '/index.html'
		}
	],
	alias: {
		'@': './lib',
		react: 'preact/compat',
		'react-dom': 'preact/compat',
	},
	mount: {
		// misleading in docs: this maps local folder (key) to hosted folder (val)
		src: '/dist',
		public: '/',
	},
}
