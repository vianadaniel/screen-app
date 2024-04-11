import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Carousel.css'; // Estilos personalizados

const images = [
    'https://via.placeholder.com/800x400',
    'https://via.placeholder.com/800x400',
    'https://www.youtube.com/watch?v=f08rFTfrHh4',
];

const CarouselComponent = () => {


    return (
        <div className="fullscreen-carousel">
            <Carousel autoPlay infiniteLoop showThumbs={false}>
                {images.map((image, index) => (
                    <div key={index}>
                        <img src={image} alt={`Slide ${index}`} />
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default CarouselComponent;
