import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function Reviews() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // for screens smaller than 1024px
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640, // for screens smaller than 640px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className='w-full sm:w-3/4 m-auto'>
      <div className="mb-2 px-4 sm:px-0">
        <Slider {...settings}>
          {data.map((d) => (
            <div key={d.name} className="bg-white mb-4 text-black rounded-xl flex flex-col">
              <div className='h-56 bg-primary flex justify-center items-center rounded-t-xl'>
                <img src={d.img} alt="" className="h-44 w-44 rounded-full"/>
              </div>

              <div className="flex flex-col items-center justify-center flex-1 gap-4 p-4">
                <p className="text-xl font-semibold text-center">{d.name}</p>
                <p className="text-center">{d.review}</p>
                <button className='bg-primary text-white text-lg px-6 py-1 rounded-xl'>Read More</button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

const data = [
  {
    name: `John Morgan`,
    img: `/assets/images/students/John_Morgan.jpg`,
    review: `The Students Scoops web app is a game-changer! It's incredibly user-friendly and has made keeping track of campus events and activities so much easier. The design is sleek and the information is always up-to-date. Highly recommend it to all students!`
  },
  {
    name: `Ellie Anderson`,
    img: `/assets/images/students/Ellie_Anderson.jpg`,
    review: `I love using Students Scoops! This app has a fantastic layout and is very intuitive. It keeps me always informed about all the latest news and events on campus. The review section is particularly helpful for getting honest feedback from fellow students.`
  },
  {
    name: `Nia Adebayo`,
    img: `/assets/images/students/Nia_Adebayo.jpg`,
    review: `Students Scoops is a must-have for every student. The app is well-designed and provides comprehensive information about what's happening on campus. It's helped me stay organized and not miss out on important events. Plus, the user interface is really smooth.`
  },
  {
    name: `Rigo Louie`,
    img: `/assets/images/students/Rigo_Louie.jpg`,
    review: `Using the Students Scoops app has been a great experience. It's incredibly convenient for staying updated on campus activities and events. The app is fast, reliable, and the community reviews are a nice touch. Its definitely a go-to resource for students.`
  },
  {
    name: `Mia Williams`,
    img: `/assets/images/students/Mia_Williams.jpg`,
    review: `Students Scoops is a fantastic app for anyone looking to stay in the loop with campus life. The design is modern and navigation is seamless. I appreciate how easy it is to find relevant information quickly. This app has truly enhanced my student experience!`
  },
];

export default Reviews;
