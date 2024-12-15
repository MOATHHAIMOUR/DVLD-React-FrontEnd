export type TTestAppointmentContextMenu =
  | "Take Test"
  | "Edit Test"
  | "Cancel Test";

export type Override<T, R> = Omit<T, keyof R> & R;
