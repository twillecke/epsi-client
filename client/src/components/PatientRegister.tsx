import {useState} from "react";
import { useNavigate } from "react-router-dom";
import PatientService from "../services/PatientService";

export default function PatientRegister() {
  const [formData, setFormData] = useState({
    psychologistId: "",
    name: "",
    birthdate: "",
    cpf: "",
    phone: "",
    emergencyPhone: "",
    city: "",
    province: "",
    address: "",
    emailAddress: ""
  });

  const navigate = useNavigate();

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e:any) => {
    const userData = JSON.parse(localStorage.getItem("username") ?? "null");
    if (!userData) {
      console.error("UserId not found");
      return;
    }
    const userId = userData.userId;

    e.preventDefault();
    const formattedBirthdate = new Date(formData.birthdate).toLocaleDateString('en-CA', { timeZone: 'UTC' });
    const updatedFormData = {
      ...formData,
      birthdate: formattedBirthdate,
      psychologistId: userId
    };
    console.log("Sent Form Data", updatedFormData);
    PatientService.saveNewPatient(userId, updatedFormData);
    navigate("/user-profile");
  };

  function handleReturnHome() {
    navigate("/user-profile");
    console.log('Returning to Home Page...');
    
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-neutral-600 p-10 rounded-md">
        <h1 className="mb-4">Patient Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="birthdate" className="block mb-2">Birthdate:</label>
              <input
                type="date"
                id="birthdate"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="cpf" className="block mb-2">CPF:</label>
              <input
                type="text"
                id="cpf"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block mb-2">Phone:</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="emergencyPhone" className="block mb-2">Emergency Phone:</label>
              <input
                type="text"
                id="emergencyPhone"
                name="emergencyPhone"
                value={formData.emergencyPhone}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="city" className="block mb-2">City:</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="province" className="block mb-2">Province:</label>
              <input
                type="text"
                id="province"
                name="province"
                value={formData.province}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block mb-2">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="emailAddress" className="block mb-2">Email Address:</label>
              <input
                type="email"
                id="emailAddress"
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>
          <button type="submit" className="bg-green-800 hover:bg-green-900 text-white px-4 py-2 rounded-md mt-4">Submit</button>
        </form>
					<button
						className="mt-6 rounded-md bg-blue-700 hover:bg-blue-800 "
						onClick={handleReturnHome}
					>
						Return to Home Page
					</button>
      </div>
    </div>
  );
}
