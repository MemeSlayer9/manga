import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

   import TopPageSkeleton from "../components/skeletons/TopPageSkeleton";

function AnimeCards() {
  
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
     let url;
        if (comic_types === 'all') {
          url = `https://manga-roan-one.vercel.app/manga/comick/top?`;
        } else {
          url = `https://manga-roan-one.vercel.app/manga/comick/top?comic_types=${comic_types}`;
        }
       const { data } = await axios.get(url);


        console.log(`https://manga-roan-one.vercel.app/manga/comick/top?${comic_types}`);
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

   }, [comic_types]);

  return (
    <div>
       {loading && <TopPageSkeleton name="" />}
        {!loading && (

                <HomeDiv>

       <Heading>
                 <Dropdown id="status-select" value={comic_types} onChange={handleTypeChange}>
          {Types.map((TypeOption) => (
            <option key={TypeOption.value} value={TypeOption.value}>
              {TypeOption.label}
            </option>
          ))}
       
        </Dropdown>
             <input
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
            </Heading>
   {filteredAnime.map((item, index) => (
    <Wrapper key={index} className="projcard projcard-blue">
      <div className="projcard-innerbox">
        <Links to={`/id/${item.id}`}>
          <img src={item.thumbnail.url} className="projcard-img card-img" />
        </Links>
        <div className="yawa">
          <div className="projcard-title">
            <Links to={`/id/${item.id}`}>
              {item.title}
            </Links>
          </div>
          <div className="projcard-subtitle">
            <span>
              {item.mangaDetails?.status
                ? item.mangaDetails.status.charAt(0).toUpperCase() +
                  item.mangaDetails.status.slice(1)
                : 'Unknown'}
            </span>
            <span> | Author: </span>
            {item.mangaDetails?.authors ? item.mangaDetails.authors[0] : 'Unknown'}
          </div>
          <div className="projcard-description">
            Genres: {item.mangaDetails?.genres ? item.mangaDetails.genres.slice(0, 3).join(', ') : 'Unknown'}
          </div>
          {item.mangaDetails?.chapters &&
          item.mangaDetails.chapters.length > 0 && (
            <Links
              to={`/read/manga/comick/chapter/${item.mangaDetails.chapters[0].chapterId}`}
              state={{ slug: `${item.mangaDetails.slug}` }}
            >
              <p className="projcard-description">Chapter {item.mangaDetails.chapters[0].number}</p>
            </Links>
          )}
          
        </div>
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
  position: relative;
  width: 100%;
  height: 300px;
  margin-bottom: 40px;
  border-radius: 10px;
    background: #2f2f2f;
   font-size: 18px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 4px 21px -12px rgba(0, 0, 0, 0.66);
  transition: box-shadow 0.2s ease, transform 0.2s ease;

  :hover {
    box-shadow: 0 34px 32px -33px rgba(0, 0, 0, 0.18);
    transform: translate(0px, -3px);
  }

  ::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: linear-gradient(-70deg, #424242, transparent 50%);
    opacity: 0.07;
  }

  .projcard-innerbox {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .projcard-img {
    position: absolute;
    width: 200px;
    height: 300px;
    top: 0;
    left: 0;
    transition: transform 0.2s ease;
  }

  :hover .projcard-img {
    transform: scale(1.05) rotate(1deg);
  }

  .yawa {
    position: absolute;
    top: 7%;
    bottom: 7%;
    left: 210px;
     font-size: 17px;
  }
   @media screen and (max-width: 600px) {
     .yawa{
    left: 210px;

     }
    }

  .projcard-description {
    z-index: 10;
    font-size: 15px;
    color: #fff;
     overflow: hidden;
    text-overflow: ellipsis;
  }

  .projcard-tagbox button {
    bottom: 3%;
    font-size: 25px;
    cursor: default;
    user-select: none;
    padding: 10px 20px;
    border-radius: 25px;
    text-decoration: none;
    border: none;
    outline: none;
    background: purple;
    box-shadow: 0 4px 21px -12px rgba(0, 0, 0, 0.66);
    transition: box-shadow 0.2s ease, transform 0.2s ease;
  }

  .projcard-tagbox a {
    text-decoration: none;
    color: #ddd;
  }

  .projcard-title {
    font-family: 'Voces', 'Open Sans', arial, sans-serif;
    font-size: 24px;
    color: #fff;
  }

  .projcard-subtitle {
    font-family: 'Voces', 'Open Sans', arial, sans-serif;
    color: #fff;
  }
`;
const Links = styled(Link)`
  text-decoration: none;
  color: white;
    :hover{
    color:#FFFF66;
  }
   
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