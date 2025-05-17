
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import QuickFilters from '@/components/search/QuickFilters';
import SearchResults from '@/components/search/SearchResults';
import { useSearchItems } from '@/hooks/useSearchItems';

const SearchPage = () => {
  const {
    items,
    loading,
    noResults,
    selectedType,
    selectedCategory,
    locationQuery,
    sortOrder,
    itemTypes,
    itemCategories,
    handleSearch,
    handleTypeChange,
    handleCategoryChange,
    handleLocationChange,
    handleAdvancedFilters,
    handleSortChange,
    clearFilters
  } = useSearchItems();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-echo-gray">
        <div className="echo-container py-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Search Lost & Found Items</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Use our powerful search to find lost items or check if someone has found what you're looking for.
            </p>
            <div className="mt-6 flex justify-center">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <QuickFilters 
              selectedType={selectedType}
              selectedCategory={selectedCategory}
              locationQuery={locationQuery}
              itemTypes={itemTypes}
              itemCategories={itemCategories}
              onTypeChange={handleTypeChange}
              onCategoryChange={handleCategoryChange}
              onLocationChange={handleLocationChange}
              onApplyAdvancedFilters={handleAdvancedFilters}
            />
            
            <div className="lg:col-span-3">
              <SearchResults 
                items={items}
                loading={loading}
                noResults={noResults}
                onClearFilters={clearFilters}
                sortOrder={sortOrder}
                onSortChange={handleSortChange}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchPage;
