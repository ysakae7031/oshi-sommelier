import { Route, Routes } from "react-router-dom";
import { RecipesProvider } from "./context/RecipesContext";
import HomePage from "./pages/HomePage";
import AddChooserPage from "./pages/AddChooserPage";
import AddHomeRecipePage from "./pages/AddHomeRecipePage";
import AddEatLogPage from "./pages/AddEatLogPage";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import RecipeEditPage from "./pages/RecipeEditPage";
import KitchenTabPage from "./pages/KitchenTabPage";
import JournalPage from "./pages/JournalPage";
import SettingsPage from "./pages/SettingsPage";
import BadgeGalleryPage from "./pages/BadgeGalleryPage";
import CookingModePage from "./pages/CookingModePage";
import ShoppingListPage from "./pages/ShoppingListPage";

export default function App() {
  return (
    <RecipesProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipes/new" element={<AddChooserPage />} />
        <Route path="/recipes/new/home" element={<AddHomeRecipePage />} />
        <Route path="/recipes/new/eat" element={<AddEatLogPage />} />
        <Route path="/recipes/:id" element={<RecipeDetailPage />} />
        <Route path="/recipes/:id/edit" element={<RecipeEditPage />} />
        <Route path="/kitchen" element={<KitchenTabPage />} />
        <Route path="/kitchen/:id/cook" element={<CookingModePage />} />
        <Route path="/shopping" element={<ShoppingListPage />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/settings/badges" element={<BadgeGalleryPage />} />
      </Routes>
    </RecipesProvider>
  );
}
