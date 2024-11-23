import { useNavigate } from "react-router-dom";
import Box from "../../../components/ui/Box";
import DataGrid from "../../../components/ui/DataGrid";
import {
  peopleContextMenuItemData,
  PeopleTableHeaderData,
  TPeopleOperation,
} from "../data";
import { TSort } from "../../../types";
import { IPersonTableData } from "../interfaces";

interface IProps {
  handleOpenModal: (person: IPersonTableData) => void;
  onSort: (selectedHeader: string, sort: TSort) => void;
  peopleData: Array<IPersonTableData>;
}
const PeopleList = ({ handleOpenModal, onSort, peopleData }: IProps) => {
  /* ────────────── SATE  ────────────── */
  const navigate = useNavigate();

  /* ────────────── HANDLERS  ────────────── */
  function HandleSelectedOperation(operation: TPeopleOperation, obj: object) {
    const person = obj as IPersonTableData;
    console.log(person.address);
    switch (operation) {
      case "Add Person":
        navigate("/add-person");
        break;
      case "Delete Person":
        handleOpenModal(person);
        break;
      case "Edit Person":
        navigate("/edit-person");
        break;
      case "Show Details":
        navigate(`/person-details?personId=${person.personId}`);
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
    <Box className="w-full mx-auto">
      <DataGrid<TPeopleOperation>
        tableHeader={PeopleTableHeaderData}
        tableBody={peopleData}
        contextMenuData={peopleContextMenuItemData}
        onMenuItemClick={HandleSelectedOperation}
        onSort={(selectedHeaderName, sortType) =>
          HandleSort(selectedHeaderName, sortType)
        }
      />
    </Box>
  );
};

export default PeopleList;
