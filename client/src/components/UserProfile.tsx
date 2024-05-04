import { useEffect, useState } from "react";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import PatientProfile, { Patient, Patients } from "./PatientProfile";
import PatientService from "../services/PatientService";

function UserProfile() {
	const [userReady, setUserReady] = useState(false);
	const [currentUser, setCurrentUser] = useState([]);
	const [patients, setPatients] = useState<Patients>([]);

	// const patients: Patients = [
	// 	{
	// 		"patientId": "25bac318-9fc2-43c6-aa3f-d02aeabd65ee",
	// 		"psychologistId": "c9bfe8a8-5a44-4ce2-ba38-332dab616446",
	// 		"name": {
	// 			"value": "Mary Jane"
	// 		},
	// 		"birthdate": {
	// 			"value": "1994-10-01"
	// 		},
	// 		"cpf": {
	// 			"value": "05987559936"
	// 		},
	// 		"phone": "5548988444975",
	// 		"emergencyPhone": "48998753364",
	// 		"city": "Indaial",
	// 		"province": "Santa Catarina",
	// 		"emailAddress": {
	// 			"value": "maryjane@mail.com"
	// 		},
	// 		"address": "Rua das Gaivotas, 1274"
	// 	},
	// 	{
	// 		"patientId": "eff11a95-45c1-490f-b634-848a160d01ca",
	// 		"psychologistId": "c9bfe8a8-5a44-4ce2-ba38-332dab616446",
	// 		"name": {
	// 			"value": "John Doe"
	// 		},
	// 		"birthdate": {
	// 			"value": "1994-10-01"
	// 		},
	// 		"cpf": {
	// 			"value": "45672354017"
	// 		},
	// 		"phone": "5548988444975",
	// 		"emergencyPhone": "48998753364",
	// 		"city": "Indaial",
	// 		"province": "Santa Catarina",
	// 		"emailAddress": {
	// 			"value": "johndoe@mail.com"
	// 		},
	// 		"address": "Rua das Gaivotas, 1274"
	// 	}
	// ]

	const navigate = useNavigate();

	useEffect(() => {
		const fetchUserProfileData = async () => {
			try {
				const currentUser = AuthService.getCurrentUser();
				if (!currentUser) {
					setUserReady(false);
					navigate("/login");
				} else {
					setCurrentUser(currentUser);
					setUserReady(true);

					const response = await UserService.getUserProfile(
						currentUser.userId,
					);
					const patientResponseData = await PatientService.getAllPatients(
						currentUser.userId
					);

					if (response && response.data) {
						const data = response.data;
						console.log(data);

						setCurrentUser((prevUser) => ({
							...prevUser,
							...data,
						}));

						if (patientResponseData && patientResponseData.data) {
							const patientData = patientResponseData.data;
							console.log(patientData);

							setPatients(patientData);
						}
					} else {
						console.error("No user profile data found");
						navigate("/login");
					}
				}
			} catch (error) {
				console.error("Error fetching user profile data:", error);
				navigate("/login");
			}
		};

		fetchUserProfileData();
	}, [navigate]);

	function handleDeletePatient(cpf: string) {
    const userData = JSON.parse(localStorage.getItem("username") ?? "null");

    if (userData) {
      // Delete patient by CPF
      PatientService.deletePatientById(userData.userId, cpf)
        .then(() => {
          // Update patients state after successful deletion
          setPatients(patients.filter((patient) => patient.cpf.value !== cpf));
        })
        .catch((error) => {
          console.error("Error deleting patient:", error);
        });
    } else {
      console.error("User data not found in localStorage");
    }
  }

	function handleLogOut() {
		AuthService.logout();
		navigate("/login");
	}

	function handleDeleteAccount() {
		const userData = JSON.parse(localStorage.getItem("username"));

		if (userData) {
			UserService.deleteUserProfile(userData.userId);
			localStorage.removeItem("user");
			navigate("/login");
		} else {
			console.error("User data not found in localStorage");
		}
	}

	function handleNewClient()  {
		navigate("/patient-register");
	}

	return (
		<div className="flex justify-center items-center h-screen">
			<div className="bg-neutral-600 p-10 rounded-md">
				<h1 className="mb-4">Welcome <b>{currentUser.username}</b></h1>
				<div className="justify-end">
					<p>You've successfully logged in!</p>
					{/* <br /> */}
					<p>Your email is: {currentUser.email_address}</p>
					{/* <p>You're with us since: {currentUser.signup_date}</p> */}
				</div>
				<div className="rounded-t-xl mt-4 overflow-hidden bg-gradient-to-r">
				<PatientProfile patients={patients} onDeletePatient={handleDeletePatient}/>
				</div>
				<div className="flex justify-between">
					<button
						className="mt-6 rounded-md bg-slate-700 hover:bg-slate-800"
						onClick={handleLogOut}
					>
						Logout
					</button>
					<button
						className="mt-6 rounded-md bg-green-700 hover:bg-green-800"
						onClick={handleNewClient}
					>
						Create New Patient
					</button>
					<button
						className="mt-6 rounded-md bg-red-800 hover:bg-red-900"
						onClick={handleDeleteAccount}
					>
						Delete Account
					</button>
				</div>
			</div>
		</div>
	);
}

export default UserProfile;
