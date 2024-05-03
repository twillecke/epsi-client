import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "http://localhost:3000/api/";

class PatientService {
	getAllPatients(userId: string) {
		return axios.get(API_URL + "users/" + userId + "/patients", { headers: authHeader() });
	}
}

export default new PatientService();
