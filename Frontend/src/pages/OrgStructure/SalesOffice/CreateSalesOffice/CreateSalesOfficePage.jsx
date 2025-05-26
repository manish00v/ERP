
import { useContext, useEffect } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
// import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import CreateSalesOfficeForm from "./CreateSalesOfficeForm";

const CreateSalesOfficePage = () => {
	const { setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);

	useEffect(() => {
		setUrl("/salesOffice");
		setGoBackUrl("/displaySalesOffice");
	});

	return (
		<>
		<CreateSalesOfficeForm />
			{/* <FormPageHeader /> */}
			
		</>
	);
}

export default CreateSalesOfficePage;