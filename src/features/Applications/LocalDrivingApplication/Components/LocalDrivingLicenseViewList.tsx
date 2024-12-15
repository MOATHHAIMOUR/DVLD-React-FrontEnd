import { useNavigate } from "react-router-dom";
import Box from "../../../../components/ui/Box";
import DataGrid from "../../../../components/ui/DataGrid";
import { TSort } from "../../../../types";
import {
  GetLocalDrivingApplicationContextMenuData,
  localDrivingApplicationHeaderData,
} from "../data";
import { ILocalDrivingApplication } from "../interfaces";
import { TLocalDrivingContextMenu } from "../types";
import { useState } from "react";
import { IGenericContextMenuItem } from "../../../../interfaces";
import {
  ConvertEnumApplicationStatusToString,
  ConvertStringEnumApplicationStatusToEnum,
} from "../Enums";
import { Override } from "../../Tests/types";
import { EnumTestType } from "../../Tests/Enums";

interface IProps {
  LocalLicenseData: Array<ILocalDrivingApplication>;
  handleOpenModal: (localDrivingApplication: ILocalDrivingApplication) => void;
  onSortChange: (SelectedHeader: string, sortType: TSort) => void;
}
const LocalDrivingLicenseViewList = ({
  LocalLicenseData,
  handleOpenModal,
  onSortChange,
}: IProps) => {
  /* ────────────── REF  ────────────── */

  const [contextMenuData, setContextMenuData] = useState<
    IGenericContextMenuItem<TLocalDrivingContextMenu>[]
  >(null!);

  const navigate = useNavigate();

  type ModifiedLocalDrivingApplicationView = Override<
    ILocalDrivingApplication,
    { applicationStatus: string }
  >;

  const ProcessLocalLicenseData: Array<ModifiedLocalDrivingApplicationView> =
    LocalLicenseData.map((l) => {
      return {
        ...l,
        applicationStatus: ConvertEnumApplicationStatusToString(
          l.applicationStatus
        ),
        passedTests: l.passedTests + " / 3",
      };
    });

  /* ────────────── Handlers  ────────────── */

  function HandleOnMenuItemClickHandler(
    operation: TLocalDrivingContextMenu,
    obj: object
  ) {
    const localDrivingApplication: ILocalDrivingApplication =
      obj as ILocalDrivingApplication;

    switch (operation) {
      case "Issue License (First Time)":
        navigate(
          `/local-driving/add-new-local-license/${localDrivingApplication.localDrivingLicenseApplicationId}`
        );
        break;
      case "Show License":
        handleOpenModal(localDrivingApplication);
        break;
      case "Cancel Application":
        handleOpenModal(localDrivingApplication);
        break;
      case "Vision Test":
        navigate(
          `/tests/manage-appointment?test-type=${EnumTestType.VisionTest}&local-driving-application-id=${localDrivingApplication.localDrivingLicenseApplicationId}`
        );
        break;
      case "Written Test":
        navigate(
          `/tests/manage-appointment?test-type=${EnumTestType.WrittenTest}&local-driving-application-id=${localDrivingApplication.localDrivingLicenseApplicationId}`
        );
        break;
      case "Practical Test":
        navigate(
          `/tests/manage-appointment?test-type=${EnumTestType.PracticalTest}&local-driving-application-id=${localDrivingApplication.localDrivingLicenseApplicationId}`
        );
    }
  }

  function onContextMenuOnendHandler(obj: object) {
    const localDrivingApplication: ModifiedLocalDrivingApplicationView =
      obj as ModifiedLocalDrivingApplicationView;

    const numberOfPassedTests =
      +localDrivingApplication.passedTests.split("/")[0];

    switch (numberOfPassedTests) {
      case 0:
        setContextMenuData(
          GetLocalDrivingApplicationContextMenuData(
            0,
            ConvertStringEnumApplicationStatusToEnum(
              localDrivingApplication.applicationStatus
            )
          )
        );
        break;
      case 1:
        setContextMenuData(
          GetLocalDrivingApplicationContextMenuData(
            1,
            ConvertStringEnumApplicationStatusToEnum(
              localDrivingApplication.applicationStatus
            )
          )
        );
        break;
      case 2:
        setContextMenuData(
          GetLocalDrivingApplicationContextMenuData(
            2,
            ConvertStringEnumApplicationStatusToEnum(
              localDrivingApplication.applicationStatus
            )
          )
        );
        break;
      default:
        setContextMenuData(
          GetLocalDrivingApplicationContextMenuData(
            3,
            ConvertStringEnumApplicationStatusToEnum(
              localDrivingApplication.applicationStatus
            )
          )
        );
    }
  }

  function onSort(SelectedHeader: string, sortType: TSort) {
    onSortChange(SelectedHeader, sortType);
  }

  return (
    <Box className="flex-grow-[1]">
      <DataGrid<TLocalDrivingContextMenu>
        tableHeader={localDrivingApplicationHeaderData}
        contextMenuData={contextMenuData}
        onMenuItemClick={HandleOnMenuItemClickHandler}
        OnContextMenuOpen={onContextMenuOnendHandler}
        tableBody={ProcessLocalLicenseData}
        onSort={onSort}
      ></DataGrid>
    </Box>
  );
};

export default LocalDrivingLicenseViewList;
