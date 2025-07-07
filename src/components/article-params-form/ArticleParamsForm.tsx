import React, { useState, useRef } from 'react';
import clsx from 'clsx';

import { ArrowButton } from '../../ui/arrow-button';
import { Button } from '../../ui/button';
import { Text } from '../../ui/text';
import { Select } from '../../ui/select';
import { RadioGroup } from '../../ui/radio-group';
import { Separator } from '../../ui/separator';
import { useOutsideClickClose } from '../../ui/select/hooks/useOutsideClickClose';

import {
	defaultArticleState,
	ArticleStateType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from '../../constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type Props = {
	onApply: (settings: ArticleStateType) => void;
};

export const ArticleParamsForm: React.FC<Props> = ({ onApply }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [draft, setDraft] = useState<ArticleStateType>(defaultArticleState);
	const panelRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen,
		rootRef: panelRef,
		onChange: setIsOpen,
	});

	const updateField =
		<K extends keyof ArticleStateType>(key: K) =>
		(value: ArticleStateType[K]) =>
			setDraft((prev) => ({ ...prev, [key]: value }));

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(draft);
		setIsOpen(false);
	};

	const handleReset = (e: React.FormEvent) => {
		e.preventDefault();
		setDraft(defaultArticleState);
		onApply(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen((o) => !o)} />

			<aside
				ref={panelRef}
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase align='center'>
						Задайте параметры
					</Text>

					<div className={styles.controlContainer}>
						<Select
							title='Шрифт'
							options={fontFamilyOptions}
							selected={draft.fontFamilyOption}
							onChange={updateField('fontFamilyOption')}
						/>

						<RadioGroup
							title='Размер шрифта'
							name='font-size'
							options={fontSizeOptions}
							selected={draft.fontSizeOption}
							onChange={updateField('fontSizeOption')}
						/>

						<Select
							title='Цвет текста'
							options={fontColors}
							selected={draft.fontColor}
							onChange={updateField('fontColor')}
						/>

						<Separator />

						<Select
							title='Цвет фона'
							options={backgroundColors}
							selected={draft.backgroundColor}
							onChange={updateField('backgroundColor')}
						/>

						<Select
							title='Ширина контента'
							options={contentWidthArr}
							selected={draft.contentWidth}
							onChange={updateField('contentWidth')}
						/>
					</div>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
