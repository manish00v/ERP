
import { useContext, useEffect } from "react";
import { FormPageHeaderContext } from "../../../../contexts/FormPageHeaderContext";
import FormPageHeader from "../../../../components/Layout/FormPageHeader/FormPageHeader";
import CreateManufacturingFactoryUnitForm from "./CreateManufacturingFactoryUnitForm";

const CreateManufacturingFactoryUnitPage = () => {
	const { setBtn, setUrl, setGoBackUrl } = useContext(FormPageHeaderContext);

	useEffect(() => {
		setBtn("Create");
		setUrl("/BusinessEntity");
		setGoBackUrl("/displayManufacturingFactoryUnitForm");
	});

	return (
		<>
			<FormPageHeader />
			<CreateManufacturingFactoryUnitForm/>
		</>
	);
}

export default CreateManufacturingFactoryUnitPage;