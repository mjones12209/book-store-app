import { useContext, useState } from "react";
import styles from "./Search.module.css";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { Alert } from "react-bootstrap";
import SearchResult from "./SearchResult/SearchResult";

const Search = () => {
  const { state } = useContext(AuthContext);

  const [results, setResults] = useState([]);

  const [apiError, setApiError] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {},
    resolver: undefined,
    context: undefined,
    criteriaMode: "firstError",
    shouldFocusError: true,
    shouldUnregister: false,
  });

  const search = async (data) => {
    try {
      const asyncResponse = await axios({
        method: "GET",
        url: `/api/book/search/${data.query.split(" ").join("+")}`,
        headers: {
          Authorization: `Bearer ${state.token}`,
          "Content-Type": "application/json",
        },
      });
      if (asyncResponse.status === 200) {
        setResults(asyncResponse.data.books);
      }
    } catch (e) {
      console.log(e);
      if (e.response) {
        setApiError(
          "There was a problem with your search, please try again later or contact customer support."
        );
      }
    }
  };

  return (
    <>
      {apiError && (
        <Alert className="mt-1" variant="danger">
          {apiError}
        </Alert>
      )}
      <h1 className="text-center">Search</h1>
      <form
        onSubmit={handleSubmit(search)}
        id={styles["search-form"]}
        className="d-flex col-md-4 my-2"
      >
        <input
          className="form-control me-2"
          type="search"
          placeholder="Enter your search here"
          aria-label="Search"
          {...register("query", {
            required: "Please enter a search query",
          })}
        />
        {errors.query && 
          <Alert className="mt-1" variant="danger">
            {errors.query?.type === "required" && errors.query.message}
          </Alert>  
        } 
        <button
          id={styles["search-button"]}
          className="btn btn-outline-success"
        >
          {<BsSearch />}
        </button>
      </form>
      <div id={styles["searchResults"]}>
        {results &&
          results.map((result, index) => {
            return (
              <SearchResult
                key={`searchResult-${index}`}
                title={result.title}
                author={result.authors}
                desc={result.description}
                picture={result.imageLinks?.thumbnail}
                bookId={result.id}
              />
            );
          })}
      </div>
    </>
  );
};

export default Search;
