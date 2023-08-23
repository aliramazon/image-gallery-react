import { useEffect, useState } from "react";

/*
  Photo gallery:
  
  Create a photo gallery app which displays a grid
  of photo thumbnails (300px * 200px) with a 
  "load more" button to fetch another batch of
  photos. 

  The photo grid should be responsive with 20px
  of padding/gap between each element.
  
  Clicking a photo should display a full
  resolution version.

  - Lorem Picsum API
    - List API
      https://picsum.photos/v2/list?page=1&limit=10

    - Image URL pattern
      https://picsum.photos/id/{id}/{width}/{height}

      Example:
      https://picsum.photos/id/237/300/200

*/

class API {
    async fetchImages(page) {
        try {
            const result = await fetch(
                `https://picsum.photos/v2/list?page=${page}&limit=10`
            );
            return result.json();
        } catch (error) {
            throw Error("Some Error");
        }
    }
}

const api = new API();

export default function App() {
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    const [show, setShow] = useState(false);
    const [zoomedInImg, setZoomedInImg] = useState({});

    useEffect(() => {
        const fetch = async () => {
            const result = await api.fetchImages(page);
            setImages((prevImages) => [...prevImages, ...result]);
        };
        fetch();
    }, [page]);

    const handleLoadMore = () => {
        setPage(page + 1);
    };

    const handleZoomIn = (img) => {
        setShow(true);
        setZoomedInImg(img);
    };

    const hideLightbox = () => {
        setShow(false);
    };

    return (
        <div className="App">
            <h1>Gallery App</h1>
            <h2>Let's build the next Instagram! (sort of)</h2>

            <div className="gallery">
                {images.map((img) => {
                    return (
                        <div className="gallery__imageWrapper" key={img.id}>
                            <img
                                src={`https://picsum.photos/id/${img.id}/300/200`}
                                alt={img.name}
                                onClick={() => handleZoomIn(img)}
                            />
                        </div>
                    );
                })}
            </div>
            <div>
                <button className="loadMoreButton" onClick={handleLoadMore}>
                    Load More
                </button>
            </div>
            {show && (
                <div className="lightbox">
                    <span
                        onClick={hideLightbox}
                        className="lightbox__closeIcon"
                    >
                        &#10005;
                    </span>
                    <img
                        src={zoomedInImg.download_url}
                        alt={zoomedInImg.name}
                    />
                </div>
            )}
        </div>
    );
}
