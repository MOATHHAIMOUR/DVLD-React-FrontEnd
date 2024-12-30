import { useState } from "react";
import { IFilter, IQuery } from "../../../../interfaces";
import { useFetchLocalDrivingApplicationsViewQuery } from "../Store/LocalDrivingLicenseApplicationApiSlice";
import { BuildQuery } from "../../../../utils";
import { ILocalDrivingApplication } from "../interfaces";
import { TSort } from "../../../../types";
import Row from "../../../../components/ui/Row";
import FilterLocalDrivingLicense from "./FilterLocalDrivingLicense";
import LocalDrivingLicenseViewList from "./LocalDrivingLicenseViewList";
import Pagination from "../../../../components/ui/Pagination";
import Box from "../../../../components/ui/Box";
import Modal from "../../../../components/ui/Modal";
import ConfirmCancelLocalDrivingApplication from "./ConfirmCancelLocalDrivingApplication";

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

const ManageLocalDrivingLicenseApplication = () => {
  /* ────────────── STATE & REF  ────────────── */
  const [filters, setFilters] = useState<IQuery>(defaultFilterValue);

  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);

  const [selectedLocalApplication, setSelectedLocalApplication] =
    useState<ILocalDrivingApplication>();

  /* ────────────── REDUX API  ────────────── */
  const { data: response } = useFetchLocalDrivingApplicationsViewQuery(
    BuildQuery(filters)
  );

  /* ────────────── HANDLER  ────────────── */

  function handleCloseModal() {
    setConfirmDeleteModal(false);
  }

  function handleOpenModal(LocalDrivingApplication: ILocalDrivingApplication) {
    setConfirmDeleteModal(true);
    setSelectedLocalApplication(LocalDrivingApplication);
  }

  function onSortChange(SelectedHeader: string, sortType: TSort) {
    setFilters((prevFilters) => ({
      ...prevFilters,
      sortBy: SelectedHeader,
      sort: sortType,
    }));
  }

  function onFilterChange(filter: IFilter) {
    console.log("filter.FilterValue: " + filter.FilterValue);
    if (filter.FilterValue === null) {
      setFilters(defaultFilterValue);
      return;
    }
    setFilters((prevFilters) => ({
      ...prevFilters,
      Filter: { ...filter },
    }));
  }

  function onPageChange(Page: number) {
    setFilters((prevFilters) => ({ ...prevFilters, PageNumber: Page }));
  }

  return (
    <Box className="h-[100%] flex flex-col gap-4 mt-6">
      <Row className="items-center justify-between">
        <FilterLocalDrivingLicense onChangeFilter={onFilterChange} />
      </Row>
      <LocalDrivingLicenseViewList
        LocalLicenseData={response?.data ?? []}
        handleOpenModal={handleOpenModal}
        onSortChange={onSortChange}
      />
      {response?.meta.totalPages && (
        <Pagination
          onPageChange={onPageChange}
          numberOfDisplayPages={5}
          totalPages={response?.meta.totalPages}
        />
      )}

      <Modal
        onClose={handleCloseModal}
        isOpen={confirmDeleteModal}
        title="Confirm Cancellation"
      >
        <ConfirmCancelLocalDrivingApplication
          localDrivingApplication={selectedLocalApplication!}
          CloseModal={handleCloseModal}
        />
      </Modal>
    </Box>
  );
};

export default ManageLocalDrivingLicenseApplication;
