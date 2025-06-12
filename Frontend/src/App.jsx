import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import OrganizationUnitsPage from "./pages/OrgStructure/Org/OrganizationPage";
import BusinessUnitPage from "./pages/OrgStructure/BusinessUnit/BusinessUnitPage";
import SalesOfficePage from "./pages/OrgStructure/SalesOffice/SalesOfficePage";

import Homepage from "./pages/HomePage/HomePage";

import CreateSalesChannelForm from "./pages/OrgStructure/SalesChannel/CreateSalesChannel/CreateSalesChannelForm";
import EditSalesChannelPage from "./pages/OrgStructure/SalesChannel/EditSalesChannel/EditSalesChannelPage";
import DisplaySalesChannelPage from "./pages/OrgStructure/SalesChannel/DisplaySalesChannel/DisplaySalesChannelPage";
import CreateBusinessUnitForm from "./pages/OrgStructure/BusinessUnit/CreateBusinessUnit/CreateBusinessUnitForm";
import EditBusinessUnitPage from "./pages/OrgStructure/BusinessUnit/EditBusinessUnit/EditBusinessUnitPage";
import DisplayBusinessUnitPage from "./pages/OrgStructure/BusinessUnit/DisplayBusinessUnit/DisplayBusinessUnitPage";
import EditBusinessEntityPage from "./pages/OrgStructure/BusinessEntity/EditBusinessEntity/EditBusinessEntityPage";
import DisplayBusinessEntityPage from "./pages/OrgStructure/BusinessEntity/DisplayBusinessEntity/DisplayBusinessEntityPage";
import CreateSalesOfficeForm from "./pages/OrgStructure/SalesOffice/CreateSalesOffice/CreateSalesOfficeForm";
import EditSalesOfficePage from "./pages/OrgStructure/SalesOffice/EditSalesOffice/EditSalesOfficePage";
import DisplaySalesOfficePage from "./pages/OrgStructure/SalesOffice/DisplaySalesOffice/DisplaySalesOfficePage";
import CreateManufacturingFactoryUnitForm from "./pages/OrgStructure/ManufacturingFactoryUnit/CreateManufacturingFactoryUnit/CreateManufacturingFactoryUnitForm"; 
import EditManufacturingFactoryUnitForm from "./pages/OrgStructure/ManufacturingFactoryUnit/EditManufacturingFactoryUnit/EditManufacturingFactoryUnitForm";   
import DisplayManufacturingFactoryUnitForm from "./pages/OrgStructure/ManufacturingFactoryUnit/DisplayManufacturingFactoryUnit/DisplayManufacturingFactoryUnitForm";  
import CreateDeliveryLocationForm from "./pages/OrgStructure/DeliveryLocation/CreateDeliveryLocation/CreateDeliveryLocationForm"; 
import EditDeliveryLocationForm from "./pages/OrgStructure/DeliveryLocation/EditDeliveryLocation/EditDeliveryLocationForm";   
import DisplayDeliveryLocationForm from "./pages/OrgStructure/DeliveryLocation/DisplayDeliveryLocation/DisplayDeliveryLocationForm";  
import CreateSalesTeamForm from "./pages/OrgStructure/SalesTeam/CreateSalesTeam/CreateSalesTeamForm";
import EditSalesTeamForm from "./pages/OrgStructure/SalesTeam/EditSalesTeam/EditSalesTeamForm";   
import DisplaySalesTeamPage from "./pages/OrgStructure/SalesTeam/DisplaySalesTeam/DisplaySalesTeamPage"; 
import DisplayInventoryBayPage from "./pages/OrgStructure/InventoryBay/DisplayInventoryBay/DisplayInventoryBayPage";
import CreateInventoryBayForm from "./pages/OrgStructure/InventoryBay/CreateInventoryBay/CreateInventoryBayForm";
import EditInventoryBayForm from "./pages/OrgStructure/InventoryBay/EditInventoryBay/EditInventoryBayForm"; 
import DisplayInventoryUnitPage from "./pages/OrgStructure/InventoryUnit/DisplayInventoryUnit/DisplayInventoryUnitPage";  
import CreateInventoryUnitForm from "./pages/OrgStructure/InventoryUnit/CreateInventoryUnit/CreateInventoryUnitForm"; 
import EditInventoryUnitForm from "./pages/OrgStructure/InventoryUnit/EditInventoryUnit/EditInventoryUnitForm"; 
import DisplaySourcingTeamPage from "./pages/OrgStructure/SourcingTeam/DisplaySourcingTeam/DisplaySourcingTeamPage";
import CreateSourcingTeamForm from "./pages/OrgStructure/SourcingTeam/CreateSourcingTeam/CreateSourcingTeamForm";   
import EditSourcingTeamForm from "./pages/OrgStructure/SourcingTeam/EditSourcingTeam/EditSourcingTeamForm"; 
import DisplaySourcingUnitPage from "./pages/OrgStructure/SourcingUnit/DisplaySourcingUnit/DisplaySourcingUnitPage";  
import CreateSourcingUnitForm from "./pages/OrgStructure/SourcingUnit/CreateSourcingUnit/CreateSourcingUnitForm";   
import EditSourcingUnitForm from "./pages/OrgStructure/SourcingUnit/EditSourcingUnit/EditSourcingUnitForm";





import CreateBusinessEntityForm from "./pages/OrgStructure/BusinessEntity/CreateBusinessEntity/CreateBusinessEntityForm";



import BUMFUBE from "./pages/Assignment/BUMFUBE/BUMFUBEPage";
import CreateAssignmentTable from './pages/Assignment/BUMFUBE/CreateAssignmentTable/CreateAssignmentTable';
import EditAssignmentTable from "./pages/Assignment/BUMFUBE/EditAssignmentTable/EditAssignmentTable";
import SoScBuTable from "./pages/Assignment/SOSCBU/SoScBuTable";
import CreateSoScBuAssignmentTable from "./pages/Assignment/SOSCBU/CreateSoScBuAssignmentTable";
import EditSoScBuAssignmentTable from "./pages/Assignment/SOSCBU/EditSoScBuAssignmentTable";
import CreateSoStSpAssignmentTable from "./pages/Assignment/SOSTSP/CreateSoStSpAssignmentTable";
import EditSoStSpAssignmentTable from "./pages/Assignment/SOSTSP/EditSoStSpAssignmentTable";  
import SoStSpTable from "./pages/Assignment/SOSTSP/SoStSpTable";
import MfuSuSctTable from "./pages/Assignment/MFUSUSCT/MfuSuSctTable";
import CreateMfuSuSctAssignmentTable from "./pages/Assignment/MFUSUSCT/CreateMfuSuSctAssignmentTable";
import EditMfuSuSctAssignmentTable from "./pages/Assignment/MFUSUSCT/EditMfuSuSctAssignmentTable"
import MfuIuIbTable from "./pages/Assignment/MFUIUIB/MfuIuIbTable";
import CreateMfuIuIbAssignmentTable from "./pages/Assignment/MFUIUIB/CreateMfuIuIbAssignmentTable";
import EditMfuIuIbAssignmentTable from "./pages/Assignment/MFUIUIB/EditMfuIuIbAssignmentTable"; 
import MfuDlTable from "./pages/Assignment/MFUDL/MfuDlTable";
import CreateMfuDlAssignmentTable from "./pages/Assignment/MFUDL/CreateMfuDlAssignmentTable"; 
import EditMfuDlAssignmentTable from "./pages/Assignment/MFUDL/EditMfuDlAssignmentTable"; 



import MasterPage from "./pages/MasterData/MasterPage/MasterPage";
import DisplayCustomerPage from "./pages/MasterData/Customer/DisplayCustomerPage";
import CreateCustomerForm from "./pages/MasterData/Customer/CreateCustomer/CreateCustomerForm";
import ContactPersonForm from "./pages/MasterData/Customer/CreateCustomer/CreateCustomerTabs/ContactPersons";
import BankForm from "./pages/MasterData/Customer/CreateCustomer/CreateCustomerTabs/BankDetails";
import AccountingDetails from "./pages/MasterData/Customer/CreateCustomer/CreateCustomerTabs/AccountingDetails";
import SalesShippingDetails from "./pages/MasterData/Customer/CreateCustomer/CreateCustomerTabs/SalesShippingDetails";

import Profile from "./header/Profile/Profile";
import Settings from "./header/Setting/Setting";
import NotificationSettings from "./header/Notification/NotificationSettings";
import CollaborationSettings from "./header/Team/CollaborationSettings";

import Login from "./Login/Login";
import ProtectedRoute from "./Login/ProtectedRoute";
import SignUp from "./Login/SignUp";
import ForgotPassword from "./Login/ForgotPassword";
import ResetPassword from "./Login/ResetPassword";
import PrivateRoute from "./Login/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/layout"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/organizationPage" element={<OrganizationUnitsPage />} />
          <Route path="/businessUnit" element={<BusinessUnitPage />} />

          <Route path="/salesOffice" element={<SalesOfficePage />} />

          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Homepage />
              </PrivateRoute>
            }
          />


          <Route path="/BUMFUBE" element={<BUMFUBE />} />
          <Route path="/createAssignment" element={<CreateAssignmentTable/>} />
          <Route path="/editAssignment/:businessEntityCode" element={<EditAssignmentTable/>} />
          <Route path="/SoScBu" element={<SoScBuTable />} />
          <Route path="/createSoScBuAssignment" element={<CreateSoScBuAssignmentTable />} />  
          <Route path="/editSoScBuAssignment/:businessUnitCode" element={<EditSoScBuAssignmentTable />} />
          <Route path="/SoStSp" element={<SoStSpTable />} />
          <Route path="/createSoStSpAssignment" element={<CreateSoStSpAssignmentTable />} />  
          <Route path="/editSoStSpAssignment" element={<EditSoStSpAssignmentTable />} />
          <Route path="/MfuSuSct" element={<MfuSuSctTable />} />
          <Route path="/createMfuSuSctAssignment" element={<CreateMfuSuSctAssignmentTable />} />  
          <Route path="/editMfuSuSctAssignment/:factoryUnitCode" element={<EditMfuSuSctAssignmentTable />} />
          <Route path="/MfuIuIb" element={<MfuIuIbTable />} />
          <Route path="/createMfuIuIbAssignment" element={<CreateMfuIuIbAssignmentTable />} />  
          <Route path="/editMfuIuIbAssignment/:factoryUnitCode" element={<EditMfuIuIbAssignmentTable />} />
          <Route path="/MfuDl" element={<MfuDlTable />} />
          <Route path="/createMfuDlAssignment" element={<CreateMfuDlAssignmentTable />} />  
          <Route path="/editMfuDlAssignment/:factoryUnitCode" element={<EditMfuDlAssignmentTable />} />
          



          <Route path="/createSalesChannel" element={<CreateSalesChannelForm />} />
          <Route path="/editSalesChannel/:salesChannelId" element={<EditSalesChannelPage/>} />
          <Route
            path="/displaySalesChannel"
            element={<DisplaySalesChannelPage />}
          />
          <Route path="/createBusinessUnit" element={<CreateBusinessUnitForm/>} />
          <Route path="/editBusinessUnit/:businessUnitCode" element={<EditBusinessUnitPage />} />
          <Route path="/displayBusinessUnit" element={<DisplayBusinessUnitPage />} />
          <Route path="/createBusinessEntity" element={<CreateBusinessEntityForm />} />
          <Route path="/editBusinessEntity/:businessEntityCode" element={<EditBusinessEntityPage />} />
          <Route path="/displayBusinessEntity" element={<DisplayBusinessEntityPage />} />
          <Route
            path="/createSalesOffice"
            element={<CreateSalesOfficeForm />}
          />
          <Route path="/editSalesOffice/:salesOfficeCode" element={<EditSalesOfficePage />} />
          <Route
            path="/displaySalesOffice"
            element={<DisplaySalesOfficePage />}
          />
        <Route path="/displayInventoryBay" element={<DisplayInventoryBayPage />} />
        <Route path="/createInventoryBay" element={<CreateInventoryBayForm />} />
        <Route path="/editInventoryBay/:InventoryBayId" element={<EditInventoryBayForm />} />
        <Route path="/displayInventoryUnit" element={<DisplayInventoryUnitPage />} />
        <Route path="/createInventoryUnit" element={<CreateInventoryUnitForm />} />
        <Route path="/editInventoryUnit/:InventoryUnitId" element={<EditInventoryUnitForm />} />
        <Route path="/displaySourcingTeam" element={<DisplaySourcingTeamPage />} />
        <Route path="/createSourcingTeam" element={<CreateSourcingTeamForm />} />
        <Route path="/displaySourcingUnit" element={<DisplaySourcingUnitPage />} />
        <Route path="/editSourcingTeam/:SourcingTeamId" element={<EditSourcingTeamForm />} />
        <Route path="/createSourcingUnit" element={<CreateSourcingUnitForm />} />
        <Route path="/editSourcingUnit/:SourcingUnitId" element={<EditSourcingUnitForm />} />



          <Route
            path="/displayManufacturingFactoryUnitForm"
            element={<DisplayManufacturingFactoryUnitForm />}
          />
          <Route path="/editManufacturingFactoryUnitForm/:factoryUnitCode" element={<EditManufacturingFactoryUnitForm />} />   
          <Route
            path="/displayDeliveryLocationForm"
            element={<DisplayDeliveryLocationForm />}
          />
          <Route path="/editDeliveryLocationForm/:deliveryLocationCode" element={<EditDeliveryLocationForm />} /> 
          <Route path="/createDeliveryLocationForm" element={<CreateDeliveryLocationForm />} />
          <Route path="/createManufacturingFactoryUnitForm" element={<CreateManufacturingFactoryUnitForm />} /> 
          <Route path="/createSalesTeamForm" element={<CreateSalesTeamForm />} />
          <Route path="/editSalesTeamForm/:salesTeamCode" element={<EditSalesTeamForm />} />   
          <Route path="/displaySalesTeamPage" element={<DisplaySalesTeamPage />} />
          

          <Route path="/masterPage" element={<MasterPage />} />
          <Route path="/displayCustomerPage" element={<DisplayCustomerPage />} />
          <Route path="/createCustomerForm" element={<CreateCustomerForm/>}/>
          <Route path="/contactPersonForm" element={<ContactPersonForm/>}/>
          <Route path="/bankForm" element={<BankForm/>}/>
          <Route path="/accountingDetails" element={<AccountingDetails />} />
          <Route path="/salesShippingDetails" element={<SalesShippingDetails />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/setting" element={<Settings />} />
          <Route path="/notification" element={<NotificationSettings />} />
          <Route
            path="/collaborationsettings"
            element={<CollaborationSettings />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
