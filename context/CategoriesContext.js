import { useState, createContext } from 'react';

const CategoriesContext = createContext({});

const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState(null);

  return <CategoriesContext.Provider value={[categories, setCategories]}>{children}</CategoriesContext.Provider>;
};

export { CategoriesContext, CategoriesProvider };
