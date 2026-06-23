export type MockUser = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  userStatus: number;
  department: string;
};

const FIRST_NAMES = [
  'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda',
  'William', 'Barbara', 'David', 'Elizabeth', 'Richard', 'Susan', 'Joseph', 'Jessica',
  'Thomas', 'Sarah', 'Charles', 'Karen', 'Christopher', 'Lisa', 'Daniel', 'Nancy',
  'Matthew', 'Betty', 'Anthony', 'Margaret', 'Mark', 'Sandra', 'Donald', 'Ashley',
  'Steven', 'Dorothy', 'Paul', 'Kimberly', 'Andrew', 'Emily', 'Joshua', 'Donna',
  'Kenneth', 'Michelle', 'Kevin', 'Carol', 'Brian', 'Amanda', 'George', 'Melissa',
  'Timothy', 'Deborah', 'Ronald', 'Stephanie', 'Edward', 'Rebecca', 'Jason', 'Sharon',
  'Jeffrey', 'Laura', 'Ryan', 'Cynthia', 'Jacob', 'Kathleen', 'Gary', 'Amy',
  'Nicholas', 'Angela', 'Eric', 'Shirley', 'Jonathan', 'Anna', 'Stephen', 'Brenda',
  'Larry', 'Pamela', 'Justin', 'Emma', 'Scott', 'Nicole', 'Brandon', 'Helen',
];

const LAST_NAMES = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
  'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson',
  'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker',
  'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
  'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell',
  'Carter', 'Roberts', 'Gomez', 'Phillips', 'Evans', 'Turner', 'Diaz', 'Parker',
  'Cruz', 'Edwards', 'Collins', 'Reyes', 'Stewart', 'Morris', 'Morales', 'Murphy',
  'Cook', 'Rogers', 'Gutierrez', 'Ortiz', 'Morgan', 'Cooper', 'Peterson', 'Bailey',
  'Reed', 'Kelly', 'Howard', 'Ramos', 'Kim', 'Cox', 'Ward', 'Richardson', 'Watson',
];

const DEPARTMENTS = [
  'Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Design',
  'Operations', 'Legal', 'Support', 'Product',
];

const DOMAINS = ['gmail.com', 'yahoo.com', 'outlook.com', 'company.io', 'work.dev'];

function pick<T>(arr: T[], index: number): T {
  return arr[index % arr.length];
}

export function generateMockUsers(count = 10_000): MockUser[] {
  const users: MockUser[] = [];

  for (let i = 0; i < count; i++) {
    const firstName = pick(FIRST_NAMES, i * 7 + 3);
    const lastName = pick(LAST_NAMES, i * 13 + 5);
    const domain = pick(DOMAINS, i * 3 + 1);
    const department = pick(DEPARTMENTS, i * 11 + 2);
    const suffix = i > 0 ? String(Math.floor(i / (FIRST_NAMES.length * LAST_NAMES.length)) + 1) : '';

    users.push({
      id: i + 1,
      username: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${suffix || ''}`,
      firstName,
      lastName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@${domain}`,
      phone: `+1-${String(200 + (i % 800)).padStart(3, '0')}-${String(i % 10000).padStart(7, '0')}`,
      userStatus: i % 5 === 0 ? 0 : 1,
      department,
    });
  }

  return users;
}
