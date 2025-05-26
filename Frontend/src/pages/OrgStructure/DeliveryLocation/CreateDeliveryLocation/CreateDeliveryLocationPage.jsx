
import { useContext, useEffect } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import CreateDeliveryLocationForm from "./CreateDeliveryLocationForm";

const CreateDeliveryLocationPage = () => {
	const { setBtn, setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);

	useEffect(() => {
		setBtn("Create");
		setUrl("/BusinessEntity");
		setGoBackUrl("/displayDeliveryLocationForm");
	});

	return (
		<>
			<FormPageHeader />
			<CreateDeliveryLocationForm/>
		</>
	);
}

export default CreateDeliveryLocationPage;