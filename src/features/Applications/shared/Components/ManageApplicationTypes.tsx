import { useState } from "react";
import { IQuery } from "../../../../interfaces";
import { TSort } from "../../../../types";
import { BuildQuery } from "../../../../utils";
import ApplicationTypesList from "./ApplicationTypesList";
import { IApplicationType } from "../interfaces";
import Modal from "../../../../components/ui/Modal";
import EditApplicationType from "./EditApplicationType";
import { useFetchApplicationTypesQuery } from "../store/ApplicationApiSlice";

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

const ManageApplicationTypes = () => {
  /* ────────────── STATE  ────────────── */
  const [filters, setFilters] = useState<IQuery>(defaultFilterValue);

  const [selectedApplicationType, setSelectedApplicationType] =
    useState<IApplicationType>(null!);

  const [isModalEditOpen, setIsModalEditOpen] = useState<boolean>(false);

  const { data: response } = useFetchApplicationTypesQuery(BuildQuery(filters));

  function handleOpenModal(applicationType: IApplicationType) {
    setSelectedApplicationType(applicationType);
    setIsModalEditOpen(true);
  }
  function handleCloseModal() {
    setIsModalEditOpen(false);
  }

  /* ────────────── HANDLER  ────────────── */

  function onSortChange(SelectedHeader: string, sortType: TSort) {
    setFilters((prevFilters) => ({
      ...prevFilters,
      sortBy: SelectedHeader,
      sort: sortType,
    }));
  }

  return (
    <>
      <ApplicationTypesList
        applicationTypesData={response?.data ?? []}
        handleOpenModal={handleOpenModal}
        onSort={(selectedHeader, sortType) =>
          onSortChange(selectedHeader, sortType)
        }
      />

      <Modal
        onClose={handleCloseModal}
        title="Edit Application Type"
        isOpen={isModalEditOpen}
      >
        <EditApplicationType
          handleCloseModal={handleCloseModal}
          ApplicationTypeData={selectedApplicationType}
        />
      </Modal>
    </>
  );
};

export default ManageApplicationTypes;
