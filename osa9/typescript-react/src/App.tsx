const Header = ({ header }: { header: string }) => <h1>{header}</h1>;

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescr extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescr {
  kind: 'basic';
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: 'group';
}

interface CoursePartBackround extends CoursePartDescr {
  backroundMaterial: string;
  kind: 'background';
}

interface CoursePartSpecial extends CoursePartDescr {
  requirements: string[];
  kind: 'special';
}

type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackround
  | CoursePartSpecial;

const assertNever = (value: never): never => {
  throw new Error(`Unknown Course Part kind: ${value}`);
};

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case 'basic':
      return (
        <div>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <br />
          <i>{part.description}</i>
        </div>
      );
      break;
    case 'group':
      return (
        <div>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>{' '}
          <br /> project exercises {part.groupProjectCount}
        </div>
      );
      break;
    case 'background':
      return (
        <div>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <br />
          <i>{part.description}</i>
          <br />
          background material: {part.backroundMaterial}
        </div>
      );
      break;
    case 'special':
      return (
        <div>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <br />
          <i>{part.description}</i>
          <br />
          required skills: {part.requirements.join(', ')}
        </div>
      );
    default:
      assertNever(part);
      return null;
  }
};

const Content = ({ parts }: { parts: CoursePart[] }) => (
  <div>
    {parts.map((p, i) => (
      <p key={i}>
        <Part part={p} />
      </p>
    ))}
  </div>
);

const Total = ({ parts }: { parts: CoursePart[] }) => (
  <p>
    Number of exercises{' '}
    {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
);

const App = () => {
  const courseName = 'Half Stack application development';
  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is an awesome course part',
      kind: 'basic',
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: 'group',
    },
    {
      name: 'Basics of type Narrowing',
      exerciseCount: 7,
      description: 'How to go from unknown to string',
      kind: 'basic',
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      backroundMaterial:
        'https://type-level-typescript.com/template-literal-types',
      kind: 'background',
    },
    {
      name: 'TypeScript in frontend',
      exerciseCount: 10,
      description: 'a hard part',
      kind: 'basic',
    },
    {
      name: 'Backend development',
      exerciseCount: 21,
      description: 'Typing the backend',
      requirements: ['nodejs', 'jest'],
      kind: 'special',
    },
  ];

  return (
    <div>
      <Header header={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;
