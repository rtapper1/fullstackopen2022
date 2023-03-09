import { Entry, Diagnosis } from '../../types';

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const assertNever = (value: never): never => {
  throw new Error(`Unidentified entry type! ${value}`);
};

const HospitalView = ({ entry, diagnoses }: Props) => {
  if (entry.type !== 'Hospital') return null;
  return (
    <div>
      <p>{entry.date} - Hospital entry</p>
      <i>{entry.description}</i> <br />
      Diagnose by {entry.specialist} <br />
      Discharged on {entry.discharge.date} with reason{' '}
      {entry.discharge.criteria}
      <br />
      <ul>
        {entry.diagnosisCodes &&
          entry.diagnosisCodes.map((c, i) => (
            <li key={i}>
              {c} {diagnoses.find((d) => d.code === c)?.name}
            </li>
          ))}
      </ul>
    </div>
  );
};

const HealthCheckView = ({ entry, diagnoses }: Props) => {
  if (entry.type !== 'HealthCheck') return null;
  return (
    <div>
      <p>{entry.date} - Hospital entry</p>
      <i>{entry.description}</i> <br />
      Diagnose by {entry.specialist} <br />
      Health risk rating of {entry.healthCheckRating} / 3
      <br />
      <ul>
        {entry.diagnosisCodes &&
          entry.diagnosisCodes.map((c, i) => (
            <li key={i}>
              {c} {diagnoses.find((d) => d.code === c)?.name}
            </li>
          ))}
      </ul>
    </div>
  );
};

const OccupationalHealthcare = ({ entry, diagnoses }: Props) => {
  if (entry.type !== 'OccupationalHealthcare') return null;
  return (
    <div>
      <p>{entry.date} - Hospital entry</p>
      <i>{entry.description}</i> <br />
      Diagnose by {entry.specialist} <br />
      Employer is {entry.employerName} / 3<br />
      {`Sick leave from ${entry.sickLeave?.startDate} to ${entry.sickLeave?.endDate}`}{' '}
      <br />
      <ul>
        {entry.diagnosisCodes &&
          entry.diagnosisCodes.map((c, i) => (
            <li key={i}>
              {c} {diagnoses.find((d) => d.code === c)?.name}
            </li>
          ))}
      </ul>
    </div>
  );
};

const EntryView = ({ entry, diagnoses }: Props) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalView entry={entry} diagnoses={diagnoses} />;
    case 'HealthCheck':
      return <HealthCheckView entry={entry} diagnoses={diagnoses} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcare entry={entry} diagnoses={diagnoses} />;
    default:
      return assertNever(entry);
  }
};

export default EntryView;
