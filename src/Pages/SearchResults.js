import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

   import TopPageSkeleton from "../components/skeletons/TopPageSkeleton";

function AnimeCards() {
      let { name } = useParams();
      const [query, setQuery] = useState(name);

  const [loading, setLoading] = useState(true);
   const [anime, setAnime] = useState({});
    const [comic_types, setComicTypes] = useState('all'); // Initialize as 'all'

   const [searchQuery, setSearchQuery] = useState('');

 
 const Types = [
      { value: "all", label: "All" },
      { value: "manga", label: "Manga" },
      { value: "manhwa", label: "manhwa" },
      { value: "manhua", label: "manhua" },
    ];


    const handleTypeChange  = (e) => {
      setComicTypes(e.target.value);
    };
  const filteredAnime = anime.results?.filter((item) =>
  item.title.toLowerCase().includes(searchQuery.toLowerCase())
);

 
const getAnime = async (id = 1) => {
  try {
    setLoading(true);
    
       const { data } = await axios.get(`https://manga-roan-one.vercel.app/manga/comick/filter?search=${query}&limit=50`);


     // Check if the response data contains the expected structure
    if (data && Array.isArray(data.results)) {
      const mangaList = data.results;

      // Iterate over each manga in the list and fetch additional details
      const mangaWithDetails = await Promise.all(
        mangaList.map(async (manga) => {
          try {
            const { data: mangaDetails } = await axios.get(
              `https://manga-roan-one.vercel.app/manga/comick/title/${manga.id}`
            );

            console.log(`Fetched manga details for ${manga.id}:`, mangaDetails);

            return {
              ...manga,
              // Add additional details from the second API response
              mangaDetails: mangaDetails,
            };
          } catch (error) {
            console.error(`Error fetching manga details for ${manga.id}:`, error);
            return manga;
          }
        })
      );

      console.log('Manga with details:', mangaWithDetails);

      setAnime({ results: mangaWithDetails });
      setLoading(false);
    } else {
      console.error('Response data does not contain the expected structure:', data);
      setLoading(false);
    }
  } catch (err) {
    console.error(err);
    setLoading(false);
  }
  
};


 
  
    useEffect(() => {
         getAnime();
    setQuery(name);
    

   }, [comic_types, name, query]);

  return (
    <div>
       {loading && <TopPageSkeleton name="" />}
        {!loading && (

                <HomeDiv>
 
          
  {filteredAnime.map((item, index) => (
      <Wrapper key={index}>
        <Links key={item.id} to={`/id/${item.id}`}>

        <img src={item.thumbnail.url} className="card-img"/>
                            </Links>
        <div className="yawa">
          <span>
            {item.mangaDetails?.status
              ? item.mangaDetails.status.charAt(0).toUpperCase() +
                item.mangaDetails.status.slice(1)
              : 'Unknown'}
          </span>
          <Links key={item.id} to={`/id/${item.id}`}>
            <p>{item.title}</p>
          </Links>
          <span>Author: </span>
          {item.mangaDetails?.authors ? item.mangaDetails.authors[0] : 'Unknown'}
          <p>
            Genres:{' '}
            {item.mangaDetails?.genres
              ? item.mangaDetails.genres.join(', ')
              : 'Unknown'}
          </p>
          {item.mangaDetails?.chapters &&
          item.mangaDetails.chapters.length > 0 && (
            <Links
              key={item.id}
              to={`/read/manga/comick/chapter/${item.mangaDetails.chapters[0].chapterId}`}
              state={{ slug: `${item.mangaDetails.slug}` }}
            >
              <p>Chapter {item.mangaDetails.chapters[0].number}</p>
            </Links>
          )}
        </div>
      </Wrapper>
    ))}
        
        
        </HomeDiv>
                            )}

    </div>
  );
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

const Wrapper = styled.div`
 display: flex;
   align-items: center;
  justify-content: center;
  padding: 0 25px;
  align-items: center;
     height: 250px;
         background: #2f2f2f;
         margin-bottom: 20px;

  @media screen and (max-width: 768px) {
        height: 280px;

  
  }
 .yawa{
 width: calc(100% - 148px);
    float: right;
    position: relative;
    margin-bottom: 50px;
    margin-left: 20px;
    
     
  }
 
  @media screen and (max-width: 992px) {
    
  }
  
  @media screen and (max-width: 768px) {
   
  .yawa{
     margin-bottom: 0;
     
     
  }
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

export default AnimeCards;