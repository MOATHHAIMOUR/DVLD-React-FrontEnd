import { useNavigate } from "react-router-dom";
import {
  testAppointmentContextMenuData,
  testAppointmentHeaderTableData,
} from "../data";
import { Override, TTestAppointmentContextMenu } from "../types";
import { useState } from "react";
import { ITestAppointmentsView } from "../interfaces";
import { EnumTestType } from "../Enums";
import DataGrid from "../../../../components/ui/DataGrid";

interface IProps {
  testAppointmentViewData: Array<ITestAppointmentsView>;
  localDrivingApplicationId: string;
  testType: EnumTestType;
}

const TestAppointmentPerLocalIdPerTestTypeList = ({
  testAppointmentViewData,
  localDrivingApplicationId,
  testType,
}: IProps) => {
  //

  //
  type ModifiedTestAppointmentsView = Override<
    ITestAppointmentsView,
    { isLocked: string; testResult: string }
  >;

  const ProcessTestAppointmentsResponse: Array<ModifiedTestAppointmentsView> =
    testAppointmentViewData.map((t) => {
      return {
        ...t,
        isLocked: t.isLocked ? "Yes" : "No",
        testResult:
          t.testResult === null
            ? "N/A"
            : t.testResult === true
            ? "Pass"
            : "Fail",
      };
    });

  /* ────────────── STATE  ────────────── */
  const navigate = useNavigate();
  const [ContextMenuData, setContextMenuData] = useState(
    testAppointmentContextMenuData
  );

  function HandleContextMenuOpen(obj: object) {
    const data = obj as ModifiedTestAppointmentsView;
    console.log("data.isLocked " + data.isLocked);
    setContextMenuData((prev) =>
      prev.map((obj) => ({ ...obj, isDisabled: data.isLocked === "Yes" }))
    );
  }
  /* ────────────── HANDLERS  ────────────── */
  function onContextMenuClicked(operation: TTestAppointmentContextMenu) {
    switch (operation) {
      case "Take Test":
        navigate(
          `/tests/take-test?local-driving-application-id=${localDrivingApplicationId}&test-type=${testType}`
        );
        break;
      case "Cancel Test":
        break;
      case "Edit Test":
        break;
    }
  }

  return (
    <DataGrid
      tableHeader={testAppointmentHeaderTableData}
      tableBody={ProcessTestAppointmentsResponse ?? []}
      contextMenuData={ContextMenuData}
      OnContextMenuOpen={HandleContextMenuOpen}
      onMenuItemClick={onContextMenuClicked}
    />
  );
};

export default TestAppointmentPerLocalIdPerTestTypeList;
