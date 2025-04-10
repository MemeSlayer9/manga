import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams, } from "react-router-dom";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import { CgClose } from "react-icons/cg";
import { IconContext } from "react-icons";
import useWindowDimensions from "../../hooks/useWindowDimensions";

function Search({ isActive, setIsActive }) {
  let { name = "" } = useParams();

  const [query, setQuery] = useState("");
  const { width, height } = useWindowDimensions();
  const navigate = useNavigate();

  useEffect(() => {
    setQuery(name);
  }, [name]);

  function searchEnter() {
    if (query !== "") {
      setIsActive(false);
      navigate("/search/" + query);
    }
  }

  return (
    <Wrapper>
      <CloseButton>
        <IconContext.Provider
          value={{
            size: "1.5rem",
            color: "white",
            style: {
              verticalAlign: "middle",
              marginBottom: "0.1rem",
              marginRight: "0.3rem",
            },
          }}
        >
          <button onClick={(e) => setIsActive(false)}>
            <CgClose />
          </button>
        </IconContext.Provider>
      </CloseButton>
      <Content>
        <div className="main">
          <div>
            {width <= 600 && (
              <IconContext.Provider
                value={{
                  size: "1.5rem",
                  color: "#C5C5C5",
                  style: {
                    verticalAlign: "middle",
                    marginBottom: "0.1rem",
                    marginRight: "0.3rem",
                  },
                }}
              >
                <FiSearch />
              </IconContext.Provider>
            )}
            {width > 600 && (
              <IconContext.Provider
                value={{
                  size: "1.5rem",
                  color: "#C5C5C5",
                  style: {
                    verticalAlign: "middle",
                    marginBottom: "0.1rem",
                    marginRight: "0.3rem",
                  },
                }}
              >
                <FiSearch />
              </IconContext.Provider>
            )}

            <input
              type="text"
              required
              placeholder={"Enter the name of the anime"}
              value={query}
              autoFocus
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              onKeyPress={(event) => {  
                if (event.key === "Enter") {
                  searchEnter();
                }
              }}
            />
          </div>
          {query !== "" && (
            <SearchButton
              to={"/search/" + query}
              onClick={(e) => {
                setIsActive(false);
              }}
            >
              Search
            </SearchButton>
          )}
          {query === "" && <button>Search</button>}
         </div>
      </Content>
    </Wrapper>
  );
}



const Content = styled.div`
		background: linear-gradient(to bottom, #161616 100%, rgba(22, 22, 22, 0.9) 75%, rgba(22, 22, 22, 0.8) 100%);
  padding: 0rem 4rem 3.8rem 4rem;
  border-radius: 0.5rem;

  .main {
    background-color: white;
    padding: 0.5rem;
    padding-left: 1.2rem;
    padding-right: 0.8rem;
    border-radius: 0.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  div {
    display: flex;
    align-items: center;
    width: 100%;
  }
  input {
    outline: none;
    border: none;
    padding: 1rem 2rem 1rem 0.5rem;
    font-size: 1rem;
    font-family: "Lexend", sans-serif;
    font-weight: 400;
    width: 100%;
    background-color: white;
    color: black;
  }
  ::placeholder {
    color: #c5c5c5;
  }

  @media screen and (max-width: 600px) {
    padding: 1rem;

    .main {
      flex-direction: column;
      background-color: transparent;
      padding: 0;
      padding-left: 0;
      padding-right: 0;
    }

    div {
      background-color: white;
      padding: 0.3rem 1rem;
      border-radius: 0.3rem;
      width: 100%;
      margin-bottom: 1rem;
    }
  }

  button {
    outline: none;
    border: none;
    background-color: #182335;
    color: white;
    font-size: 1rem;
    padding: 0.9rem 2rem;
    text-decoration: none;
    border-radius: 0.3rem;
    text-align: center;
    font-family: "Lexend", sans-serif;
    font-weight: 500;
    cursor: pointer;

    @media screen and (max-width: 600px) {
      display: block;
      width: 100%;
      font-size: 1.2rem;
    }
  }
`;

const CloseButton = styled.div`
  display: flex;
  justify-content: flex-end;
  button {
    background-color: transparent;
    outline: none;
    border: none;
    padding: 1rem;
    cursor: pointer;
  }
`;

const SearchButton = styled(Link)`
  background-color: #DB202C;
  color: white;
  padding: 0.9rem 2rem;
  text-decoration: none;
  border-radius: 0.3rem;
  text-align: center;
  font-weight: 500;

  @media screen and (max-width: 600px) {
    display: block;
    width: 100%;
    font-size: 1.2rem;
  }
`;

const Wrapper = styled.div`
		background: linear-gradient(to bottom, #161616 100%, rgba(22, 22, 22, 0.9) 75%, rgba(22, 22, 22, 0.8) 100%);
  position: absolute;
  z-index: 10;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  border: 1px solid #35334e;
  border-radius: 0.5rem;

  @media screen and (max-width: 600px) {
    width: 93%;
  }
`;

export default Search;
