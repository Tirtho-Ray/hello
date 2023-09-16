import { useEffect, useState } from "react";

const Card = () => {
  const [card, setCard] = useState([]);
  const [selectedTitles, setSelectedTitles] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    fetch('card.json')
      .then(res => res.json())
      .then(data => setCard(data))
  }, []);
// click button for all cards
  const handleButtonClick = (title, price, time) => {
    if (selectedTitles.includes(title)) {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } else {
      const newTotalTime = totalTime + time;

      // Check if the new total time is greater than or equal to 0 and does not exceed 20
      if (newTotalTime >= 0 && newTotalTime <= 20) {
        setSelectedTitles([...selectedTitles, title]);
        setTotalPrice(totalPrice + price);
        setTotalTime(newTotalTime);
      } else {
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      }
    }
  };

  return (
    <div>
        <h1 className="text-center text-3xl font-bold mt-12">Course Registration</h1>
        <div className="flex">
      <div className="grid grid-cols-3 mx-auto max-w-screen-lg gap-4 mt-20">
        {/* using map function */}
        {card.map((cardItem) => (
          <div className="h-[330px] w-[250px] bg-slate-200 shadow-md rounded-lg" key={cardItem.id}>
            <div className="p-4">
              <img src={cardItem.cover_picture} alt={cardItem.title} />
              <h1 className="text-[17px] font-bold">{cardItem.title}</h1>
              <h1>{cardItem.bio}</h1>
              <div className="flex justify-evenly">
                <p>$</p>
                <p>Price: {cardItem.price}$</p>
                <p>&</p>
                <p>Time: {cardItem.time}hr</p>
              </div>
              <button
                className="px-[70px] py-1 rounded-2xl bg-blue-700"
                onClick={() => handleButtonClick(cardItem.title, cardItem.price, cardItem.time)}
              >
                Click me
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* update card */}
      <div className="h-[330px] w-[250px] bg-[rgba(255, 255, 255, 1)] rounded-lg mt-20 p-4 shadow-md">
        <h1>Time Hour Remaining: {Math.max(20 - totalTime, 0)} hr</h1>
        <p className="h-[1px] w-full bg-black mt-3"></p>
        <p className="font-bold text-xl">Course Name</p>
        <div>
        <ol>
            {selectedTitles.map((title, index) => (
                <li key={index}>{index + 1}. {title}</li>
            ))}
            </ol>
        </div>
        <p className="h-[1px] w-full bg-black mt-3"></p>
        <p>Total Time Hour: {totalTime} hr</p>
        <p className="h-[1px] w-full bg-black mt-3"></p>
        <p>Total Price: ${totalPrice}</p>
      </div>
      {showToast && (
        <div className="toast">
          <p>You already clicked this card or reached 0 remaining time!</p>
        </div>
      )}
    </div>
    </div>
  );
};

export default Card;
