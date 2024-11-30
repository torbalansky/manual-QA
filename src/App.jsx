import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Contact from './components/Contact';
import Home from './components/Home';
import Quiz from './components/QuizSTLC';
import QuizP from './components/QuizPrinciples';
import { Element } from 'react-scroll';
import Aos from 'aos';
import 'aos/dist/aos.css';
import MoodTracker from './components/MoodTracker';
import AgeCategoryEstimator from './components/AgeEstimator';
import Success from './components/success';
import BugReport from './components/BugReport';
import AgeCategoryEstimatorV from './components/AgeEstimatorFix';
import SuccessFix from './components/successfix';
import Creditrisk from './components/Creditrisk';
import SuccessCredit from './components/successcredit';
import Metrics from './components/metrics';
import GeneralQuiz from './components/GeneralQuiz';

const App = () => {
  useEffect(() => {
    Aos.init({
      offset: 100,
      duration: 700,
      easing: 'ease-in',
      delay: 100,
      once: true,
      mirror: false,
    });

    return () => {
      Aos.refresh();
    };
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Element name="home">
                <Home />
              </Element>
            </>
          }
        />
        <Route path="/quizstlc" element={<Quiz />} />
        <Route path="/quizprinciples" element={<QuizP />} />
        <Route path="/ageestimator" element={<AgeCategoryEstimator />} />
        <Route path="/mood" element={<MoodTracker />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/success" element={<Success />} />
        <Route path="/successfix" element={<SuccessFix />} />
        <Route path="/successcredit" element={<SuccessCredit />} />
        <Route path="/bugreport" element={<BugReport />} />
        <Route path="/ageestimatorv" element={<AgeCategoryEstimatorV />} />
        <Route path="/creditrisk" element={<Creditrisk />} />
        <Route path="/metrics" element={<Metrics />} />
        <Route path="/morequiza" element={<GeneralQuiz />} />

      </Routes>
    </Router>
  );
};

export default App;
