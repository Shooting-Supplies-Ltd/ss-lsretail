import { useState, createContext } from 'react';

const BrandsContext = createContext(null);

const BrandsProvider = ({ children }) => {
  const [brands, setBrands] = useState({});

  return <BrandsContext.Provider value={[brands, setBrands]}>{children}</BrandsContext.Provider>;
};

export { BrandsContext, BrandsProvider };
