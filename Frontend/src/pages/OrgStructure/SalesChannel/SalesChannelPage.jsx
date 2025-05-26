
import { useContext, useEffect } from "react";
import Tips from "../../../components/Tips/Tips";
import { TipsPageHeaderContext } from "../../../contexts/TipsPageHeaderContext";
import TipsPageHeader from "../../../components/Layout/TipsPageHeader/TipsPageHeader";

const SalesOrderPage = () => {
	const { setCreateBtn, setEditBtn, setDisplayBtn, setCreateUrl, setEditUrl, setDisplayUrl } = useContext(TipsPageHeaderContext);

	useEffect(() => {
		setCreateBtn("Create Sales Channel");
		setEditBtn("Edit Sales Channel");
		setDisplayBtn("Display Sales Channel");
		setCreateUrl("/createSalesChannel");
		setEditUrl("/editSalesChannel");
		setDisplayUrl("/displaySalesChannel");
	});

	return (
		<>
			<TipsPageHeader />
			<Tips />
		</>
	);
}

export default SalesOrderPage;