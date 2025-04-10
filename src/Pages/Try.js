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
      const baseUrl = 'https://manga2-six.vercel.app/manga/comick/filter';
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
              <option value="" disabled>Sort</option>

              {Sort.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Dropdown>
            <Dropdown value={status} onChange={handleTypeChange2}>
              <option value="" disabled>Status</option>

              {Status.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Dropdown>
            <Dropdown value={genre} onChange={handleTypeChange3}>
              <option value="" disabled>Genres</option>

              {Genre.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Dropdown>
               <Dropdown value={country} onChange={handleTypeChange4}>
                 <option value="" disabled>Type</option>

              {Country.map((option) => (
                
                <option key={option.value} value={option.value}>

                  {option.label}
                </option>
              ))}
            </Dropdown>
 
          </Heading>
          <Filter>
            {filteredAnime.map((item) => (
              <Wrapper key={item.id}>
                <Links to={`/id/${item.slug}`}>
                                   <TONG>
                                   <p> {countryLabelMap[item.country] || item.country}
                                   </p>
                                   </TONG>

                  <img src={item.thumbnail.url} alt={item.title} className='card-img' />
                  <TONG2> 
                   <p>{item.title}</p>
                   </TONG2>
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
  
 

  p {
    color: white;
    font-size: 1rem;
    font-weight: 400;
    text-align: center;
   }
`;

 const Filter = styled.div`
   display: grid;
    grid-template-columns: repeat(auto-fill, 160px);
    grid-gap: 1rem;
    grid-row-gap: 1.5rem;
    justify-content: space-between;
    margin-top: 20px;

      @media (min-width: 768px) {
    ul {
      grid-template-columns: repeat(3, 1fr); /* Two items in a row on screens wider than 768px */
    }
  }
  
  

 
     @media (max-width: 780px) {
    grid-template-columns: repeat(3, 1fr); 
      
   }
       @media (max-width: 400px) {
    grid-template-columns: repeat(2, 1fr); 
      
   }
     @media (max-width: 400px) {
    grid-template-columns: repeat(2, 1fr); 
      
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
        width: 160px;
        height: 250px;
      }
    }

    p {
      font-size: 1rem;
      font-weight: 400;
    }
`;
const TONG = styled.div`
position: absolute;
 overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 11.9%!important;
       background: rgba(0, 0, 0, 0.8);
      
       
 @media (max-width: 1200px) {
      width: 16% !important; /* Adjust the width for smaller screens */
    }
      @media (max-width: 1000px) {
      width: 17% !important; /* Adjust the width for smaller screens */
    }


  @media (max-width: 800px) {
      width: 25%!important; /* Adjust the width for even smaller screens */
    }
    @media (max-width: 700px) {
      width: 30%!important; /* Adjust the width for even smaller screens */
    }
    @media (max-width: 600px) {
      width: 25%!important; /* Adjust the width for even smaller screens */
    }
      @media (max-width: 500px) {
      width: 28%!important; /* Adjust the width for even smaller screens */
    }
      @media (max-width: 400px) {
      width: 44%!important; /* Adjust the width for even smaller screens */
    }
`;
const TONG2 = styled.div`
 position: absolute;
    background: rgba(0, 0, 0, 0.8);
    transition: 0.5s ease;
    color: white;
    width: 11.9%!important;
    font-size: 14px;
    text-align: center;
        border-radius: 0.5rem;
      margin-bottom: 0.3rem;

    margin-top: -57px;

    &:hover {
      background-color: #FFFF66; /* Change the background color on hover */
      color: black !important;
    }
    p {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      max-width: 100%;
         margin-top: 9px;
        margin-bottom: 22px;
    }

    
    @media (max-width: 1200px) {
      width: 16% !important; /* Adjust the width for smaller screens */
    }
      @media (max-width: 1000px) {
      width: 17% !important; /* Adjust the width for smaller screens */
    }


  @media (max-width: 800px) {
      width: 25%!important; /* Adjust the width for even smaller screens */
    }
    @media (max-width: 700px) {
      width: 30%!important; /* Adjust the width for even smaller screens */
    }
    @media (max-width: 600px) {
      width: 25%!important; /* Adjust the width for even smaller screens */
    }
      @media (max-width: 500px) {
      width: 28%!important; /* Adjust the width for even smaller screens */
    }
      @media (max-width: 400px) {
      width: 44%!important; /* Adjust the width for even smaller screens */
    }
`;
 const HomeDiv = styled.div`
    margin: 1.5rem 5rem 1rem 5rem;
        @media screen and (max-width: 1200px) {
      margin: 1rem 1rem 0rem 1rem;
    }
  `;
 const Dropdown = styled.select`
      outline: none;
  background: #404040;
  border: none;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  color: #ffffff;
  background-color: #242235;
  padding: 0.8rem;
  font-family: 'Gilroy-Medium', sans-serif;
  font-size: 0.9rem;
  border-radius: 0.4rem;
  transition: 0.2s;
   align-items: center;
    width: 20%;

     @media screen and (max-width: 600px) {
    display: block;
    width: 50%;
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
