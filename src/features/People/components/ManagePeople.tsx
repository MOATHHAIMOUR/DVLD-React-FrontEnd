import { useState } from "react";
import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";
import Pagination from "../../../components/ui/Pagination";
import Row from "../../../components/ui/Row";
import { BuildQuery } from "../../../utils";
import { useFetchPeopleQuery } from "../store/PeopleApiSlice";
import ConfirmDeletePerson from "./ConfirmDeletePerson";
import FilterPeople from "./FilterPeople";
import PeopleList from "./PeopleList";
import { IFilter, IQuery } from "../../../interfaces";
import { TSort } from "../../../types";
import { IPersonTableData } from "../interfaces";

const defaultFilterValue: IQuery = {
  AdvanceFilters: "",
  Filter: {
    FilterBy: "",
    FilterValue: "",
  },
  PageNumber: 1,
  PageSize: 10,
  sort: "NONE",
  sortBy: "",
};

const ManagePeople = () => {
  /* ────────────── STATE  ────────────── */
  const [filters, setFilters] = useState<IQuery>(defaultFilterValue);

  const { data: response } = useFetchPeopleQuery(BuildQuery(filters), {
    skip: false,
  });

  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);

  const [selectedPerson, setSelectedPerson] = useState<IPersonTableData>();

  /* ────────────── HANDLER  ────────────── */

  function handleCloseModal() {
    setConfirmDeleteModal(false);
  }

  function handleOpenModal(person: IPersonTableData) {
    setConfirmDeleteModal(true);
    setSelectedPerson(person);
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
      <Row className="items-center justify-between">
        <FilterPeople onChangeFilter={onFilterChange} />
        <Row className="gap-3">
          <Button className="text-white px-4 bg-slate-700 p-1 rounded-md ">
            Add Person
          </Button>
        </Row>
      </Row>
      <PeopleList
        peopleData={response?.data ?? []}
        handleOpenModal={handleOpenModal}
        onSort={(selectedHeader, sortType) =>
          onSortChange(selectedHeader, sortType)
        }
      />
      <Pagination
        onPageChange={onPageChange}
        numberOfDisplayPages={5}
        totalPages={response?.meta.totalPages ?? 0}
      />
      <Modal
        onClose={handleCloseModal}
        isOpen={confirmDeleteModal}
        title="Confirm Deletion"
      >
        <ConfirmDeletePerson
          person={selectedPerson!}
          CloseModal={handleCloseModal}
        />
      </Modal>
    </>
  );
};

export default ManagePeople;
