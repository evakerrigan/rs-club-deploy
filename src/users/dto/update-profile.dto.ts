export class UpdateProfileDto {
  technology: string[];
  courses: string[];
  preferences: string[];
  telegramLink: string;
  gender: 'male' | 'female';
  location: number[];
  address: string;
}
