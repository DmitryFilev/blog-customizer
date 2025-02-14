import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useState, useRef } from 'react';
import { clsx } from 'clsx';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import {
	OptionType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { useOutsideClickClose } from './hooks/useOutsideClickClose';
type SelectProps = {
	onChange: (params: ArticleStateType) => void;
};
export const ArticleParamsForm = ({ onChange }: SelectProps) => {
	/**
	 * установка стилей страницы
	 */
	const setArticle = (e: FormEvent) => {
		e.preventDefault();
		onChange(sidebarState);
	};
	/**
	 * состояние откытости/закрытости sidebar
	 */
	const [isOpen, setIsOpen] = useState(false);
	/**
	 * state for side bar
	 */
	const [sidebarState, setSidebarState] = useState(defaultArticleState);
	/**
	 * Функция обновляет форму сайдбара и страницу до значений по умолчанию
	 */
	const setDefault = () => {
		setSidebarState(defaultArticleState);
		onChange(defaultArticleState);
	};
	/**
	 * Функция обновляет предварительный пул параметров стиля страницы
	 */
	const setValue = (selected: OptionType, option: string) => {
		const val = { ...sidebarState, [option]: selected };
		setSidebarState(val);
	};
	const rootRef = useRef<HTMLDivElement>(null);
	const onClose = () => {
		setIsOpen(!isOpen);
	};
	/**
	 * Функция закрытия сайдбара кликом по странице
	 */
	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose,
		onChange: setIsOpen,
	});
	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isOpen} onClick={onClose} />
			<aside
				className={clsx({ [styles.container_open]: isOpen }, styles.container)}>
				<form
					className={styles.form}
					onSubmit={(event) => {
						setArticle(event);
					}}>
					<Text as='h2' size={31} weight={800} family={'open-sans'} uppercase>
						задайте параметры
					</Text>
					<Select
						selected={sidebarState.fontFamilyOption}
						onChange={(selected) => {
							setValue(selected, 'fontFamilyOption');
						}}
						options={fontFamilyOptions}
						title='Шрифт'
					/>
					<RadioGroup
						selected={sidebarState.fontSizeOption}
						onChange={(selected) => {
							setValue(selected, 'fontSizeOption');
						}}
						name='sizeFont'
						options={fontSizeOptions}
						title='Размер Шрифта'
					/>
					<Select
						selected={sidebarState.fontColor}
						onChange={(selected) => {
							setValue(selected, 'fontColor');
						}}
						options={fontColors}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={sidebarState.backgroundColor}
						onChange={(selected) => {
							setValue(selected, 'backgroundColor');
						}}
						options={backgroundColors}
						title='Цвет фона'
					/>
					<Select
						selected={sidebarState.contentWidth}
						onChange={(selected) => {
							setValue(selected, 'contentWidth');
						}}
						options={contentWidthArr}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={setDefault}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
