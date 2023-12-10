import React, { useState, useContext } from "react";
import "../../component/styles/traverse.css";
import { Searchuser } from "../../component/Api/Api";
import PersonContext from "../../context/app-context";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Search() {
  const [searchresult, setSearchresult] = useState([]);
  const [searchs, setSearchs] = useState();

  const { id } = useContext(PersonContext);

  console.log("Hello hello");
  async function searchfunction(id, search) {
    if (search != "") {
      const returnedsearch = await Searchuser(id, search);
      setSearchresult(() => []);
      setSearchresult(returnedsearch.result);
    } else if (search == "") {
      setSearchresult(() => []);
    }
  }
  return (
    <div className="search-page">
      <div className="seacrh-contant-page">
        <div className="input-search">
          <input
            type="search"
            name=""
            value={searchs}
            onChange={(e) => {
              setSearchs(e.target.value);
              searchfunction(id, e.target.value);
            }}
            className="search-type-input"
            placeholder="search"
          />
          <div className="search-entry-logo">
            <i className="search-icon-page">
              <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
            </i>
          </div>
        </div>
      </div>
      <div className="search-list">
        {searchresult.map((data) => {
          var friendinfo = {
            friendid: data.userID,
            friendimage: data.userimage,
            frinedname: data.username,
            friendbio: data.userbio,
          };
          return (
            <Link
              to={`/Friend/${data.username}`}
              state={friendinfo}
              className="a-decoration"
              key={data.userID}
            >
              <div
                className="search-person-name-page"
                // value={tag}
                // onClick={() => {
                //   selectPerson();
                // }}
              >
                <div className="search-person-photo-container">
                  <input
                    type="image"
                    src={require(`../../image/${data.userimage}`)}
                    alt="photo"
                    className="search-person-photo"
                  />
                </div>
                <div className="search-page-person-name">{data.username}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
