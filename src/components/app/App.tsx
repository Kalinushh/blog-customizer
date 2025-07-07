import React, { useState, CSSProperties } from 'react';
import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState } from '../../constants/articleProps';
import styles from './App.module.scss';

export const App: React.FC = () => {
	const [settings, setSettings] = useState(defaultArticleState);

	const cssVars = {
		'--font-family': settings.fontFamilyOption.value,
		'--font-size': settings.fontSizeOption.value,
		'--font-color': settings.fontColor.value,
		'--container-width': settings.contentWidth.value,
		'--bg-color': settings.backgroundColor.value,
	} as CSSProperties;

	return (
		<main className={styles.main} style={cssVars}>
			{}
			<ArticleParamsForm onApply={setSettings} />

			{}
			<Article />
		</main>
	);
};
