import ManagePeopleLogo from "../features/People/components/Logo";
import Filter from "../features/People/components/Filter";
import DataGrid from "../features/People/components/DataGrid";

const ManagePeople = () => {
  return (
    <div className="flex flex-col gap-6">
      <ManagePeopleLogo />
      <div>
        <Filter />
      </div>
      <DataGrid />
    </div>
  );
};

export default ManagePeople;
