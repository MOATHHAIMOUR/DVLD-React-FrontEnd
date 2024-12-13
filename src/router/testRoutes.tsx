import { Route } from "react-router-dom";
import ManageTestAppointmentsPage from "../pages/Tests/ManageTestAppointmentsPage";
import TestTypeInfoPage from "../pages/Tests/TestTypeInfoPage";
import TakeTestPage from "../pages/Tests/TakeTestPage";
import ScheduleTestAppointmentPage from "../pages/Tests/ScheduleTestAppointmentPage";

const testRoutes = (
  <>
    <Route
      path="tests/manage-appointment"
      element={<ManageTestAppointmentsPage />}
    />
    <Route
      path="tests/schedule-test"
      element={<ScheduleTestAppointmentPage />}
    />
    <Route path="tests/type-info" element={<TestTypeInfoPage />} />
    <Route path="tests/take" element={<TakeTestPage />} />
  </>
);

export default testRoutes;
