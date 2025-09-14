import { Experience } from "./experience";
import { PersonalInfo } from "./personal-info";
import { Skill } from "./skill";

export interface CVData {
  personalInfo: PersonalInfo;
  skills: Skill[];
  experiences: Experience[];
}
