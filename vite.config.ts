import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	test: {
		expect: { requireAssertions: true },
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					name: 'client',
					environment: 'browser',
					browser: {
						enabled: true,
						provider: 'playwright',
						instances: [{ browser: 'chromium' }]
					},
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**'],
					setupFiles: ['./vitest-setup-client.ts']
				}
			},
			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			}
		]
	},
	resolve: {
		alias: {
			$board: path.resolve(__dirname, 'src/domains/board'),
			$team: path.resolve(__dirname, 'src/domains/team'),
			$authentication: path.resolve(__dirname, 'src/domains/authentication'),
			$home: path.resolve(__dirname, 'src/domains/home'),
			$business: path.resolve(__dirname, 'src/domains/business'),
			$minigames: path.resolve(__dirname, 'src/domains/minigames'),
			$tetris: path.resolve(__dirname, 'src/domains/tetris'),
		},
	},
});
