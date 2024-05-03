type Patient = {
  name: string;
  phone: string;
};

type PatientTableProps = {
  patients: Patient[];
};

function PatientTable({ patients }: PatientTableProps) {
  return (
    <table className="table-auto">
      <thead>
        <tr>
          <th className="px-4 py-2 text-white-600">Patient</th>
          <th className="px-4 py-2 text-white-600">Phone</th>
          <th className="px-4 py-2 text-white-600">Info</th>
          <th className="px-4 py-2 text-white-600">Delete</th>
        </tr>
      </thead>
      <tbody>
        {patients.map((patient: Patient, index: number) => (
          <tr key={index} className={index % 2 === 0 ? '' : 'bg-gray-800'}>
            <td className="border border-white-500 px-4 py-2 text-white-600 font-medium">{patient.name}</td>
            <td className="border border-white-500 px-4 py-2 text-white-600 font-medium">{patient.phone}</td>
            <td className="border border-white-500 px-4 py-2 text-white-600 font-medium">
              <button className="rounded-2xl h-8 bg-blue-700 hover:bg-blue-800" type="button"></button>
            </td>
            <td className="border border-white-500 px-4 py-2 text-white-600 font-medium">
              <button className="rounded-2xl h-8 bg-red-700 hover:bg-red-800" type="button"></button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PatientTable;
