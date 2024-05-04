function PatientInfo({ patient, onDeletePatient }:any) {

  function handleDeletePatient() {
    onDeletePatient(patient.cpf.value);
  }

  return (
    <div className="bg-gray-700 mb-4 rounded-lg p-4 shadow-md">
      <h2 className="text-xl font-bold mb-4">{patient.name.value}</h2>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <p className="font-semibold">Birthdate:</p>
          <p className="font-semibold">CPF:</p>
          <p className="font-semibold">Phone:</p>
          <p className="font-semibold">Emergency Phone:</p>
          <p className="font-semibold">City:</p>
          <p className="font-semibold">Province:</p>
          <p className="font-semibold">Email Address:</p>
          <p className="font-semibold">Address:</p>
          <button
						className="mt-6 rounded-md bg-red-800 hover:bg-red-900"
						onClick={handleDeletePatient}
					>
						Delete
					</button>
        </div>
        <div>
          <p>{patient.birthdate.value}</p>
          <p>{patient.cpf.value}</p>
          <p>{patient.phone}</p>
          <p>{patient.emergencyPhone}</p>
          <p>{patient.city}</p>
          <p>{patient.province}</p>
          <p>{patient.emailAddress.value}</p>
          <p>{patient.address}</p>
        </div>
      </div>
    </div>
  );
}

export default PatientInfo;
