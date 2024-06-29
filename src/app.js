import styles from './app.module.css';
import React, { useState, useEffect, useRef } from 'react';

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const App = () => {
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState(null);
	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState(null);
	const [confirmPassword, setConfirmPassword] = useState('');
	const [confirmPasswordError, setConfirmPasswordError] = useState(null);
	const submitButtonRef = useRef(null);

	const onEmailChange = ({ target }) => {
		setEmail(target.value);

		let error = null;

		if (!emailPattern.test(target.value)) {
			error = 'Неверный email.';
		}
		setEmailError(error);
	};

	const onPasswordChange = ({ target }) => {
		setPassword(target.value);

		let error = null;

		if (target.value.length < 6) {
			error = 'Пароль должен содержать не менее 6 символов.';
		}
		setPasswordError(error);
	};

	const onConfirmPasswordChange = ({ target }) => {
		setConfirmPassword(target.value);

		let error = null;
		if (target.value !== password) {
			error = 'Пароли не совпадают.';
		}
		setConfirmPasswordError(error);
	};

	const onEmailBlur = () => {
		if (email.length < 4) {
			setEmailError('Неверный email, должно быть не меньше 4 символов');
		}
	};

	useEffect(() => {
		if (
			email &&
			!emailError &&
			password &&
			!passwordError &&
			confirmPassword &&
			!confirmPasswordError
		) {
			submitButtonRef.current.focus();
		}
	}, [email, emailError, password, passwordError, confirmPassword, confirmPasswordError]);

	const onSubmit = (event) => {
		event.preventDefault();
		console.log(email, password);
	};

	return (
		<div className={styles.appContainer}>
			<form onSubmit={onSubmit} className={styles.formContainer}>
				<div className={styles.header}>Регистрация</div>
				{emailError && <div className={styles.errorLabel}>{emailError}</div>}
				<input
					name='email'
					type='email'
					value={email}
					placeholder='email'
					onChange={onEmailChange}
					onBlur={onEmailBlur}
					className={styles.inputField}
				/>

				{passwordError && <div className={styles.errorLabel}>{passwordError}</div>}
				<input
					name='password'
					type='password'
					value={password}
					placeholder='пароль'
					onChange={onPasswordChange}
					className={styles.inputField}
				/>

				{confirmPasswordError && (
					<div className={styles.errorLabel}>{confirmPasswordError}</div>
				)}
				<input
					name='confirmPassword'
					type='password'
					value={confirmPassword}
					placeholder='подтверждение пароля'
					onChange={onConfirmPasswordChange}
					className={styles.inputField}
				/>

				<button
					type='submit'
					ref={submitButtonRef}
					disabled={
						emailError !== null || passwordError !== null || confirmPasswordError !== null
					}
					className={styles.submitButton}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
