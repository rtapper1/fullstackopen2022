import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';

import { FullPatient, Diagnosis } from '../../types';

import patientService from '../../services/patients';

import EntryView from './EntryView';
import AddEntry from './AddEntry';

const PatientPage = ({ diagnoses }: { diagnoses: Diagnosis[] }) => {
  const [patient, setPatient] = useState<FullPatient>();
  const [showAddEntry, setShowAddEntry] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    patientService
      .getPatient(id)
      .then((res) => setPatient(res))
      .catch((err: AxiosError) => console.log(err));
  });

  const toggleShowAddEntry = () => {
    setShowAddEntry(!showAddEntry);
  };

  if (patient)
    return (
      <div>
        <h2>
          {patient.name} ({patient.gender})
        </h2>
        ssn: {patient.ssn} <br />
        occupation: {patient.occupation}
        <h2>entries</h2>
        {showAddEntry && (
          <button onClick={toggleShowAddEntry}>add entry</button>
        )}
        {!showAddEntry && <AddEntry toggleShowAdd={toggleShowAddEntry} />}
        {patient.entries.map((e) => (
          <div key={e.id} className="entry">
            <EntryView entry={e} diagnoses={diagnoses} />
          </div>
        ))}
      </div>
    );
  else return null;
};

export default PatientPage;
