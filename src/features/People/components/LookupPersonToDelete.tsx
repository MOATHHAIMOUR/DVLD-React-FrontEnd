import { useState } from "react";
import { IQuery } from "../../../interfaces";
import FindPerson from "./FindPerson";
import PersonDetail from "./PersonDetail";
import Button from "../../../components/ui/Button";
import { useDeletePersonHandler } from "../hooks/useDeletePersonHandler";

const LookupPersonToDelete = () => {
  /* ────────────── STATE  ────────────── */
  const [personId, setSelectedPersonId] = useState<number>(0);
  const { handleDelete, isLoading } = useDeletePersonHandler();

  /* ────────────── RENDER  ────────────── */
  function onFindPerson(query: IQuery) {
    setSelectedPersonId(Number(query.Filter?.FilterValue));
  }

  function HandleDeletePerson() {
    handleDelete(personId);
  }

  return (
    <div className="flex flex-col gap-4">
      <FindPerson
        isLoading={isLoading}
        isDisabled={personId !== 0}
        onFindPerson={onFindPerson}
      />
      <PersonDetail personId={personId} />
      <Button
        className="p-2 w-40 bg-red-700 ml-auto rounded-md text-white"
        onClick={HandleDeletePerson}
      >
        Delete
      </Button>
    </div>
  );
};

export default LookupPersonToDelete;
