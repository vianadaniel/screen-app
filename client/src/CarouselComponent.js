
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Carousel.css';
import React, { useState, useEffect } from 'react';
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8080"

const CarouselComponent = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch(apiUrl + '/api/listfiles');
                if (!response.ok) {
                    throw new Error('Erro ao buscar imagens');
                }
                const data = await response.json();
                setImages(data.files.map(file => file.base64data));
            } catch (error) {
                console.error('Erro ao buscar imagens:', error);
            }
        };
        fetchImages();
    }, []);

    return (
        <div className="fullscreen-carousel">
            <Carousel autoPlay infiniteLoop showThumbs={true}>
                {images.map((image, index) => (
                    <div key={index}>
                        <img src={`data:image/png;base64,${image}`} alt={`Slide ${index}`} />
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default CarouselComponent;
