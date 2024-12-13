import Box from "../../../../components/ui/Box";
import DataGrid from "../../../../components/ui/DataGrid";
import { InternationalLicenseHeaderTableData } from "../data";
import { useFetchAllInternationalLicensesQuery } from "../store";

// interface IProps {
//   LocalLicenseData?: Array<IInternationalLicense>;
// }
const InternationalLicenseList = () => {
  const { data: response } = useFetchAllInternationalLicensesQuery();
  return (
    <Box>
      <DataGrid
        tableHeader={InternationalLicenseHeaderTableData}
        tableBody={response?.data ?? []}
      ></DataGrid>
    </Box>
  );
};

export default InternationalLicenseList;
