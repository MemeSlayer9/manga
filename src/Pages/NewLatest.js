import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link,  } from "react-router-dom";
import styled from "styled-components";
  import SearchResultsSkeleton from "../components/skeletons/SearchResultsSkeleton";

function Home() {

    const [loading, setLoading] = useState(true);
    const [manga, setManga] = useState([]);
const [page, setPage] = useState(1);
  const [type, setType] = useState('all'); // Initialize as 'all'

  const Types = [
    { value: "all", label: "All" },
    { value: "manga", label: "Manga" },
    { value: "manhwa", label: "manhwa" },
    { value: "manhua", label: "manhua" },
  ];

    const handleTypeChange  = (e) => {
    setType(e.target.value);
  };
 
const getManga = async (page = 1) => {
  try {
    setLoading(true);
   let url;
      if (type === 'all') {
        url = `https://manga-api.vercel.app/manga/comick/latest?page=${page}&order=new`;
      } else {
        url = `https://manga-api.vercel.app/manga/comick/latest?type=${type}&page=${page}&order=new`;
      }
    const { data } = await axios.get(url);

    setManga(data);
    setLoading(false);
  } catch (err) {
    console.error('Error fetching manga:', err);
    setLoading(false);
   }
};
    console.log(`https://manga-api.vercel.app/manga/comick/latest?type=${type}&page=${page}&order=new`);


     
const handlePrevPage = () => {
  if (page > 1) {
    setPage(page - 1);
    getManga(page - 1);
  }
};

const handleNextPage = () => {
  setPage(page + 1);
};

const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const difference = now - date;

    const minutes = Math.floor(difference / 1000 / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    }
  };
useEffect(() => {
  getManga(page);
}, [page, type]);
  return (
   <div>
      {loading && <SearchResultsSkeleton name="Popular Anime" />}
      {!loading && (
        
        <HomeDiv>
        
        <Heading>
              <span>Hot Update Results</span>  
                <Dropdown id="status-select" value={type} onChange={handleTypeChange}>
          {Types.map((TypeOption) => (
            <option key={TypeOption.value} value={TypeOption.value}>
              {TypeOption.label}
            </option>
          ))}
        </Dropdown>
            </Heading>
          <CardWrapper>
          {manga.results && manga.results.map(item =>(
              <Wrapper key={item.id}>
                  
                <Links  to={`/read/manga/comick/chapter/${item.chapterId}`}
                     state={{ slug: `${item.slug}` }}
                > 
       <TONG2> 
                          <p>{timeAgo(item.created_at)}</p> {/* Displaying time only */}
            </TONG2>
                   
                   <img className="card-img" src={item.thumbnail.url} alt={item.title.romaji} />
                <TONG>         <p>{item.title}</p>
                                          <p>Chapter {item.chap}</p>
                
                  </TONG> {/* Display countdown timer */}

                </Links>
              </Wrapper>
            ))}
          </CardWrapper>
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
  const HomeDiv = styled.div`
    margin: 1.5rem 5rem 1rem 5rem;
        @media screen and (max-width: 1200px) {
      margin: 1rem 1rem 0rem 1rem;
    }
  `;

  
const Tabs = styled.div`
   padding: 2rem;
  outline: 2px solid #272639;
  border-radius: 0.5rem;
  color: white;
  display: flex;
   @media screen and (max-width: 600px) {
    display: block;
    width: 100%;
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

  const TONG2 = styled.p`
position: absolute;
 overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
       background: rgba(0, 0, 0, 0.8);
      
 
  @media screen and (max-width: 600px) {
         width: 25% !important;

    }
`;
const TabButton = styled.button`
   outline: none;
  background: #404040;
  border: none;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  color: #ffffff;
  background-color: #242235;
  padding: 0.8rem 2rem;
  font-family: 'Gilroy-Medium', sans-serif;
  font-size: 0.9rem;
  border-radius: 0.4rem;
  transition: 0.2s;
   gap: 0.4rem;
   margin: 2px;
   align-items: center;
 :hover {
    background-color: #DB202C;
  }
`;
const TONG = styled.p`
position: absolute;
   
    
    width: 100%;
       background: rgba(0, 0, 0, 0.8);
     margin-top: -45px;      

     p{
      overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
     }
       &:hover {
          border-radius: 0.5rem;

      background-color: #FFFF66; /* Change the background color on hover */
      color: black !important;
    }
  @media screen and (max-width: 600px) {
         width: 25% !important;

    }
`;
const Parent = styled.div`
  margin: 2rem 5rem 2rem 5rem;
  @media screen and (max-width: 600px) {
    margin: 1rem;
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
    @media screen and (max-width: 600px) {
      width: 120px;
      height: 180px;
      border-radius: 0.3rem;
    }
    @media screen and (max-width: 400px) {
      width: 110px;
      height: 170px;
    }
    @media screen and (max-width: 380px) {
      width: 100px;
      height: 160px;
    }
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
  }
`;
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

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 160px);
  grid-gap: 1rem;
  grid-row-gap: 1.5rem;
  justify-content: space-between;

  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(auto-fill, 120px);
    grid-gap: 0rem;
    grid-row-gap: 1.5rem;
  }

  @media screen and (max-width: 400px) {
    grid-template-columns: repeat(auto-fill, 110px);
    grid-gap: 0rem;
    grid-row-gap: 1.5rem;
  }

  @media screen and (max-width: 380px) {
    grid-template-columns: repeat(auto-fill, 100px);
    grid-gap: 0rem;
    grid-row-gap: 1.5rem;
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
export default Home