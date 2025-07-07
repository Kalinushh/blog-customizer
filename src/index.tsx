import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/app/App';
import './styles/index.scss';

const rootEl = document.getElementById('root');
if (rootEl) {
	const root = createRoot(rootEl);
	root.render(
		<StrictMode>
			<App />
		</StrictMode>
	);
}
