import { useContext, useState } from "react";
import styles from './Search.module.css';
import { BsSearch } from 'react-icons/bs';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const Search = () => {

    const {state} = useContext(AuthContext);

    const [query, setQuery] = useState("");

    const search = async () => {
        console.log(query)
        // query = query.split(" ").join("+");
        console.log(query);
        const response = await fetch(
          `/api/book/search/harry+potter`,
          {
            method: "GET",
            headers: {
              Authorizaion: `Bearer ${state.token}`,
              "Content-Type": "application/json"
            },
          }
        );
        console.log(response)
            // try {
            //   const asyncResponse = await fetch({
            //     method: "GET",
            //     url: `/api/search/${query}`,
            //     headers: {
            //       Authorizaion: `Bearer ${state.token}`,
            //       "Content-Type": "application/json",
            //     },
            //     // data: JSON.stringify({
            //     //   username: username,
            //     //   password: password,
            //     // }),
            //   });
            //   if (asyncResponse.status === 200 && asyncResponse.data.token) {
            //     console.log(asyncResponse)
            //   }
            // } catch (e) {
            //   console.log(e);
            //   if (e.response) {
            //     console.log(e);
            //   }
            // }
    }
  return (
    <>
      <form onSubmit={(e)=>{e.preventDefault();
    search()}} id={styles["search-form"]} className="d-flex col-md-4 my-2">
        <input
          className="form-control me-2"
          type="search"
          onChange={(e)=>setQuery(e.target.value)}
          value={query}
          placeholder="Enter your search here"
          aria-label="Search"
        />
        <button
          id={styles["search-button"]}
          type="submit"
          className="btn btn-outline-success"
        >
          {<BsSearch />}
        </button>
      </form>
    </>
  );
};

export default Search;
