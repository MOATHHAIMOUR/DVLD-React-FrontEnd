import { useFetchPeopleQuery } from "../store/PeopleApiSlice";
import TableSkeletonLoading from "./TableSkeletonLoading";
import TableWithContextMenu from "../../../components/ui/TableWithContextMenu";
import {
  peopleContextMenuItemData,
  PeopleTableHeaderData,
  TPeopleOperation,
} from "../../../data";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../../store";
import { setSelectedPerson } from "../store/PeopleSlice";
import { IPerson } from "../interfaces";
import Col from "../../../components/ui/Col";

interface IProps {
  handleOpenModal: () => void;
}
const PeopleList = ({ handleOpenModal }: IProps) => {
  /* ────────────── STORE  ────────────── */
  const dispatch: AppDispatch = useDispatch();

  const selectedPersonId = useAppSelector((state) => state.PeopleSlice.id);

  const { isLoading, data: response } = useFetchPeopleQuery({});

  /* ────────────── SATE  ────────────── */

  function HandleSelectedRow({
    personId,
    firstName,
    lastName,
    nationalNo,
  }: IPerson) {
    console.log(personId);
    dispatch(
      setSelectedPerson({
        id: personId!,
        name: firstName + lastName,
        NationalNo: nationalNo,
      })
    );
  }

  function HandleSelectedOperation(operation: TPeopleOperation) {
    switch (operation) {
      case "Add Person":
        break;
      case "Delete Person":
        handleOpenModal();
        break;
      case "Edit Person":
        break;
      case "Show Details":
        break;
      default:
        break;
    }
  }

  function handleRightClick(
    e: React.MouseEvent<HTMLDivElement>,
    { personId, firstName, lastName, nationalNo }: IPerson
  ) {
    e.preventDefault();
    if (selectedPersonId === personId) return;
    dispatch(
      setSelectedPerson({
        id: personId!,
        name: firstName + lastName,
        NationalNo: nationalNo,
      })
    );
  }

  /* ────────────── Render  ────────────── */

  const tableRowsRender = response?.data?.map((person) => (
    <tr
      key={person.personId}
      onClick={() => HandleSelectedRow(person)}
      onContextMenu={(e) => handleRightClick(e, person)}
      className={`border-b border-gray-200 ${
        person.personId === selectedPersonId ? "bg-slate-800 text-white" : ""
      }`}
    >
      <th className="px-3 py-1  border border-gray-300 text-center">
        {person.personId}
      </th>
      <th className="px-3 py-1 border border-gray-300 text-center">
        {person.nationalNo}
      </th>
      <th className="px-3 py-1 border border-gray-300 text-center">
        {person.firstName}
      </th>
      <th className="px-3 py-1 border border-gray-300 text-center">
        {person.secondName}
      </th>
      <th className="px-3 py-1 border border-gray-300 text-center">
        {person.thirdName}
      </th>
      <th className=" px-3 py-1 border border-gray-300 text-center">
        {person.lastName}
      </th>
      <th className="px-3 py-1  border border-gray-300 text-center">
        {person.gender}
      </th>
      <th className=" px-3 py-1 border border-gray-300 text-center">
        {person.dateOfBirth}
      </th>
      <th className=" px-3 py-1 border border-gray-300 text-center">
        {person.countryName}
      </th>
      <th className="px-3  py-1 border border-gray-300 text-center">
        {person.phone}
      </th>
      <th className=" px-3 py-1 border border-gray-300 text-center">
        {person.email}
      </th>
    </tr>
  ));

  const renderTBHeader = PeopleTableHeaderData.map((head, i) => (
    <th key={i} className="px-4 text-center w-auto whitespace-nowrap py-3">
      {head}
    </th>
  ));

  if (isLoading) return <TableSkeletonLoading />;
  return (
    <Col>
      <TableWithContextMenu<TPeopleOperation>
        tableHeader={renderTBHeader}
        tableBody={tableRowsRender}
        contextMenuData={peopleContextMenuItemData}
        onItemClick={HandleSelectedOperation}
        SelectedRow={selectedPersonId}
      />
    </Col>
  );
};

export default PeopleList;
