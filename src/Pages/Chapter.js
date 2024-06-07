import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useLocation, Link  } from "react-router-dom";
import styled from "styled-components";
import Modal from 'react-modal';
  import ChapterSkeleton from "../components/skeletons/ChapterSkeleton";

function Chapter() {
const { chapterId } = useParams(); 
  const location = useLocation();
     const { slug } = useLocation().state || {};
  const [imageSize, setImageSize] = useState('');
  const [error, setError] = useState(null);

  const [currentChapterId, setCurrentChapterId] = useState('');


         const [chapters, setChapters] = useState([]);
const [firstChapterNumber, setFirstChapterNumber] = useState(null);
  const [latestChapterNumber, setLatestChapterNumber] = useState(null);
  const [loading, setLoading] = useState(true);
  const [item, setDetail] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
  const [scrollButtonVisible, setScrollButtonVisible] = useState(false);

  const [selectedChapter, setSelectedChapter] = useState(null);

const handleSizeChange = (e) => {
    setImageSize(parseInt(e.target.value)); // Convert string value to integer
  };
   const openModal = (chapter) => {
    setSelectedChapter(chapter);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedChapter(null);
    setModalIsOpen(false);
  };

  const handleLinkClick = (chapter) => {
  setTimeout(() => {
    openModal(chapter); // Open the modal after a delay
    closeModal(); // Close the modal when the link is clicked
     window.location.href = `/read/manga/comick/chapter/${chapter.chapterId}`; // Navigate to the chapter after a delay
  }, 500); // Adjust the delay as needed
};

  const handleLinkClick2 = (item) => {
  setTimeout(() => {
    openModal(item); // Open the modal after a delay
    closeModal(); // Close the modal when the link is clicked
    
     window.location.href = `/read/manga/comick/chapter/${item.prevId}`; // Navigate to the chapter after a delay
     
  }, 500); // Adjust the delay as needed
};
  const handleLinkClick3 = (item) => {
  setTimeout(() => {
    openModal(item); // Open the modal after a delay
    closeModal(); // Close the modal when the link is clicked
    
     window.location.href = `/read/manga/comick/chapter/${item.nextId}`; // Navigate to the chapter after a delay
     
  }, 500); // Adjust the delay as needed
};
const reverseTitle = (title) => {
  if (title) { // Check if title is defined
    const parts = title.split(' - '); // Split the title into parts using ' - '
    if (parts.length === 2) {
      return `${parts[1]} - ${parts[0]}`; // Rearrange the parts if there are two parts
    }
  }
  return title; // Return the original title if it's not defined or doesn't match the expected format
};

 // Assuming chaptersData is your JSON data containing an array of chapters

// Extract the chapter numbers from the chaptersData array
  const handleScroll = () => {
    // Show scroll button when user scrolls beyond certain threshold
    if (window.pageYOffset > 300) {
      setScrollButtonVisible(true);
    } else {
      setScrollButtonVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling effect
    });
  };

    useEffect(() => {
    // Add event listener to detect scrolling
    window.addEventListener('scroll', handleScroll);

    // Remove event listener when component unmounts
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

// Then, find the maximum chapter number
   const getDetail = async () => {
    setLoading(true);

    try {
const response = await axios.get(`https://manga-roan-one.vercel.app/manga/comick/chapter/${chapterId}`);

      setDetail(response.data);
    } catch (error) {
      console.log("Error getting data: ", error);
    } finally {
      setLoading(false);
    }
   };
  
 
 
  const getChapters = async () => {
              setLoading(true);

    try {
      const response  = await axios.get(`https://manga-roan-one.vercel.app/manga/comick/title/${slug}`);
           
  

              
      setChapters(response.data);
          

           



 
 

                    

    } catch (error) {
      console.log("Error getting data: ", error);
 
      
     }
 
  };
  const getLatestChapter = async () => {
      try {
        const response = await axios.get(`https://manga-roan-one.vercel.app/manga/comick/title/${slug}`);
        console.log('Response:', response.data); // Log the response data

        const title = response.data;

        // Check if chapters array is present and not empty
        if (title && Array.isArray(title.chapters) && title.chapters.length > 0) {
          // Sort chapters by number in ascending order
          title.chapters.sort((a, b) => a.number - b.number);
          // Set the first chapter number
          setFirstChapterNumber(title.chapters[0].number);
          // Set the latest chapter number
          setLatestChapterNumber(title.chapters[title.chapters.length - 1].number);
        } else {
          setFirstChapterNumber('No chapters available');
          setLatestChapterNumber('No chapters available');
        }
      } catch (error) {
        console.log("Error getting data: ", error);
        setFirstChapterNumber('Error fetching chapters');
        setLatestChapterNumber('Error fetching chapters');
      }
    };
 

  useEffect(() => {
    
        getLatestChapter();

    getDetail();
    getChapters();
 }, [chapterId, slug]); // Include chapterUrl in the dependency array

  return (
    <div>
    
               <HomeDiv>
           <div>
      {/* Your existing JSX code */}
      {/* Your existing JSX code */}

      {/* Scroll to top button */}
      {scrollButtonVisible && (
        <ScrollToTopButton onClick={scrollToTop}>
          Scroll To Top
        </ScrollToTopButton>
      )}
    </div>
  <YAWA> 
       <YAWA> 
    {
  item.number !== "1" && item.prevId && (
    <Link
      key={item.id}
      to={`/read/manga/comick/chapter/${item.prevId}`}
      onClick={() => handleLinkClick2(item)}
      state={{ slug }}
    >
      <GAGO>PREV</GAGO>
    </Link>
  )
}

  
</YAWA>
 
    <Dropdown value={imageSize} onChange={handleSizeChange}>
        <option value="" disabled>Zoom Mode</option>
        <option value={25}>25%</option>
        <option value={50}>50%</option>
        <option value={75}>75%</option>
        <option value={100}>100%</option>
      </Dropdown>
      
     <Link key={item.id} to={`/id/${chapters.slug}`}>

          <GAGO2>{reverseTitle(item.title)}</GAGO2>
   </Link>
    <GAGO onClick={() => openModal(item.chapter)}>
      Chapter {item.number}
  </GAGO>
  
  <StyledModal
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  chapter={selectedChapter}
    style={customStyles}

  // Add other modal props as needed
>
    <CloseButton onClick={closeModal}>&times;</CloseButton>
  
{chapters.chapters && (
  <StyledUl>
    {chapters.chapters.map((chapter) => (
      <StyledLi key={chapter.id}>
        <div key={chapter.id}>
          {/* Log the extracted values for debugging */}
          <Link
            key={chapter.id}
            to={`/read/manga/comick/chapter/${chapter.chapterId}`}
            onClick={() => handleLinkClick(chapter)}
            state={{ slug: `${slug}` }}
          >
            Chapter {chapter.number}
          </Link>
        </div>
      </StyledLi>
    ))}
  </StyledUl>
)}
 
    </StyledModal>
      {/* Add other details as needed */}
    
<YAWA> 
 {latestChapterNumber !== null && (
    item.number !== latestChapterNumber && item.nextId && (
      <Link
        key={item.id}
        to={`/read/manga/comick/chapter/${item.nextId}`}
        onClick={() => handleLinkClick3(item)}
        state={{ slug }}
      >
        <GAGO>NEXT</GAGO>
      </Link>
    )
  )}
  </YAWA>
     </YAWA>
          {loading && <ChapterSkeleton name="" />}
        {!loading && (
      <div>
      
    {item.images && (
            <Chapters imageSize={imageSize}>
      {item.images.map((image, index) => (
        <img key={index} src={image.image} alt={image.name} />
              ))}
            </Chapters>
          )}
  
</div>
                    )}

    <YAWA>
     {
  item.number !== "1" && item.prevId && (
    <Link
      key={item.id}
      to={`/read/manga/comick/chapter/${item.prevId}`}
      onClick={() => handleLinkClick2(item)}
      state={{ slug }}
    >
      <GAGO>PREV</GAGO>
    </Link>
  )
}
      
    <Dropdown value={imageSize} onChange={handleSizeChange}>
        <option value="" disabled>Zoom Mode</option>
        <option value={25}>25%</option>
        <option value={50}>50%</option>
        <option value={75}>75%</option>
        <option value={100}>100%</option>
      </Dropdown>
<Link key={item.id} to={`/id/${chapters.slug}`}>

          <GAGO2>{reverseTitle(item.title)}</GAGO2>
   </Link>
   <GAGO onClick={() => openModal(item.chapter)}>
      Chapter {item.number}
  </GAGO>
  <StyledModal
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  chapter={selectedChapter}
    style={customStyles}

  // Add other modal props as needed
>
    <CloseButton onClick={closeModal}>&times;</CloseButton>
  
{chapters.chapters && (
  <StyledUl>
    {chapters.chapters.map((chapter) => (
      <StyledLi key={chapter.id}>
        <div key={chapter.id}>
          {/* Log the extracted values for debugging */}
          <Link
            key={chapter.id}
            to={`/read/manga/comick/chapter/${chapter.chapterId}`}
            onClick={() => handleLinkClick(chapter)}
            state={{ slug: `${slug}` }}
          >
            Chapter {chapter.number}
          </Link>
        </div>
      </StyledLi>
    ))}
  </StyledUl>
)}
 
    </StyledModal>
     {latestChapterNumber !== null && (
    item.number !== latestChapterNumber && item.nextId && (
      <Link
        key={item.id}
        to={`/read/manga/comick/chapter/${item.nextId}`}
        onClick={() => handleLinkClick3(item)}
        state={{ slug }}
      >
        <GAGO>NEXT</GAGO>
      </Link>
    )
  )}
    </YAWA>
 </HomeDiv>
       </div>
  );
}
const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  z-index: 9999;

  &:hover {
    background-color: #0056b3;
  }
`;
const HomeDiv = styled.div`
margin: 1.5rem 5rem 1rem 5rem;
  display: flex;
  flex-direction: column; /* Optional: Adjust if you want it to behave differently */
  justify-content: center; /* Center vertically */
  align-items: center; 
  @media screen and (max-width: 600px) {
    margin: 1rem;
  }
`;
const StyledUl = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  margin-top: 80px;
  overflow-y: auto; /* Hide vertical overflow */
  max-height: 500px; /* Set maximum height */
 `;

 const StyledLi = styled.li`
  width: 30%;
  margin-bottom: 16px;
  color: black !important;
 margin-top: 10px;
`;  

const YAWA = styled.div`
 display: flex;
 flex-wrap: wrap;
 justify-content: Center;
`;

const StyledModal = styled(Modal)`
 background-color: #fff;
 max-width: 900px;
   margin: auto; /* Center the modal content horizontally */
  `;
 const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)', // Set your custom background color and opacity
  },
  // Add other styles for the modal content if needed
};

  const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #000; // Adjust color as needed
`;
const GAGO = styled.button`
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
 
   
    &:hover {
background: rgb(28, 31, 30);    
color: #fff;  
    }
    @media screen and (max-width: 600px) {
   margin-right: 0;
  }
  
`;
const GAGO2 = styled.button`
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
      overflow: hidden;
  text-overflow: ellipsis;
   width: 450px; 

   
    &:hover {
background: rgb(28, 31, 30);    
color: #fff;  
    }
    @media screen and (max-width: 600px) {
   margin-right: 0;
      width: 375px; 

  }
  
`;
const Chapters = styled.div`
 display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  img{
    width: ${({ imageSize }) => `${imageSize}%`}; /* Apply the width based on imageSize state */
  height: 100%;
 }
  @media screen and (max-width: 600px) {
   
    img{
        width: 100%;

    }
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
export default Chapter;
