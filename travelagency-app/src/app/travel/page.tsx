"use client";
import React, { useState, useEffect } from "react";
import DataTable from "./DataTable";
import Link from "next/link";
import SearchBar from "./SearchBar";

const months = [
  { label: "All Months", value: "" },
  { label: "January", value: 1 },
  { label: "February", value: 2 },
  { label: "March", value: 3 },
  { label: "April", value: 4 },
  { label: "May", value: 5 },
  { label: "June", value: 6 },
  { label: "July", value: 7 },
  { label: "August", value: 8 },
  { label: "September", value: 9 },
  { label: "October", value: 10 },
  { label: "November", value: 11 },
  { label: "December", value: 12 },
];

const categories = [
  { label: "All Categories", value: "" },
  { label: "Europe", value: "Europe" },
  { label: "Asia", value: "Asia" },
  { label: "Africa", value: "Africa" },
  { label: "North America", value: "NorthAmerica" },
  { label: "South America", value: "SouthAmerica" },
  { label: "Australia", value: "Australia" },
];

const priceCategories = [
  { label: "All Categories", value: "" },
  { label: "0-500", value: "0-500" },
  { label: "500-1000", value: "500-1000" },
  { label: "1000-1500", value: "1000-1500" },
  { label: "1500-2000", value: "1500-2000" },
  { label: "2000-2500", value: "2000-2500" },
];

const years = [
  { label: "All Years", value: "" },
  { label: "2024", value: 2024 },
  { label: "2025", value: 2025 },
];

const Travel = () => {
  const [trips, setTrips] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState<number | "">(0);
  const [selectedYear, setSelectedYear] = useState<number | "">(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriceCategory, setSelectedPriceCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchTrips();
  }, [
    selectedMonth,
    selectedYear,
    selectedCategory,
    selectedPriceCategory,
    searchTerm,
    currentPage,
  ]);

  const fetchTrips = async () => {
    let url = `/api/travel?page=${currentPage}&limit=8`;

    if (selectedMonth !== "") {
      url += `&month=${selectedMonth}`;
    }
    if (selectedYear !== "") {
      url += `&year=${selectedYear}`;
    }
    if (selectedCategory !== "") {
      url += `&category=${selectedCategory}`;
    }
    if (selectedPriceCategory !== "") {
      url += `&priceCategory=${selectedPriceCategory}`;
    }
    if (searchTerm !== "") {
      url += `&search=${encodeURIComponent(searchTerm)}`;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTrips(data.trips);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(parseInt(event.target.value));
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(parseInt(event.target.value));
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
  };

  const handlePriceCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedPriceCategory(event.target.value);
  };

  const handleSearchChange = (search: string) => {
    setSearchTerm(search);
  };

  const handleResetFilters = () => {
    setSelectedMonth("");
    setSelectedYear("");
    setSelectedCategory("");
    setSelectedPriceCategory("");
    setSearchTerm("");
  };

  const search = (items: any[]) => {
    return items.filter((item) => {
      if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return true;
      }
      return false;
    });
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="travel-container">
      <Link className="link-button" href="/travel/addTrip">
        New Trip
      </Link>
      <SearchBar onSearch={handleSearchChange} />
      <div className="filter-container">
        <label htmlFor="monthFilter">Filter by Month:</label>
        <select
          id="monthFilter"
          value={selectedMonth === "" ? "" : selectedMonth.toString()}
          onChange={handleMonthChange}
        >
          {months.map((month) => (
            <option key={month.value} value={month.value.toString()}>
              {month.label}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-container">
        <label htmlFor="yearFilter">Filter by Year:</label>
        <select
          id="yearFilter"
          value={selectedYear === "" ? "" : selectedYear.toString()}
          onChange={handleYearChange}
        >
          {years.map((year) => (
            <option key={year.value} value={year.value.toString()}>
              {year.label}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-container">
        <label htmlFor="categoryFilter">Filter by Category:</label>
        <select
          id="categoryFilter"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-container">
        <label htmlFor="priceCategoryFilter">Filter by Price:</label>
        <select
          id="priceCategoryFilter"
          value={selectedPriceCategory}
          onChange={handlePriceCategoryChange}
        >
          {priceCategories.map((priceCategory) => (
            <option key={priceCategory.value} value={priceCategory.value}>
              {priceCategory.label}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleResetFilters}>Reset Filters</button>
      <DataTable trips={search(trips)} />
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => goToPage(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Travel;
