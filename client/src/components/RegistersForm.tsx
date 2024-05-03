import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";

export default function RegisterForm() {
	const [formData, setFormData] = useState({
		fullName: "",
		birthday: "",
		role: "",
		cpf: "",
		phone: "",
		city: "",
		province: "",
		address: "",
		emailAddress: "",
		username: "",
		password: "",
	});

	const [invalidAuth, setInvalidAuth] = useState(false);

	const navigate = useNavigate();

	const SignUpClickHandler = async (e: React.FormEvent) => {
		e.preventDefault();
		const registrationData = {
			name: formData.fullName,
			birthday: formData.birthday,
			email: formData.emailAddress,
			cpf: formData.cpf,
			phone: formData.phone,
			city: formData.city,
			province: formData.province,
			address: formData.address,
			username: formData.username,
			password: formData.password,
		};

		try {
			const response = await AuthService.register(registrationData);

			if (response.status === 201) {
				console.log(response);

				navigate("/login");
			} else {
				setInvalidAuth(true);
			}
		} catch (error) {
			setInvalidAuth(true);
		}
	};

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement>,
		field: string,
	) => {
		const value = e.target.value;
		setFormData({ ...formData, [field]: value });
	};

	return (
		<div className="flex justify-center items-center h-screen">
			<div className="bg-neutral-600 p-10 rounded-md">
				<h2 className="mb-4">Register Form</h2>
				<form onSubmit={SignUpClickHandler}>
					<div>
						<input
							name="name-input"
							className={`mb-3 mr-3 p-3 rounded-md border-2 ${
								invalidAuth ? "border-2 border-red-700" : ""
							}`}
							type="text"
							placeholder="Full Name"
							value={formData.fullName}
							onChange={(e) => handleInputChange(e, "fullName")}
						></input>
						<input
							name="birthday-input"
							className={`mb-3 p-3 rounded-md border-2 ${
								invalidAuth ? "border-2 border-red-700" : ""
							}`}
							type="text"
							placeholder="Birthday"
							value={formData.birthday}
							onChange={(e) => handleInputChange(e, "birthday")}
						></input>
					</div>
					<div>
						<input
							name="cpf-input"
							className={`mb-3 mr-3 p-3 rounded-md border-2 ${
								invalidAuth ? "border-2 border-red-700" : ""
							}`}
							type="text"
							placeholder="CPF"
							value={formData.cpf}
							onChange={(e) => handleInputChange(e, "cpf")}
						></input>
						<input
							name="phone-input"
							className={`mb-3 p-3 rounded-md border-2 ${
								invalidAuth ? "border-2 border-red-700" : ""
							}`}
							type="text"
							placeholder="Phone"
							value={formData.phone}
							onChange={(e) => handleInputChange(e, "phone")}
						></input>
					</div>
					<div>
						<input
							name="city-input"
							className={`mb-3 mr-3 p-3 rounded-md border-2 ${
								invalidAuth ? "border-2 border-red-700" : ""
							}`}
							type="text"
							placeholder="City"
							value={formData.city}
							onChange={(e) => handleInputChange(e, "city")}
						></input>
						<input
							name="province-input"
							className={`mb-3 p-3 rounded-md border-2 ${
								invalidAuth ? "border-2 border-red-700" : ""
							}`}
							type="text"
							placeholder="Province"
							value={formData.province}
							onChange={(e) => handleInputChange(e, "province")}
						></input>
					</div>
					<div>
						<input
							name="adress-input"
							className={`mb-3 mr-3 p-3 rounded-md border-2 ${
								invalidAuth ? "border-2 border-red-700" : ""
							}`}
							type="text"
							placeholder="Address"
							value={formData.address}
							onChange={(e) => handleInputChange(e, "address")}
						></input>
					</div>
					<input
						name="email-input"
						className={`mb-12 p-3 rounded-md border-2 ${
							invalidAuth ? "border-2 border-red-700" : ""
						}`}
						type="email"
						placeholder="E-mail"
						value={formData.emailAddress}
						onChange={(e) => handleInputChange(e, "emailAddress")}
					></input>
					{invalidAuth ? (
						<span className="mb-4 ml-4 text-sm text-red-500">
							*Invalid input fields
						</span>
					) : null}
					
					<h2 className="mb-4">Login Data</h2>
					<input
						name="username-input"
						className={`mb-3 mr-3 p-3 rounded-md border-2 ${
							invalidAuth ? "border-2 border-red-700" : ""
						}`}
						type="text"
						placeholder="Username"
						value={formData.username}
						onChange={(e) => handleInputChange(e, "username")}
					></input>
					<input
						name="password-input"
						className={`mb-3 p-3 rounded-md border-2 ${
							invalidAuth ? "border-2 border-red-700" : ""
						}`}
						type="password"
						placeholder="Password"
						value={formData.password}
						onChange={(e) => handleInputChange(e, "password")}
					></input>
					<div className="flex justify-end">
						<a
							href="/login"
							className="pt-2 text-zinc-300 hover:text-zinc-400"
						>
							Login
						</a>
						<button
							className="pt-2 bg-slate-700 hover:bg-slate-800 ml-4 rounded-md focus:border-transparent hover:border-transparent"
							type="submit"
						>
							Sign Up
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
