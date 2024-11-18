import { useState } from "react";
import FindPerson from "./FindPerson";
import PersonDetail from "./PersonDetail";
import { IQuery } from "../../../interfaces";

const LookupPersonToDisplayInfo = () => {
  const [personId, setSelectedPersonId] = useState<number>(0);

  function onFindPerson(query: IQuery) {
    setSelectedPersonId(Number(query.Filter?.FilterValue));
  }

  return (
    <div className="flex flex-col gap-8">
      <FindPerson isDisabled={personId !== 0} onFindPerson={onFindPerson} />
      <PersonDetail personId={personId} />
    </div>
  );
};

export default LookupPersonToDisplayInfo;
