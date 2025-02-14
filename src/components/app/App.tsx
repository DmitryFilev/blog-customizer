import { Article } from 'src/components/article/Article';
import { ArticleParamsForm } from 'src/components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import styles from './App.module.scss';
import { CSSProperties, useState } from 'react';
export const App = () => {
	/**
	 * состояние стилей страницы
	 */
	const [articleState, setArticleState] = useState(defaultArticleState);
	/**
	 * функция установки стилей страницы. Пробрасывается в компонент формы сайдбара
	 */
	const onChangeState = (params: ArticleStateType): void => {
		setArticleState(params);
	};
	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onChange={onChangeState} />
			<Article />
		</main>
	);
};
