import ManagePeopleLogo from "../features/People/components/Logo";
import Filter from "../features/People/components/Filter";
import PeopleList from "../features/People/components/PeopleList";
import Button from "../components/ui/Button";
import Row from "../components/ui/Row";
import Col from "../components/ui/Col";
import Modal from "../components/ui/Modal";
import { useState } from "react";
import ConfirmDeletePerson from "../features/People/components/ConfirmDeletePerson";
import Pagination from "../components/ui/Pagination";
import { useFetchPeopleQuery } from "../features/People/store/PeopleApiSlice";

const ManagePeople = () => {
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const { totalPages } = useFetchPeopleQuery(
    {},
    {
      selectFromResult: ({ data }) => ({
        totalPages: data?.meta.totalPages || 1,
      }),
    }
  );

  function handleCloseModal() {
    setConfirmDeleteModal(false);
  }
  function handleOpenModal() {
    setConfirmDeleteModal(true);
  }

  return (
    <Col className="gap-6 h-full ">
      <ManagePeopleLogo />
      <Row className="items-center justify-between">
        <Filter />
        <Row className="gap-3">
          <Button className="text-white px-4 bg-slate-700 p-1 rounded-md ">
            Add Person
          </Button>
        </Row>
      </Row>
      <PeopleList handleOpenModal={handleOpenModal} />
      <Pagination numberOfDisplayPages={5} totalPages={totalPages} />
      <Modal
        onClose={handleCloseModal} // Use `onClose` instead of `HandleCloseModal`
        isOpen={confirmDeleteModal}
        title="Confirm Deletion"
      >
        <ConfirmDeletePerson CloseModal={handleCloseModal} />
      </Modal>
    </Col>
  );
};

export default ManagePeople;
