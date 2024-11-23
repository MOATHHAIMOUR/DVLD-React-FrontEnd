import { useNavigate } from "react-router-dom";
import Box from "../../../components/ui/Box";
import DataGrid from "../../../components/ui/DataGrid";
import { TSort } from "../../../types";
import { IUserView } from "../interfaces";
import { userContextMenuItemData, usersTableHeader } from "../data";
import { TUserOperationsContextMenu } from "../types";

interface IProps {
  handleOpenModal: (person: IUserView) => void;
  onSort: (selectedHeader: string, sort: TSort) => void;
  usersData: Array<IUserView>;
}
const UsersList = ({ handleOpenModal, onSort, usersData }: IProps) => {
  /* ────────────── SATE  ────────────── */
  const navigate = useNavigate();

  /* ────────────── HANDLERS  ────────────── */
  function HandleSelectedOperation(
    operation: TUserOperationsContextMenu,
    obj: object
  ) {
    const user = obj as IUserView;

    switch (operation) {
      case "Add User":
        navigate("/add-user");
        break;
      case "Delete User":
        handleOpenModal(user);
        break;
      case "Edit User":
        navigate("/edit-person");
        break;
      case "Show Detail":
        navigate(`/person-details?personId=${user.userId}`);
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
      <DataGrid<TUserOperationsContextMenu>
        tableHeader={usersTableHeader}
        tableBody={usersData}
        contextMenuData={userContextMenuItemData}
        onMenuItemClick={HandleSelectedOperation}
        onSort={(selectedHeaderName, sortType) =>
          HandleSort(selectedHeaderName, sortType)
        }
      />
    </Box>
  );
};

export default UsersList;
