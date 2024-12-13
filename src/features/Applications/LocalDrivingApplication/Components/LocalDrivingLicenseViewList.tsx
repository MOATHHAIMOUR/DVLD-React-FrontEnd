import { useNavigate } from "react-router-dom";
import Box from "../../../../components/ui/Box";
import DataGrid from "../../../../components/ui/DataGrid";
import { TSort } from "../../../../types";
import {
  localDrivingApplicationContextMenuData,
  localDrivingApplicationHeaderData,
} from "../data";
import { ILocalDrivingApplication } from "../interfaces";
import { TLocalDrivingContextMenu } from "../types";
import { EnumTestType } from "../../../Tests/Enums";

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
  const navigate = useNavigate();
  /* ────────────── Handlers  ────────────── */

  function HandleOnMenuItemClickHandler(
    operation: TLocalDrivingContextMenu,
    obj: object
  ) {
    const localDrivingApplication: ILocalDrivingApplication =
      obj as ILocalDrivingApplication;
    console.log(
      "operation: " + localDrivingApplication.localDrivingLicenseApplicationId
    );

    switch (operation) {
      case "Show Application Detail":
        handleOpenModal(localDrivingApplication);
        break;
      case "Vision Test":
        navigate(
          `/tests/manage-appointment?test-type=${EnumTestType.VisionTest}&local-driving-application-id=${localDrivingApplication.localDrivingLicenseApplicationId}`
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
        contextMenuData={localDrivingApplicationContextMenuData}
        onMenuItemClick={HandleOnMenuItemClickHandler}
        tableBody={LocalLicenseData}
        onSort={onSort}
      ></DataGrid>
    </Box>
  );
};

export default LocalDrivingLicenseViewList;
