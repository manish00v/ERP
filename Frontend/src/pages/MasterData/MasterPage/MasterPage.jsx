import './MasterPage.css';

const NavigationMenu = () => {
  return (
    <div className="navigation-container">
      <nav className="nav-menu">
        <h2 className="box-title-master-data">Master Data</h2>
        <ul className="nav-list">
          <li className="nav-item">
            <a href="/displayCustomerPage" className="nav-link">Customer</a>
          </li>
          <li className="nav-item">
            <a href="#supplier" className="nav-link">Supplier</a>
          </li>
          <li className="nav-item">
            <a href="#product" className="nav-link">Product</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavigationMenu;