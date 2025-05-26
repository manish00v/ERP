
import { useContext, useEffect } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
// import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import CreateBusinessEntityForm from "./CreateBusinessEntityForm";

const CreateBusinessEntityPage = () => {
	const { setBtn, setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);

	useEffect(() => {
		setBtn("Create");
		setUrl("/BusinessEntity");
		setGoBackUrl("/displayBusinessEntity");
	});

	return (
		<>
				
			<CreateBusinessEntityForm />
			{/* <FormPageHeader /> */}
		</>
	);
}

export default CreateBusinessEntityPage;