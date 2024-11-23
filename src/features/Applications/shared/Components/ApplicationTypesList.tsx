import Box from "../../../../components/ui/Box";
import DataGrid from "../../../../components/ui/DataGrid";
import { TSort } from "../../../../types";
import {
  ApplicationContextMenuOperations,
  applicationTypesTableHeader,
} from "../data";
import { IApplicationType } from "../interfaces";
import { TApplicationTypeOperationsContextMenu } from "../types";

interface IProps {
  handleOpenModal: (applicationType: IApplicationType) => void;
  onSort: (selectedHeader: string, sort: TSort) => void;
  applicationTypesData: Array<IApplicationType>;
}
const ApplicationTypesList = ({
  handleOpenModal,
  onSort,
  applicationTypesData,
}: IProps) => {
  /* ────────────── SATE  ────────────── */

  /* ────────────── HANDLERS  ────────────── */
  function HandleSelectedOperation(
    operation: TApplicationTypeOperationsContextMenu,
    obj: object
  ) {
    const applicationType = obj as IApplicationType;

    switch (operation) {
      case "Edit Application":
        handleOpenModal(applicationType);
        break;

      default:
        break;
    }
  }

  /* ────────────── HANDLERS  ────────────── */
  function HandleSort(selectedHeader: string, sortType: TSort) {
    if (sortType === "NONE") onSort(selectedHeader, "NONE");
    else {
      onSort(selectedHeader, sortType);
    }
  }

  return (
    <Box className="mx-auto">
      <DataGrid<TApplicationTypeOperationsContextMenu>
        tableHeader={applicationTypesTableHeader}
        tableBody={applicationTypesData}
        contextMenuData={ApplicationContextMenuOperations}
        onMenuItemClick={HandleSelectedOperation}
        onSort={(selectedHeaderName, sortType) =>
          HandleSort(selectedHeaderName, sortType)
        }
      />
    </Box>
  );
};

export default ApplicationTypesList;
