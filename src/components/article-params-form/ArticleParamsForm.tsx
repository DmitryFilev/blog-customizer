import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import styles from './ArticleParamsForm.module.scss';
import { useState } from 'react';
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

type SelectProps = {
	onChange: (params: ArticleStateType) => void;
};
export const ArticleParamsForm = ({ onChange }: SelectProps) => {
	/**
	 * установка стилей страницы
	 */
	const setArticle = () => {
		onChange(sideBarState);
	};
	/**
	 * состояние откытости/закрытости side Bar
	 */
	const [isOpenSideBar, setIsOpenSideBar] = useState(false);
	/**
	 * state for side bar
	 */
	const [sideBarState, setSideBarState] = useState(defaultArticleState);
	/**
	 * Функция обновляет форму сайдбара и страницу до значений по умолчанию
	 */
	const setDefault = () => {
		setSideBarState(defaultArticleState);
		onChange(defaultArticleState);
	};
	/**
	 * Функция обновляет предварительный пул параметров стиля страницы
	 */
	const setValue = (selected: OptionType, option: string) => {
		const val = { ...sideBarState, [option]: selected };
		setSideBarState(val);
	};
	return (
		<>
			<ArrowButton
				isOpen={isOpenSideBar}
				onClick={() => {
					setIsOpenSideBar(!isOpenSideBar);
				}}
			/>
			<aside
				className={clsx(
					isOpenSideBar && styles.container_open,
					styles.container
				)}>
				<form className={styles.form}>
					<Select
						selected={sideBarState.fontFamilyOption}
						onChange={(selected) => {
							setValue(selected, 'fontFamilyOption');
						}}
						options={fontFamilyOptions}
						title='Шрифт'
					/>
					<RadioGroup
						selected={sideBarState.fontSizeOption}
						onChange={(selected) => {
							setValue(selected, 'fontSizeOption');
						}}
						name='sizeFont'
						options={fontSizeOptions}
						title='Размер Шрифта'
					/>
					<Select
						selected={sideBarState.fontColor}
						onChange={(selected) => {
							setValue(selected, 'fontColor');
						}}
						options={fontColors}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={sideBarState.backgroundColor}
						onChange={(selected) => {
							setValue(selected, 'backgroundColor');
						}}
						options={backgroundColors}
						title='Цвет фона'
					/>
					<Select
						selected={sideBarState.contentWidth}
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
						<Button
							title='Применить'
							htmlType='button'
							type='apply'
							onClick={setArticle}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
