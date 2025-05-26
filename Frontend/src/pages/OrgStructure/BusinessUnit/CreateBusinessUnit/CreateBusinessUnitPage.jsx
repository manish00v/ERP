
import { useContext, useEffect } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
// import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import CreateBusinessUnitForm from "./CreateBusinessUnitForm";

const CreateBusinessUnitPage = () => {
	const { setBtn, setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);

	useEffect(() => {
		setBtn("Create");
		setUrl("/businessUnit");
		setGoBackUrl("/displayBusinessUnit");
	});

	return (
		<>
		<CreateBusinessUnitForm />
			
			
		</>
	);
}

export default CreateBusinessUnitPage;