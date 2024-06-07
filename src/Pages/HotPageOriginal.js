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
          url = `https://manga-roan-one.vercel.app/manga/comick/latest?page=${page}`;
        } else {
          url = `https://manga-roan-one.vercel.app/manga/comick/latest?type=${type}&page=${page}`;
        }
      const { data } = await axios.get(url);

      setManga(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching manga:', err);
      setLoading(false);
    }
  };
      console.log(`https://manga-roan-one.vercel.app/manga/comick/latest?type=${type}&page=${page}`);


      
  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      getManga(page - 1);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    getManga(page);
  }, [page, type]);
    return (
      <div>
            {loading && <SearchResultsSkeleton name="Hot Update Results" />}
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
      <HotChapter>
          {manga.results && manga.results.map(item =>(
            <div>
                                        <Link  to={`/read/manga/comick/chapter/${item.chapterId}`}
                                                  state={{ slug: `${item.slug}` }}>
                                                                <img src={item.thumbnail.url}/>
  
                    
                                <ItemHead> 
  
  
                                                  <p>{item.title}</p>
                                          <p>Chapter {item.chap}</p>
              </ItemHead>  
              </Link>               
                      </div>

            ))}
            
            </HotChapter>
        
            <NavButtons>
          <NavButton onClick={handlePrevPage}>Previous</NavButton>
          <span>{page}</span>
          <NavButton onClick={handleNextPage}>Next</NavButton>
        </NavButtons>
              </HomeDiv>
                    )}

                </div>
    ) 
  }

  const HomeDiv = styled.div`
    margin: 1.5rem 5rem 1rem 5rem;
        @media screen and (max-width: 1200px) {
      margin: 1rem 1rem 0rem 1rem;
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
  const BoxHeader = styled.div`
    display: flex;
    justify-content: space-between;
    background:   linear-gradient(0deg, rgba(79, 79, 79, 0) 0, #4f4f4f 100%);

      padding: 10px 15px;
      color: #fff;
      font-size: 18px;
  span{
          color: #fff;
      text-decoration: none;
        font-size: 12px;
      font-weight: 700;
      letter-spacing: 2px;
      overflow: hidden;
      font-size: 12px;
    
      }
      
  `;
  const HotChapter = styled.div`
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
  const ItemHead = styled.div`
    position: absolute;
    background: rgba(0, 0, 0, 0.8);
    transition: 0.5s ease;
    color: white;
    width: 11.9%!important;
    font-size: 14px;
    text-align: center;
        border-radius: 0.5rem;
      margin-bottom: 0.3rem;

    margin-top: -93px;

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

  const Links = styled(Link)`
    font-size: 1.1rem;
    font-family: "Gilroy-Medium", sans-serif;
    text-decoration: none;
    color: #fff;
      :hover{
      color:#FFFF66;
      font-weight: bold;
    }
    @media screen and (max-width: 600px) {
      color: white;
      font-size: 1rem;
      font-family: "Gilroy-Medium", sans-serif;
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