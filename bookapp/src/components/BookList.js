import React from "react";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination/Pagination";
import InputSearch from "./InputSearch";
import useDebouncedValue from "./Hooks/useDebounce";
import isLoadingHOC from "./HOC/WithLoading";

function BookList(props) {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageObj, setPageObj] = useState({});
  const [searchText, setSearchText] = useState("");
  const [searchParam] = useState(["title", "description"]);
  const [categories, setCategories] = useState([]);
  const [filterParam, setFilterParam] = useState(["All"]);
  const debouncedSearchTerm = useDebouncedValue(searchText, 500);
  const [errorMessage, setErrorMessage] = useState("");

  const { setIsLoading } = props;

  const navigate = useNavigate();

  let pageSize = 12;

  //API call to fetch data
  const fetchBooks = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.artic.edu/api/v1/artworks?page=${currentPage}`
      );
      const data = await response.json();
      setIsLoading(false);
      if (data && data.pagination) {
        setPageObj(data.pagination);
      }

      if (data && data.data) {
        const groupedItems = data.data.reduce((accumulator, item) => {
          accumulator.push(...item.category_ids);
          return accumulator;
        }, []);

        setCategories([...new Set(groupedItems)]);
        setBooks(data.data);
      }
    } catch {
        setIsLoading(false);
        setErrorMessage("unable to fetch Book list")

    }
  };

  //getting the data when the current page changes
  useEffect(() => {
    fetchBooks();
  }, [currentPage]);

  //Debouncing the search
  useEffect(() => {
    search(books);
  }, [debouncedSearchTerm]);

  //Navigation to Detail page
  const handleGoToDetailPage = (id) => {
    navigate(`/book-detail/${id}`);
  };

  //setting the search term
  const handleSearchByTitle = (e) => {
    setSearchText(e.target.value);
  };

  //Filter and search functionality
  const search = (items) => {
    return items.filter((item) => {
      if (item.category_ids.indexOf(filterParam) > -1) {
        return searchParam.some((newItem) => {
          return (
            item[newItem] &&
            item[newItem]
              .toString()
              .toLowerCase()
              .indexOf(debouncedSearchTerm.toLowerCase()) > -1
          );
        });
      } else if (filterParam == "All") {
        return searchParam.some((newItem) => {
          return (
            item[newItem] &&
            item[newItem]
              .toString()
              .toLowerCase()
              .indexOf(debouncedSearchTerm.toLowerCase()) > -1
          );
        });
      }
    });
  };

  return (
    <div className="wrapper">
      <div className="search-wrapper">
        <label htmlFor="search-form">
          <InputSearch
            searchText={searchText}
            handleSearch={handleSearchByTitle}
          />
        </label>
        <div className="select">
          <select
            onChange={(e) => {
              setFilterParam(e.target.value);
            }}
            className="custom-select"
            aria-label="Filter By Category"
          >
            <option value="All">Filter By Category</option>
            {categories.map((cat, i) => (
              <option value={cat} key={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {search(books).length > 0 && (
        <>
          <div className="books">
            {search(books).map((book) => {
              return (
                <div
                  key={book}
                  className="books__single"
                  onClick={() => handleGoToDetailPage(book.id)}
                >
                  <img
                    src={book?.thumbnail?.lqip}
                    alt={book?.thumbnail?.alt_text}
                  />
                  <span>{book.title}</span>
                </div>
              );
            })}
          </div>
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={pageObj.total}
            totalPages={pageObj.total_pages}
            pageSize={pageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
            {errorMessage && <div className="error">{errorMessage}</div>}

        </>
      )}
    </div>
  );
}

export default isLoadingHOC(BookList,'');
