import { useState } from "react";
import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";
import Pagination from "../../../components/ui/Pagination";
import Row from "../../../components/ui/Row";
import { BuildQuery } from "../../../utils";
import { IFilter, IQuery } from "../../../interfaces";
import { TSort } from "../../../types";
import { IUserView } from "../interfaces";
import UsersList from "./UsersList";
import { useFetchUsersQuery } from "../store/UserApiSlice";
import FilterUsers from "./FilterUsers";
import ConfirmDeleteUser from "./ConfirmDeleteUser";

const defaultFilterValue: IQuery = {
  AdvanceFilters: [],
  Filter: {
    FilterBy: "",
    FilterValue: "",
  },
  PageNumber: 1,
  PageSize: 10,
  sort: "NONE",
  sortBy: "",
};

const ManageUsers = () => {
  /* ────────────── STATE  ────────────── */
  const [filters, setFilters] = useState<IQuery>(defaultFilterValue);

  const { data: response } = useFetchUsersQuery(BuildQuery(filters));

  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);

  const [selectedUser, setSelectedUser] = useState<IUserView>();

  /* ────────────── HANDLER  ────────────── */

  function handleCloseModal() {
    setConfirmDeleteModal(false);
  }

  function handleOpenModal(user: IUserView) {
    console.log("here");
    setConfirmDeleteModal(true);
    setSelectedUser(user);
  }

  function onSortChange(SelectedHeader: string, sortType: TSort) {
    setFilters((prevFilters) => ({
      ...prevFilters,
      sortBy: SelectedHeader,
      sort: sortType,
    }));
  }

  function onFilterChange(filter: IFilter) {
    setFilters((prevFilters) => ({ ...prevFilters, Filter: filter }));
  }

  function onPageChange(Page: number) {
    setFilters((prevFilters) => ({ ...prevFilters, PageNumber: Page }));
  }

  return (
    <>
      <Row className="items-center justify-between mb-4">
        <FilterUsers onChangeFilter={onFilterChange} />
        <Row className="gap-3">
          <Button className="text-white px-4 bg-[#1A1F24] p-1 rounded-md ">
            Add Person
          </Button>
        </Row>
      </Row>
      <UsersList
        usersData={response?.data ?? []}
        handleOpenModal={handleOpenModal}
        onSort={(selectedHeader, sortType) =>
          onSortChange(selectedHeader, sortType)
        }
      />
      {response?.meta.totalPages && (
        <Pagination
          onPageChange={onPageChange}
          numberOfDisplayPages={5}
          totalPages={response?.meta.totalPages ?? 0}
        />
      )}

      <Modal
        onClose={handleCloseModal}
        isOpen={confirmDeleteModal}
        title="Confirm Deletion"
      >
        <ConfirmDeleteUser user={selectedUser!} CloseModal={handleCloseModal} />
      </Modal>
    </>
  );
};

export default ManageUsers;
