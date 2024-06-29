import styles from './app.module.css';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const fieldScheme = yup.object().shape({
	email: yup
		.string()
		.email('неверный email')
		.min(3, 'должно быть больше 3х символов')
		.max(25, 'должно быть меньше 25 символов')
		.required('Email обязателен'),
	password: yup
		.string()
		.min(8, 'Пароль должен быть не менее 8 символов')
		.required('Пароль обязателен'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
		.required('Подтверждение пароля обязательно'),
});

export const App = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
		},
		resolver: yupResolver(fieldScheme),
	});

	const emailError = errors.email?.message;
	const passwordError = errors.password?.message;
	const confirmPasswordError = errors.confirmPassword?.message;

	const onSubmit = (formData) => {
		console.log(formData);
	};

	return (
		<div className={styles.appContainer}>
			<form onSubmit={handleSubmit(onSubmit)}>
				{emailError && <div className={styles.errorLabel}>{emailError}</div>}
				<input
					name='email'
					type='email'
					placeholder='email'
					className={styles.inputField}
					{...register('email')}
				/>
				{passwordError && <div className={styles.errorLabel}>{passwordError}</div>}
				<input
					name='password'
					type='password'
					placeholder='пароль'
					className={styles.inputField}
					{...register('password')}
				/>
				{confirmPasswordError && (
					<div className={styles.errorLabel}>{confirmPasswordError}</div>
				)}
				<input
					name='confirmPassword'
					type='password'
					placeholder='подтверждение пароля'
					className={styles.inputField}
					{...register('confirmPassword')}
				/>
				<button
					type='submit'
					disabled={!!emailError || !!passwordError || !!confirmPasswordError}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
