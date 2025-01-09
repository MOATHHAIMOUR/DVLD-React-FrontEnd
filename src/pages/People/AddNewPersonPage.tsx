import { useState } from "react";
import Logo from "../../components/ui/Logo";
import { enumFormMode } from "../../Enums";
import PersonForm from "../../features/People/components/PersonForm";
import { useTranslation } from "react-i18next";

const AddNewPersonPage = () => {
  const [key, setKey] = useState(0);
  const { t } = useTranslation();
  function ResetComponent() {
    setKey((i) => i + 1);
  }

  return (
    <div className="mx-auto  bg-white p-8 rounded flex flex-col gap-10 shadow h-[100%]">
      <Logo
        direction="ROW"
        image="/src/assets/images/addNewPerson.png"
        title={t("AddNewPerson")}
      />
      <PersonForm
        key={key}
        ResetComponent={ResetComponent}
        mode={enumFormMode.Add}
      />
    </div>
  );
};

export default AddNewPersonPage;
