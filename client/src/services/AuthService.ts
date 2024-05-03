import axios from "axios";

const API_URL = "http://localhost:3000/api/";

class AuthService {
	login({ username, password }: { username: string; password: string }) {
		return axios
			.post(API_URL + "login", {
				username,
				password,
			})
			.then((response) => {
				if (response.data.accessToken) {
					localStorage.setItem("username", JSON.stringify(response.data));
				}
				return response.data;
			})
			.catch((error) => {
				console.error("Login Error:", error);
				throw error; // Rethrow the error to propagate it to the caller
			});
	}

	logout() {
		localStorage.removeItem("username"); // Remove the "user" item instead of "logout"
	}

	register(loginInputData: {
		name: string;
		birthday: string;
		email: string;
		cpf: string;
		phone: string;
		city: string;
		province: string;
		address: string;
		username: string;
		password: string;
	}) {
		const role = "PSYCHOLOGIST";
		return axios
			.post(API_URL + "users", {
				name: loginInputData.name,
				birthdate: loginInputData.birthday,
				cpf: loginInputData.cpf,
				phone: loginInputData.phone,
				city: loginInputData.city,
				province: loginInputData.province,
				address: loginInputData.address,
				role: role,
				emailAddress: loginInputData.email,
				username: loginInputData.username,
				password: loginInputData.password,
			})
			.catch((error) => {
				console.error("Registration Error:", error);
				throw error; // Rethrow the error to propagate it to the caller
			});
	}

	getCurrentUser() {
		const user = localStorage.getItem("username");
		return user ? JSON.parse(user) : null;
	}
}

export default new AuthService();
