import Slider from "react-slick";

const Save = ({ attributes }) => {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	return (
		<div className="my-slider">
			<Slider {...settings}>
				{attributes.images.map((image) => (
					<div key={image.id}>
						<img src={image.url} alt={image.alt} />
					</div>
				))}
			</Slider>
		</div>
	);
};

export default Save;
