import {
	Route,
	Outlet,
	BrowserRouter,
	Routes,
	Navigate,
} from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegistersForm";
import UserProfile from "./UserProfile";
import PatientRegister from "./PatientRegister";

function App() {
	const isLoggedIn = true;

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Outlet />}>
					<Route
						path="login"
						index
						element={<LoginForm/>}
					/>
					<Route
						path="patient-register"
						index
						element={<PatientRegister/>}
					/>
					<Route path="sign-up" element={<RegisterForm />} />
					{isLoggedIn ? (
						<Route
							path="user-profile"
							element={<UserProfile/>}
						/>
					) : (
						<Route
							path="user-profile"
							element={<Navigate to="/login" />}
						/>
					)}
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
