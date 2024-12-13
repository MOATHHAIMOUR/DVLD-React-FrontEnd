import { useNavigate } from "react-router-dom";
import DataGrid from "../../../components/ui/DataGrid";
import {
  testAppointmentContextMenuData,
  testAppointmentHeaderTableData,
} from "../data";
import { TTestAppointmentContextMenu } from "../types";
import { useState } from "react";
import { ITestAppointmentsView } from "../interfaces";
import { EnumTestType } from "../Enums";

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
  const ProcessTestAppointmentsResponse = testAppointmentViewData.map((t) => {
    return {
      ...t,
      isLocked: t.isLocked ? "Yes" : "No",
      testResult:
        t.testResult === null ? "N/A" : t.testResult === true ? "Pass" : "Fail",
    };
  });

  /* ────────────── STATE  ────────────── */
  const navigate = useNavigate();
  const [ContextMenuData, setContextMenuData] = useState(
    testAppointmentContextMenuData
  );

  function HandleContextMenuOpen(obj: object) {
    const data = obj as ITestAppointmentsView;
    if (data.isLocked) {
      setContextMenuData((prev) =>
        prev.map((obj) => ({ ...obj, isDisabled: true }))
      );
    }
  }
  /* ────────────── HANDLERS  ────────────── */
  function onContextMenuClicked(operation: TTestAppointmentContextMenu) {
    switch (operation) {
      case "Take Test":
        navigate(
          `/take-test?local-driving-application-id=${localDrivingApplicationId}&test-type=${testType}`
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
