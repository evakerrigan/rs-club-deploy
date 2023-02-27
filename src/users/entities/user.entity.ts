export class Preference {
  value: string;
  category: string;
  isActive: boolean;
}
export class User {
  githubName: string;
  telegramLink: string;
  gender: 'male' | 'female';
  profilePicture?: string;
  address?: string;
  location?: [number, number];
  role: 'admin' | 'user';
  signupDate: Date;
  lastActivity: Date;
  status: 'active' | 'inactive';
  preferences: string[];
  technology: string[];
  courses: string[];
  _id: string;
}
