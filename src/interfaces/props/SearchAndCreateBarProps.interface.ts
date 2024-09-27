export interface SearchAndCreateBarProps {
  searchTerm: string; // Tipo para el término de búsqueda
  setSearchTerm: (value: string) => void; // Función para actualizar el término de búsqueda
  onSearchClick: () => void; // Función para manejar el click del botón de búsqueda
  createButtonText?: string; // Texto opcional para el botón de crear
  createRoute: string; // Ruta a la que se navegará cuando se haga click en el botón de crear
}
