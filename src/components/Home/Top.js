import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import AnimeCardsSkeleton from "../../components/skeletons/AnimeCardsSkeleton";
      import { idToData, idToImageUrl, idToImageUrl2, idToid } from '../../providers/imageMappings'; // Update the import path as needed

import "swiper/css";
import "swiper/css/scrollbar";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import "swiper/css/navigation";

function AnimeCards() {
  
  const [loading, setLoading] = useState(true);
   const [anime, setAnime] = useState({});

   const { height, width } = useWindowDimensions();

  const updatedImageUrl = {
  ...idToid,
 };




 
  
const getAnime = async (id = 1) => {
  try {
    setLoading(true);
    const response = await axios.get(
      `https://manga2-six.vercel.app/manga/comick/top`
    );

    // Check if the response data contains the expected structure
    if (response.data && Array.isArray(response.data.results)) {
      const mangaList = response.data.results;

      // Iterate over each manga in the list and fetch additional details
      const mangaWithDetails = await Promise.all(
        mangaList.map(async (manga) => {
          try {
            const { data: mangaDetails } = await axios.get(
              `https://manga2-six.vercel.app/manga/comick/title/${manga.id}`
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
      console.error('Response data does not contain the expected structure:', response.data);
      setLoading(false);
    }
  } catch (err) {
    console.error(err);
    setLoading(false);
  }
};

  
  

  
    useEffect(() => {
         getAnime();

   }, []);

  return (
    <div>

    <HomeDiv> 
      {loading && <AnimeCardsSkeleton />}
      {!loading && (
        <Swiper
          slidesPerView={3}
          spaceBetween={35}
         loop={true}
        navigation={true}
        autoplay={{
          delay: 4000000,
          disableOnInteraction: false,
        }}
          breakpoints={{
            "@0.00": {
              slidesPerView: 1,
              spaceBetween: 15,
            },
            "@0.75": {
              slidesPerView: 1,
              spaceBetween: 20,
            },
           
              "@1.25": {
              slidesPerView: 2,
              spaceBetween: 35,
            },
             
           
           
            "@2.00": {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
          modules={[Scrollbar, Navigation, Autoplay]}
          className="mySwiper"
        >
        
{anime.results?.map(item => (
  <SwiperSlide key={updatedImageUrl[item.id] || item.id}>
    <Wrapper   className="projcard projcard-blue">
      
        <div className="yawa">
        <div className="gondar"> 
           <div className="projcard-title">
            <Links to={`/id/${item.id}`}>
              {item.title}
            </Links>
          </div>
          <div className="projcard-subtitle">
            <p>
              {item.mangaDetails?.status
                ? item.mangaDetails.status.charAt(0).toUpperCase() +
                  item.mangaDetails.status.slice(1)
                : 'Unknown'}
            </p>
           
            <span> Author: {item.mangaDetails?.authors ? item.mangaDetails.authors[0] : 'Unknown'}</span> 
          </div>
          <div className="projcard-description">
           {item.mangaDetails?.genres ? item.mangaDetails.genres.slice(0, 3).join(', ') : 'Unknown'}
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
           <div className="projcard-innerbox">
        <Links to={`/id/${item.id}`}>
          <img src={item.thumbnail.url} className="projcard-img card-img" />
        </Links>
          
        </div>
      </div>
    </Wrapper>
  </SwiperSlide>
))}
        
        
        </Swiper>
      )}
      
        
        </HomeDiv>
    </div>
  );
}

const HomeDiv = styled.div`
 
    margin-Top: 20px;

`;
const Wrapper = styled.div`
  height:300px;
  width: 100%;

   .yawa{
     display:flex;
    border-radius:.5rem;
    position:relative;
    transition:border .3s,background .3s,box-shadow .3s;
  background: #182335;
    border:0;
    margin:.7rem;
    overflow:hidden;
    border:1px solid #1e2c43;
    cursor:pointer
   }
   .yawa:before{
     position:absolute;
    content:"";
    display:block;
    width:.2rem;
    top:0;
    height:100%;
    background:#8bbadd;
   }
 .gondar{
  padding:1.5rem;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    position:relative;
    width:100%;
    overflow:hidden
 }

  .projcard-img {
        flex-shrink:0;
        width:10.8rem;
         
        position:relative;
        border-radius:0;
        transform:rotate(16deg) scale(1.2) translate(1.4rem,.3rem);
        transition:transform .2s,opacity .2s;
        opacity:.6
  }

  :hover .projcard-img {
       transform:rotate(0) scale(1) translate(0,0);
    opacity:1
   }

   @media screen and (max-width: 500px) {
     .projcard-img {
        
        width:8.8rem;
      
       }
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
    @media screen and (max-width: 500px) {
     .projcard-title {
        
          white-space: nowrap; 
  width: 150px; 
  overflow: hidden;
  text-overflow: ellipsis; 
       
       }
    }

  .projcard-subtitle {
    font-family: 'Voces', 'Open Sans', arial, sans-serif;
    color: #fff;
  }
`;


const Links = styled(Link)`
  text-decoration: none;
  color: white;
    font-size: 1.2rem;
    font-weight: bold;

   
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