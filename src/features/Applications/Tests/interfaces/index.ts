import { EnumApplicationStatus } from "../../LocalDrivingApplication/Enums";

export interface ITestLocalDrivingLicenseAppointmentView {
  localDrivingLicenseApplicationId: number;
  className: string;
  applicationId: number;
  applicationStatus: EnumApplicationStatus;
  passedTests: number;
  paidFees: number;
  applicationTypeTitle: string;
  firstName: string;
  lastName: string;
  applicationDate: string;
  lastStatusDate: string;
  username: string;
  personId: string;
}

export interface ITestAppointmentsView {
  testAppointmentId: number;
  appointmentDate: Date;
  paidFees: number;
  isLocked: boolean;
  testResult: boolean;
}

export interface IScheduleTestView {
  localDrivingLicenseApplicationId: number;
  testAppointmentId: number;
  firstName: string;
  lastName: string;
  className: string;
  testTypeFees: number;
  tries: number;
}

export interface IAddScheduleTest {
  testTypeId: number;
  localDrivingLicenseApplicationId: number;
  createdByUserId: number;
}

export interface IAddTestResult {
  testAppointmentId: number;
  testResult: boolean;
  notes: string;
  createdByUserId: number;
}
