import { json } from '@sveltejs/kit';
import type { WebAppManifest } from 'web-app-manifest';

export const prerender = true;

const manifest: WebAppManifest = {
	theme_color: '#5b927e',
	background_color: '#323a4e',
	display: 'standalone',
	scope: '/',
	start_url: '/',
	id: '/',
	name: 'Home tools',
	short_name: 'Home tools',
	description: 'Tools for organizing our home life :3',
	orientation: 'portrait',
	categories: ['social', 'lifestyle'], // https://github.com/w3c/manifest/wiki/Categories
	shortcuts: [
		// {
		// 	name: 'Groceries',
		// 	url: '/groceries',
		// 	icons: [{ src: '/shortcuts/settings.png', sizes: '192x192' }]
		// }
	],
	icons: [
		{
			src: '/manifest/icon-192x192.png',
			sizes: '192x192',
			type: 'image/png'
		},
		{
			src: '/manifest/icon-256x256.png',
			sizes: '256x256',
			type: 'image/png'
		},
		// {
		// 	src: '/manifest/icon-384x384.png',
		// 	sizes: '384x384',
		// 	type: 'image/png'
		// },
		{
			src: '/manifest/icon-512x512.png',
			sizes: '512x512',
			type: 'image/png'
		}
		// {
		// 	src: '/manifest/icon-maskable.png',
		// 	sizes: '501x501',
		// 	type: 'image/png',
		// 	purpose: 'maskable'
		// }
	]
};

export const GET = async () => {
	return json(manifest, {
		headers: {
			'content-type': 'application/manifest+json'
		}
	});
};
