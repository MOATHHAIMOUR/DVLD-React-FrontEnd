import { useCallback, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import ErrorHandler from "../../../components/ui/ErrorHandler";
import Box from "../../../components/ui/Box";
import DataGridSkeleton from "../../../components/ui/DataGridSkeleton";
import { PeopleTableHeaderData } from "../data";

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

const ManagePeople = () => {
  /* ────────────── STATE  ────────────── */
  const [filters, setFilters] = useState<IQuery>(defaultFilterValue);

  const {
    data: response,
    error,
    isLoading,
  } = useFetchPeopleQuery(BuildQuery(filters));

  const navigate = useNavigate();

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

  const onFilterChange = useCallback((filter: IFilter) => {
    setFilters((prevFilters) => {
      return {
        ...prevFilters,
        Filter: { ...filter },
      };
    });
  }, []);

  function onPageChange(Page: number) {
    setFilters((prevFilters) => ({ ...prevFilters, PageNumber: Page }));
  }

  function OnNavigateHandler() {
    navigate("/people/add-person");
  }

  console.log("response?.meta.totalPages : " + response?.meta.totalPages);

  return (
    <Box className="flex-grow-[1] flex flex-col">
      <ErrorHandler error={error} />

      <Row className="items-center justify-between mb-4">
        <FilterPeople onChangeFilter={onFilterChange} />
        <Row className="gap-3">
          <Button
            onClick={OnNavigateHandler}
            className="px-4 bg-primary text-text p-1 rounded-md hover:bg-primaryHover"
          >
            Add Person
          </Button>
        </Row>
      </Row>

      {isLoading ? (
        <DataGridSkeleton
          numberOfRows={5}
          numberOfCols={PeopleTableHeaderData.length}
        />
      ) : (
        <PeopleList
          peopleData={response?.data ?? []}
          handleOpenModal={handleOpenModal}
          onSort={(selectedHeader, sortType) =>
            onSortChange(selectedHeader, sortType)
          }
        />
      )}

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
        <ConfirmDeletePerson
          person={selectedPerson!}
          CloseModal={handleCloseModal}
        />
      </Modal>
    </Box>
  );
};

export default ManagePeople;
