import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import styled from "styled-components";
  import SearchResultsSkeleton from "../components/skeletons/SearchResultsSkeleton";

const YourComponent = () => {
  const [anime, setAnime] = useState([]);
    const [sort, setSort] = useState('all'); // Initialize as 'all'
    const [status, setStatus] = useState('all'); // Initialize as 'all'
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('asc'); // Initial sorting order is ascending
  const [searchTerm, setSearchTerm] = useState('');

   const Sort = [
      { value: "view", label: "FUCK" },
      { value: "created_at", label: "created_at" },
      { value: "uploaded", label: "created_at" },
      { value: "rating", label: "rating" },
            { value: "rating", label: "rating" },
            { value: "follow", label: "follow" },
            { value: "user_follow_count", label: "user_follow_count" },

    ];
    
     const handleTypeChange  = (e) => {
      setSort(e.target.value);
    };

     const Status = [
      { value: "1", label: "Ongoing" },
      { value: "2", label: "Completed" },
      { value: "3", label: "Cancelled" },
      { value: "4", label: "Hiatus" },
       
    ];
    
     const handleTypeChange2  = (e) => {
      setStatus(e.target.value);
    };
    const sortAlphabetically = () => {
    const sortedAnime = anime.slice().sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });

    setAnime(sortedAnime);
    // Toggle sorting order
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Function to filter anime by name based on the search term
  const filteredAnime = anime.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
              setLoading(true);

       let allResults = [];
let url;

for (let page = 1; page <= 1; page++) {
  if (sort === 'all' && status === 'all') {
    url = `https://manga-roan-one.vercel.app/manga/comick/filter?page=${page}&limit=50`;
  } else if (sort === 'all' && status !== 'all') {
    url = `https://manga-roan-one.vercel.app/manga/comick/filter?page=${page}&limit=50&status=${status}`;
  } else if (sort !== 'all' && status === 'all') {
    url = `https://manga-roan-one.vercel.app/manga/comick/filter?page=${page}&limit=50&sort=${sort}`;
  } else {
    url = `https://manga-roan-one.vercel.app/manga/comick/filter?page=${page}&limit=50&sort=${sort}&status=${status}`;
  }
  const response = await axios.get(url);
  const data = response.data.results;
  allResults = [...allResults, ...data];
}


        setAnime(allResults);
              setLoading(false);

        console.log('All results:', allResults);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [sort, status]); // Empty dependency array ensures this effect runs only once

  return (
    <div>
 
      {/* Render the anime data */}
          {loading && <SearchResultsSkeleton name="" />}
        {!loading && (
         <HomeDiv> 
                <Heading>
 <Dropdown id="status-select" value={sort} onChange={handleTypeChange}>
          {Sort.map((SortOption) => (
            <option key={SortOption.value} value={SortOption.value}>
              {SortOption.label}
            </option>
          ))}
       
        </Dropdown>
         <Dropdown id="status-select" value={status} onChange={handleTypeChange2}>
          {Status.map((StatusOption) => (
            <option key={StatusOption.value} value={StatusOption.value}>
              {StatusOption.label}
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
          {filteredAnime.map((item, index) => (
            <div key={item.id}>
                          <Links key={item.id} to={`/id/${item.slug}`}>

                      <img src={item.thumbnail.url} alt={item.title} className='card-img' />

          <p>{item.title}</p>
          <p>Last Chapter: {item.last_chapter}</p>
          <p>Country: {item.country}</p>
          
            
              </Links>
             

        </div>
        
      ))}
      </Filter>
      </HomeDiv>
                          )}

    </div>
  );
};

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
export default YourComponent;
