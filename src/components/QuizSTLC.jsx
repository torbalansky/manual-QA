import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { QADataSTLC } from '../Data/Data';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { helpModalData } from '../Data/Data'; 
import { BsEmojiSunglasses } from "react-icons/bs";
import { SiGoogletasks } from "react-icons/si";
import { PiPercentFill } from "react-icons/pi";

const ItemType = {
  CARD: 'card',
};

const DraggableCard = ({ card }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType.CARD,
    item: { id: card.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="bg-white border flex justify-center flex-col border-gray-300 p-3 m-2 rounded cursor-pointer shadow"
      style={{
        opacity: isDragging ? 0.5 : 1,
        width: '150px',
        height: '100px',
        textAlign: 'center',
      }}
    >
      <div className="flex justify-center mb-2 text-2xl text-purple-900">{card.data.icon}</div>
      <h4 className="font-poppins text-md">{card.data.title}</h4>
    </div>
  );
};

const DropZone = ({ index, onDrop, currentCard, onReturn }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemType.CARD,
    drop: (item) => onDrop(item, index),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`border-dashed border-2 p-4 m-2 rounded h-32 w-36 flex items-center justify-center ${
        isOver ? 'bg-lime-100' : 'bg-gray-100'
      }`}
    >
      {currentCard ? (
        <div
          className="text-center cursor-pointer"
          onClick={() => onReturn(currentCard, index)}
        >
          <div className="flex justify-center mb-2 text-xl text-purple-900">{currentCard.data.icon}</div>
          <h4 className="text-sm font-bold">{currentCard.data.title}</h4>
          <p className="text-xs text-purple-500">(Click to return)</p>
        </div>
      ) : (
        <p className="text-gray-400">Drop Here</p>
      )}
    </div>
  );
};

const Flow = () => {
  const initialCards = [...QADataSTLC].sort(() => Math.random() - 0.5);

  const [draggableCards, setDraggableCards] = useState(initialCards);
  const [dropZones, setDropZones] = useState(Array(QADataSTLC.length).fill(null));
  const [isTaskCompleted, setIsTaskCompleted] = useState(false);

  const navigate = useNavigate();

  const handleDrop = (item, zoneIndex) => {
    if (dropZones[zoneIndex]) return;

    const card = draggableCards.find((card) => card.id === item.id);

    setDropZones((zones) => {
      const newZones = [...zones];
      newZones[zoneIndex] = card;
      return newZones;
    });
    setDraggableCards((cards) => cards.filter((card) => card.id !== item.id));
  };

  const handleReturn = (card, zoneIndex) => {
    setDraggableCards((cards) => [...cards, card]);
    setDropZones((zones) => {
      const newZones = [...zones];
      newZones[zoneIndex] = null;
      return newZones;
    });
  };

  const validateOrder = () => {
    const currentOrder = dropZones.map((zone) => (zone ? zone.id : null)).join(',');
    const correctOrder = QADataSTLC.map((node) => node.id).join(',');

    if (currentOrder === correctOrder) {
      setIsTaskCompleted(true);
    } else {
      alert('Incorrect Order. Please Try Again.');
    }
  };

  const resetGame = () => {
    setDraggableCards(initialCards);
    setDropZones(Array(QADataSTLC.length).fill(null));
    setIsTaskCompleted(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <DndProvider backend={HTML5Backend}>
      {!isTaskCompleted ? (
        <div className="p-6">
               <h1 className="text-center text-xl md:text-3xl font-bold mb-6 mt-4">Software Test Life Cycle (STLC)</h1>

      <Modal isOpen={isModalOpen} onClose={closeModal} modalData={helpModalData} />

      <h2 className="font-poppins md:px-32 px-8 py-4">
        In this first task, you will need to put in the right order the stages of the STLC. Drag and drop the cards and place them in the fields below. Once you're ready, click the 'Submit Order' button.
        <button
        onClick={openModal}
        className="bg-blue-500 text-slate-100 py-1 px-2 m-2 rounded-md hover:bg-blue-700 transition-all duration-300"
      >
        Need Help?
      </button>
      </h2>
          <div className="flex flex-wrap mb-4 justify-center">
            {draggableCards.map((card) => (
              <DraggableCard key={card.id} card={card} />
            ))}
          </div>

          <div className="flex flex-wrap justify-center">
            {dropZones.map((zone, index) => (
              <DropZone
                key={index}
                index={index}
                onDrop={handleDrop}
                currentCard={zone}
                onReturn={handleReturn}
              />
            ))}
          </div>

          <div className="flex justify-center mb-6 mt-4 gap-4">
            <button
              onClick={validateOrder}
              className="bg-slate-600 text-lime-200 p-2 rounded w-40  hover:bg-lime-300 hover:text-slate-500 transition-all duration-300"
            >
              Submit Order
            </button>
            <button
              onClick={resetGame}
              className="bg-violet-400 text-lime-200 p-2 rounded w-40  hover:bg-pink-400 transition-all duration-300"
            >
              Start Over
            </button>
          </div>
        </div>
      ) : (
        <div className="p-2 text-center mt-8 relative flex flex-col items-center justify-center">
          <h2 className="text-4xl font-bold">Great Job!</h2>
          <p className="text-md text-left p-10 mt-2 w-full font-poppins mb-2">
            You have successfully ordered the 6 phases of STLC! 🎉 Well done on correctly organizing the phases, which are crucial steps in ensuring the quality and reliability of any software product. 
            The Software Testing Life Cycle (STLC) consists of key stages that guide the testing process, from the initial requirements gathering to the final test cycle closure. Each phase plays a vital role in identifying defects, improving quality, and ensuring that the software meets both user expectations and business requirements.
            <br />    <br />
            Here’s a quick overview of the phases you’ve successfully ordered:
            <br />
            1. <strong>Requirements Analysis</strong>: Understanding and documenting the testing requirements to ensure clear goals.
            <br />
            2. <strong>Test Planning</strong>: Planning the testing strategy, resources, and timeline to align with project goals.
            <br />
            3. <strong>Test Case Design</strong>: Creating detailed test cases that cover all possible scenarios, ensuring thorough test coverage.
            <br />
            4. <strong>Environment Setup</strong>: Setting up the testing environment and tools needed for executing tests.
            <br />
            5. <strong>Test Execution</strong>: Running the tests and recording the results, which will help assess the software’s behavior.
            <br />
            6. <strong>Test Cycle Closure</strong>: Closing the testing phase with reports and lessons learned to improve future testing efforts.
          </p>


           {/*<p className="mb-8 text-xl">Chose app you would like to test and click to proceed.</p>*/}
          <div className='flex lg:flex-row justify-center flex-col text-center gap-4 mt-2'>
          <button
              onClick={resetGame}
              className="bg-violet-400 text-lime-200 p-2 rounded w-40  hover:bg-pink-400 transition-all duration-300"
            >
              Go Back
            </button>
          <button
            onClick={() => navigate('/quizprinciples')}
             className="bg-slate-600 text-lime-200 p-2 rounded w-40  hover:bg-lime-300 hover:text-slate-500 transition-all duration-300"
          >
             Next Task
          </button>
          {/* <button
            onClick={() => navigate('/documentation')}
             className="tool-field w-[280px]"
          >
            <PiPercentFill className='h-10 w-20'/> Credit Risk
          </button>
          <button
            onClick={() => navigate('/documentationmood')}
             className="tool-field w-[280px]"
          >
            <BsEmojiSunglasses className='h-10 w-20'/> Mood Tracker
          </button>
          <button
            onClick={() => navigate('/documentationtodo')}
            className="tool-field w-[280px]"
          >
            <SiGoogletasks className='h-10 w-20'/> Task Tracker
          </button>*/}
          </div>
        </div>
      )}
    </DndProvider>
  );
};

export default Flow;
