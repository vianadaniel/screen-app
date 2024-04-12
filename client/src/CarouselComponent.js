import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Carousel.css';

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8080";

const CarouselComponent = () => {
    const [mediaItems, setMediaItems] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchMediaItems = async () => {
            try {
                const response = await fetch(apiUrl + '/api/listfiles');
                if (!response.ok) {
                    throw new Error('Erro ao buscar mídias');
                }
                const data = await response.json();
                setMediaItems(data.files);
            } catch (error) {
                console.error('Erro ao buscar mídias:', error);
            }
        };
        fetchMediaItems();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % mediaItems.length);
        }, 5000); // Altere o intervalo conforme necessário

        return () => clearInterval(interval);
    }, [mediaItems]);

    return (
        <div className="fullscreen-carousel">
            <Carousel autoPlay interval={5000} infiniteLoop showThumbs={true} selectedItem={currentIndex}>
                {mediaItems.map((media, index) => {
                    const isImage = /\.(png|jpg)$/i.test(media.filename);
                    return (
                        <div key={index}>
                            {isImage ? (
                                <img src={`data:image/png;base64,${media.base64data}`} alt={`Slide ${index}`} />
                            ) : (
                                <video autoPlay loop muted>
                                    <source src={`data:video/mp4;base64,${media.base64data}`} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            )}
                        </div>
                    );
                })}
            </Carousel>
        </div>
    );
};

export default CarouselComponent;
