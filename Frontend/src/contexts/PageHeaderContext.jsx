import { createContext, useState } from 'react';

export const PageHeaderContext = createContext();

const PageHeaderProvider = ({ children }) => {
  const [pageTitle, setPageTitle] = useState('');
  const [pageSubtitle, setPageSubtitle] = useState('');
  const [newButtonLink, setNewButtonLink] = useState(null);

  return (
    <PageHeaderContext.Provider 
      value={{ 
        pageTitle, 
        setPageTitle,
        pageSubtitle,
        setPageSubtitle, 
        newButtonLink, 
        setNewButtonLink 
      }}
    >
      {children}
    </PageHeaderContext.Provider>
  );
};

export default PageHeaderProvider;