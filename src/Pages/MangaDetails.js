import React, { useEffect, useState } from "react";
import axios from "axios";
  import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import SearchResultsSkeleton from "../components/skeletons/SearchResultsSkeleton";

function MangaDetails() {
      const { slug } = useParams();
    const {url} = useParams();
      const [loading, setLoading] = useState(true);
    const [item, setDetail] = useState([]);
        const [chapters, setChapters] = useState([]);
  const [selectedProviderId, setSelectedProviderId] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

const ProviderSelector = ({ providerIds, onSelect }) => (
  <select onChange={(e) => onSelect(e.target.value)}>
    {providerIds.map(providerId => (
      <option key={providerId} value={providerId}>{providerId}</option>
    ))}
  </select>
);

    const countryLabelMap = {
    kr: "MANWHA",
    jp: "MANGA",
    cn: "MANHUA"
  };


 const handleRecommendationClick = (recommendations) => {
    setIsLoading(true); // Set loading state to true when the link is clicked

    // Simulate a delay, replace this with your actual data fetching logic
    setTimeout(() => {
      setIsLoading(false); // Set loading state to false after data is fetched
        window.location.href = `/id/${recommendations.slug}`; // Navigate to the chapter after a delay

    }, 500); // Adjust the delay as needed
  };
const formatDate = ({ year, month, day }) => {
    // Adjust month to be 0-indexed (i.e., January is 0)
    const date = new Date(year, month - 1, day);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
};
  

 
  const handleShowMore = () => {
    setShowMore(true);
  };
    const getDetail = async () => {
              setLoading(true);

    try {
      const response  = await axios.get(`https://manga-api.vercel.app/manga/comick/title/${slug}`);
           
  

              
      setDetail(response.data);
      
           



 
 

             console.log(`https://manga-roan-one.vercel.app/manga/comick/title/${slug}`); 
                   

    } catch (error) {
      console.log("Error getting data: ", error);
 
      
     }
 
  };
   
  
  useEffect(() => {
  getDetail();
 }, [slug]);
  return (
    <div>
 
        
                  <HomeDiv>
                   <Hello> 
       {item && item.thumbnail && (
        <Banner src={item.thumbnail.url} alt="Thumbnail" />
      )}   
              </Hello>
    <Details> 
      
 <Poster> 

{item && item.thumbnail && (
        <img src={item.thumbnail.url} alt="Thumbnail" />
      )}   
      </Poster>
      <div> 
        
    <h1>{item.title}</h1>
    <p className="green capSize noMargin" align="center">
                <span> Rank: </span>{item.follow_rank}
                </p>
                 <p className="green capSize noMargin" align="center">
                <span> Type: </span>{countryLabelMap[item.country] || item.country}
                </p>
 <p className="green capSize noMargin" align="center">
<span>Author: </span>

{item.authors && item.authors.length > 0 ? item.authors.map(author => author.name).join(', ') : 'Unknown'}
</p>

<p className="green capSize noMargin" align="center">
                <span> Year: </span>{item.year}
                </p>
         <p className="green capSize noMargin" align="center">
  <span>Genres: </span>{item.genres ? item.genres.join(", ") : 'Unknown'}
</p>

  <p className="green capSize noMargin" align="center">
                <span> Status: </span>{item.status}
                </p>
  <p className="green capSize noMargin" align="center">
                <span> Description: </span>{item.description}
                </p>
                        </div>
       </Details>
{item.chapters && item.chapters.length > 0 && (
  <h1>Chapters</h1>
)}  

 {item.chapters && (
  <Chapters>
    {item.chapters.map((chapter) => {
    

      return (
 
        <li key={chapter.id}>
             {/* Log the extracted values for debugging */}
        
             <Links key={chapter.id} to={`/read/manga/comick/chapter/${chapter.chapterId}`}
                                                 state={{ slug: `${slug}` }}>
                      <OGAG> 
                           <p>Chapter {chapter.number}</p>
<p>{formatDate(chapter.date)}</p>
            </OGAG>
            </Links>
         </li>
       );
    })}
  </Chapters>
)}
{item.recommendations && item.recommendations.length > 0 && (
  <h1>Related Manga:</h1>
)}

      
       {item.recommendations && (
  <Recommendation>
    {item.recommendations.map((recommendations) => {
    

      return (
  
        <div key={recommendations.id}>
         
                 <Links key={item.id} to={`/id/${recommendations.slug}`}
                               onClick={() => handleRecommendationClick(recommendations)}
              style={{ pointerEvents: isLoading ? 'none' : 'auto' }} // Disable the link when loading

                 > 
 
                        <img className="card-img" 
              src={recommendations.thumbnail.url}
             />
                   <ItemHead> 
                            <p>{recommendations.title}</p>
                            </ItemHead>
              </Links>
          </div>
       );
    })}
  </Recommendation>
  
)}



</HomeDiv>
 
     </div>
  )
}

const Hello = styled.div`
position: relative;
   width: 100%;
  height: 58%;
  bottom: 0;
  left: 0;
   margin-bottom: -0.2rem;
  background: linear-gradient(to bottom, rgba(22, 22, 22, -0.7) 80%, rgba(22, 22, 22, 1.3) 100%, #161616 100%);  
 
  @media screen and (max-width: 600px) {
    height: 30%;
     background: linear-gradient(to bottom, rgba(22, 22, 22, -0.7) 60%, rgba(22, 22, 22, 1.3) 100%, #161616 100%);  
     
  }

  /* Additional background to top gradient */
   &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    
       background: linear-gradient(to right, rgba(22, 22, 22, -0.7) 90%, rgb(14, 23, 38) 100%, #161616 100%),
                       linear-gradient(to top, rgba(22, 22, 22, -0.7) 90%, rgb(14, 23, 38) 100%, #161616 100%),

                linear-gradient(to bottom, rgba(22, 22, 22, -0.7) 60%, rgb(14, 23, 38) 100%, #161616 100%),
                linear-gradient(to left, rgba(22, 22, 22, -0.7) 90%, rgb(14, 23, 38) 100%, #161616 100%);

              
    /* Add left, right, and top gradients */
      
}

`;

  const Banner = styled.img`
  width: 100%;
  height: 20rem;
  object-fit: cover;
  border-radius: 0.7rem;

@media screen and (max-width: 1800px) {
    display: none;
  }
@media screen and (max-width: 1000px) {
        display: block;

  }
`;
const HomeDiv = styled.div`
  margin: 1.5rem 5rem 1rem 5rem;
  @media screen and (max-width: 600px) {
    margin: 1rem 1rem 0rem 1rem;
  }
`;
const Details = styled.div`
   display: flex;
   div > * {
    margin-bottom: 0.6rem;
  }

  div {
    margin: 1rem;
    font-size: 1rem;
    color: #b5c3de;
    span {
      font-weight: 700;
      color: white;
      
    }
    p {
      font-weight: 300;
      text-align: justify;
    }
    h1 {
      font-weight: 700;
      color: white;
    }
    h3 {
      font-weight: 500;
    }
    button {
      display: none;
    }
     .desc{
          overflow: hidden;
  text-overflow: ellipsis;
   width: 1000px; 
  }
  }
  @media screen and (max-width: 1300px) {
    
    
    
     
     
        .desc{
          overflow: hidden;
  text-overflow: ellipsis;
   width: 500px !important; 
  }
    } 
    @media screen and (max-width: 800px) {
    
    
    
     
     
        .desc{
          overflow: hidden;
  text-overflow: ellipsis;
   width: 400px !important; 
  }
    } 
   @media screen and (max-width: 700px) {
    display: flex;
    flex-direction: column;
    padding: 0;
    div {
      margin: 1rem;
      margin-bottom: 0.2rem;
      h1 {
        font-size: 1.6rem;
      }
      p {
        font-size: 1rem;
      }
      button {
        display: inline;
        border: none;
        outline: none;
        background-color: transparent;
        text-decoration: underline;
        font-weight: 700;
        font-size: 1rem;
        color: white;
      }
        .desc{
          overflow: hidden;
  text-overflow: ellipsis;
   width: 400px; 
  }
    }
  }
`;

const Poster = styled.div`
display: flex;
flex-direction: column;
img {
width: 220px;
height: 300px;
border-radius: 0.5rem;
  
margin-bottom: 2rem;
position: relative;
 filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5));
}
@media screen and (max-width: 1000px) {
img {
display: none;
}
}
`;
const Chapters = styled.ul`
   list-style: none;
 display: flex;
     background: #182335;
border: 1px solid rgba(0, 0, 0, .125);
 overflow: auto;
    max-height: 500px;
  border-radius: 0.7rem;
flex-direction: column;
   justify-content: space-between;
   padding: 10px;
   margin-bottom: 30px;
   margin-top: 20px;
  p{
    color: #fff;
    
   }
 div{
    display: flex;
   justify-content: space-between;
      padding: 10px;

  &:hover {
background: rgb(28, 31, 30);    
color: #fff;  

    }

}
`;
const Links = styled(Link)`
  text-decoration: none;
       
`;
const OGAG = styled.div`

`;

const Recommendation = styled.div`
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

export default MangaDetails                     