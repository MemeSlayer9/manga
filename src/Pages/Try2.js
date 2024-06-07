import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import styled from "styled-components";
import SearchResultsSkeleton from "../components/skeletons/SearchResultsSkeleton";

const YourComponent = () => {
  const [anime, setAnime] = useState([]);
  const [sort, setSort] = useState('all');
  const [status, setStatus] = useState('all');
    const [country, setCountry] = useState('all');

  const [genre, setGenre] = useState('');
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  const Sort = [
    { value: "view", label: "View" },
    { value: "created_at", label: "Created At" },
    { value: "uploaded", label: "Uploaded" },
    { value: "rating", label: "Rating" },
    { value: "follow", label: "Follow" },
    { value: "user_follow_count", label: "User Follow Count" },
  ];

  const Genre = [
    { value: "action", label: "Action" },
    { value: "adventure", label: "Adventure" },
    { value: "comedy", label: "Comedy" },
    { value: "drama", label: "Drama" },
    { value: "fantasy", label: "Fantasy" },
    { value: "supernatural", label: "Supernatural" },
    { value: "sports", label: "Sports" },
    { value: "romance", label: "Romance" },
  ];

  const Status = [
    { value: "1", label: "Ongoing" },
    { value: "2", label: "Completed" },
    { value: "3", label: "Cancelled" },
    { value: "4", label: "Hiatus" },
  ];

  const Country = [
    { value: "kr", label: "MANWHA" },
    { value: "jp", label: "MANGA" },
    { value: "cn", label: "MANHUA" },
   ];

  const handleTypeChange = (e) => setSort(e.target.value);
  const handleTypeChange2 = (e) => setStatus(e.target.value);
  const handleTypeChange3 = (e) => setGenre(e.target.value);
    const handleTypeChange4 = (e) => setCountry(e.target.value);

  const handleSearchTermChange = (e) => setSearchTerm(e.target.value);

  const sortAlphabetically = () => {
    const sortedAnime = anime.slice().sort((a, b) => {
      return sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
    });
    setAnime(sortedAnime);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };
    const countryLabelMap = {
    kr: "MANWHA",
    jp: "MANGA",
    cn: "MANHUA"
  };


  const fetchData = async () => {
    setLoading(true);
    try {
      const baseUrl = 'https://manga-roan-one.vercel.app/manga/comick/filter';
      let url = `${baseUrl}?page=${page}&limit=50`;

       console.log('Sort:', sort);      // Debugging sort
      console.log('Status:', status);  // Debugging status
      console.log('Genre:', genre);    // Debugging genre
      console.log('Country:', country);    // Debugging genre

      if (sort !== 'all') url += `&sort=${sort}`;
      if (status !== 'all') url += `&status=${status}`;
      if (genre !== 'all') url += `&genres=${genre}`;
      if (country !== 'all') url += `&country=${country}`;

      const response = await axios.get(url);
      const data = response.data.results;
      setAnime(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [sort, status, genre, page, country]);

  const filteredAnime = anime.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {loading && <SearchResultsSkeleton name="" />}
      {!loading && (
        <HomeDiv>
          <Heading>
            <Dropdown value={sort} onChange={handleTypeChange}>
              {Sort.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Dropdown>
            <Dropdown value={status} onChange={handleTypeChange2}>
              {Status.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Dropdown>
            <Dropdown value={genre} onChange={handleTypeChange3}>
              {Genre.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Dropdown>
               <Dropdown value={country} onChange={handleTypeChange4}>
              {Country.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Dropdown>
            <button onClick={sortAlphabetically}>Sort {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}</button>
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
          </Heading>
          <Filter>
            {filteredAnime.map((item) => (
              <Wrapper key={item.id}>
                <Links to={`/id/${item.slug}`}>
                                   <TONG>{countryLabelMap[item.country] || item.country}</TONG>

                  <img src={item.thumbnail.url} alt={item.title} className='card-img' />
                   <p>{item.title}</p>
                  </Links>
              </Wrapper>
            ))}
          </Filter>
          <NavButtons>
            <NavButton onClick={handlePrevPage}>Previous</NavButton>
            <span>{page}</span>
            <NavButton onClick={handleNextPage}>Next</NavButton>
          </NavButtons>
        </HomeDiv>
      )}
    </div>
  );
};
const Wrapper = styled.div`
  border-radius: 0.5rem;
  

  img {
    width: 160px;
    height: 235px;
    border-radius: 0.5rem;
    margin-bottom: 0.3rem;
    object-fit: cover;
    @media screen and (max-width: 600px) {
      width: 120px;
      height: 180px;
    }
    @media screen and (max-width: 400px) {
      width: 100px;
      height: 160px;
    }
  }

  p {
    color: white;
    font-size: 1rem;
    font-weight: 400;
    text-align: center;
  }
`;

const TONG = styled.p`
position: absolute;
 overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
       background: rgba(0, 0, 0, 0.8);
      
       
  @media screen and (max-width: 600px) {
         width: 100% !important;

    }
`;
const TONG2 = styled.p`
position: absolute;
 overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    
    width: 100%;
       background: rgba(0, 0, 0, 0.8);
     margin-top: -45px;      
       &:hover {
          border-radius: 0.5rem;

      background-color: #FFFF66; /* Change the background color on hover */
      color: black !important;
    }
  @media screen and (max-width: 600px) {
         width: 100% !important;

    }
`;
 const HomeDiv = styled.div`
    margin: 1.5rem 5rem 1rem 5rem;
        @media screen and (max-width: 1200px) {
      margin: 1rem 1rem 0rem 1rem;
    }
  `;
 const Dropdown = styled.select`
      font-size: 12px;
      font-weight: bold;
      letter-spacing: 2px;
      text-transform: uppercase;
        white-space: nowrap;
      left: 0;
      text-decoration: none;
      padding: 15px 20px;
      transition: 0.3s;
      opacity: 1;
      margin-right: 5px;
      cursor: pointer;
  
    
  `;
  const Filter = styled.div`
   display: grid;
    grid-template-columns: repeat(auto-fill, 160px);
    grid-gap: 1rem;
    grid-row-gap: 1.5rem;
    justify-content: space-between;

    @media screen and (max-width: 1200px) {
      grid-template-columns: repeat(auto-fill, 220px);
      grid-gap: 0rem;
      grid-row-gap: 1.5rem;
    }
    @media screen and (max-width: 700px) {
      grid-template-columns: repeat(auto-fill, 180px);
      grid-gap: 0rem;
      grid-row-gap: 1.5rem;
    }
    @media screen and (max-width: 600px) {
      grid-template-columns: repeat(auto-fill, 150px);
      grid-gap: 0rem;
      grid-row-gap: 1.5rem;
    }

    @media screen and (max-width: 400px) {
      grid-template-columns: repeat(auto-fill, 160px);
      grid-gap: 0rem;
      grid-row-gap: 1.5rem;
    }

    @media screen and (max-width: 380px) {
      grid-template-columns: repeat(auto-fill, 100px);
      grid-gap: 0rem;
      grid-row-gap: 1.5rem;
    }
    img {
      width: 180px;
      height: 250px;
      border-radius: 0.5rem;
      margin-bottom: 0.3rem;
      object-fit: cover;
      @media screen and (max-width: 600px) {
        width: 130px;
        height: 235px;
      }
      @media screen and (max-width: 400px) {
        width: 170px;
        height: 250px;
      }
    }

    p {
      font-size: 1rem;
      font-weight: 400;
    }

  
  `;
   const Heading = styled.p`
    font-size: 1.8rem;
    color: white;
    font-weight: 200;
    margin-bottom: 2rem;
    display: flex;
     flex-wrap: wrap;

    justify-content: space-between;
    span {
      font-weight: 600;
    }

    @media screen and (max-width: 600px) {
      font-size: 1.6rem;
      margin-bottom: 1rem;
    }
  `;

  const Links = styled(Link)`
  text-decoration: none;

   
   img {
    width: 160px;
    height: 235px;
    border-radius: 0.5rem;
    object-fit: cover;
    
  }

  p {
    color: white;
    font-size: 1rem;
    font-weight: 400;
    text-decoration: none;
    max-width: 160px;
    @media screen and (max-width: 380px) {
      width: 100px;
      font-size: 0.9rem;
    }
    :hover{
    color:#FFFF66;
  }
  }
  
`;
 const NavButtons = styled.div`
    margin-top: 2.5rem;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  `;

  const NavButton = styled(Link)`
    padding: 0.8rem 2rem;
    text-decoration: none;
    color: white;
    background-color: none;
    border: 2px solid #53507a;
    border-radius: 0.5rem;
      &:hover {
      background-color: #FFFF66; /* Change the background color on hover */
      color: black;
    }
  `;
export default YourComponent;
