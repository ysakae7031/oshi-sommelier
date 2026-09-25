import { createContext, useContext } from "react";
import { useRecipes } from "../hooks/useRecipes";

const RecipesContext = createContext(null);

export function RecipesProvider({ children }) {
  const value = useRecipes();
  return (
    <RecipesContext.Provider value={value}>
      {children}
    </RecipesContext.Provider>
  );
}

export function useRecipesContext() {
  const ctx = useContext(RecipesContext);
  if (!ctx) {
    throw new Error("useRecipesContext must be used within RecipesProvider");
  }
  return ctx;
}
