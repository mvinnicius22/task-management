/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
    purge: {
		content: ['./public/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
		options: {
			safelist: [
				'text-purple-700',
				'text-teal-700',
				'text-blue-700',
				'text-green-700',
				'bg-purple-100',
				'bg-teal-100',
				'bg-blue-100',
				'bg-green-100',
				'bg-purple-400',
				'bg-teal-400',
				'bg-blue-400',
				'bg-green-400',
			],
		}
	},
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}