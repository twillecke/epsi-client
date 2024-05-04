import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "http://localhost:3000/api/";

class PatientService {
	getAllPatients(userId: string) {
		return axios.get(API_URL + "users/" + userId + "/patients", { headers: authHeader() });
	}

	deletePatientById(userId: string, cpf: string) {
		return axios.delete(API_URL + "users/" + userId + "/patients/" + cpf, { headers: authHeader() });
	}

	saveNewPatient(userId: string, patient: any) {
		return axios.post(API_URL + "users/" + userId + "/patients", patient, { headers: authHeader() });
	}
}

export default new PatientService();
