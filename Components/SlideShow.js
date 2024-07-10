// CarouselComponent.js
"use client"
import React from "react";
//These are Third party packages for smooth slideshow
import { Zoom } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { ArrowLeftIcon,ArrowRightIcon } from '@heroicons/react/24/solid'

const Slideshow = () => {
	//Array of Images
	const images = [
		"/assets/Image1.jpg",
		"/assets/Image2.jpg",
		"/assets/Image3.jpg",
	];

	//These are custom properties for zoom effect while slide-show
	const zoomInProperties = {
		scale: 1,
		duration: 5000,
		transitionDuration: 300,
		infinite: true,
		prevArrow: (
			<div className="ml-10 top-40 md:top-72">
				<ArrowLeftIcon className="h-8 w-8 text-orange-400 cursor-pointer" />
			</div>
		),
		nextArrow: (
				<div className="mr-10 top-40 md:top-72">
				   <ArrowRightIcon className="h-8 w-8  text-orange-400 cursor-pointer" />
			    </div>
		),
	};
	return (
		<div className="w-full h-screen">
			<Zoom {...zoomInProperties}>
				{images.map((each, index) => (
					<div key={index} className="flex justify-center md:items-center items-start w-screen h-screen relative">
						<img
							className="w-screen"
							src={each}
						/>
                        
					</div>
				))}
			</Zoom>
		</div>
	);
};

export default Slideshow;