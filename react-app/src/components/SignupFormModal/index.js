import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [profilePic, setProfilePic] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {

			let data;

			const newUser = {
        firstName,
				lastName,
				username,
				email,
				profilePic,
				password
      };

			const newUserNo = {
        firstName,
				lastName,
				username,
				email,
				password
      };

			if(profilePic.length === 0) {
				data = await dispatch(signUp(newUserNo))
			} else {
				data = await dispatch(signUp(newUser))
			}

			if (data) {

				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};


	return (
		<div className='signup-modal'>
			<h1>Sign Up</h1>
			<form className='signup-form' onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li className='form-errors' key={idx}>{error}</li>
					))}
				</ul>
				<div>
					<input
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
						placeholder='First Name'
					/>
				</div>
				<div>
					<input
						type="text"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
						placeholder='Last Name'
					/>
				</div>
				<div>
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						placeholder='Email'
					/>
				</div>
				<div>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
						placeholder='Username'
					/>
				</div>
				<div>
					<input
						type="text"
						value={profilePic}
						onChange={(e) => setProfilePic(e.target.value)}
						placeholder='Profile Picture URL (Optional)'
					/>
				</div>
				<div>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						placeholder='Password'
					/>
				</div>
				<div>
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
						placeholder='Confirm Password'
					/>
				</div>
				<button className='signup-modal-button' type="submit">Sign Up</button>
			</form>
		</div>
	);
}

export default SignupFormModal;
