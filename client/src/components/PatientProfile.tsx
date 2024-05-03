import PatientInfo from "./PatientInfo";

export type Patients = Patient[];  

export type Patient = {
  patientId: string;
  psychologistId: string;
  name: {
    value: string;
  };
  birthdate: {
    value: string;
  };
  cpf: {
    value: string;
  };
  phone: string;
  emergencyPhone: string;
  city: string;
  province: string;
  emailAddress: {
    value: string;
  },
  address: string;
};

interface PatientProfileProps {
  patients: Patients;
}

function PatientProfile({patients}: PatientProfileProps ) {
  return (
    <div className="container mx-auto mt-2">
      <h1 className="text-2xl font-bold mb-4">Patient Information</h1>
      {patients.map((patient:any, index: any) => (
        <PatientInfo key={index} patient={patient} />
      ))}
    </div>
  );
}

export default PatientProfile;
