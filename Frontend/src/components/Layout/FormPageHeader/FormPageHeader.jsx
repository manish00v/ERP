
import { useContext } from "react";
import "./FormPageHeader.css";
import { Link } from "react-router-dom";
import { FormPageHeaderContext } from "../../../contexts/FormPageHeaderContext";

const FormPageHeader = () => {
	const { btn, url, goBackUrl } = useContext(FormPageHeaderContext);

	return (
		<div className="content-area-navbarrr">
		
			{btn.includes("Save") && (
                <Link to={url} className="icon-header-header">
                    <i className="fa-solid fa-floppy-disk"></i>
                    {btn}
                </Link>
            )}

			{(!btn.includes("Display") || btn.includes("NoBtn")) && (
				<Link to={goBackUrl} className="icon-button-header">
					{/* <i className="fa-solid fa-arrow-left"></i> */}
					Cancel
				</Link>
			)}
		</div>
	);
}

export default FormPageHeader;