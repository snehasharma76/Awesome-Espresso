import { useEffect } from 'react';
import RoadmapSection from './components/RoadmapSection';
import PopupModal from './components/PopupModal';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import ErrorScreen from './components/ErrorScreen';
import EspressoIntro from './components/EspressoIntro';
import useStore from './store/useStore';

// Import styles
import './styles/navigation.css';
import './components/styles/espressoIntro.css';

function App() {
  // Get state and actions from our centralized store
  const { 
    data, 
    loading, 
    error, 
    setData, 
    setError 
  } = useStore();



  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/data.json');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchData();
  }, [setData, setError]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen message={error} onRetry={() => window.location.reload()} />;
  }

  return (
    <div className="app">
      <Header 
        title={data.title} 
        description={data.description} 
      />

      {/* Espresso Introduction Section */}
      <EspressoIntro />

      <div className="sticky-container">
        <Navigation sections={data.sections} />
      </div>

      <main className="roadmap-container">
        <div className="roadmap-connector"></div>
        
        {data.sections.map((section, index) => (
          <RoadmapSection 
            key={section.id}
            section={section}
            index={index}
            nextSection={index < data.sections.length - 1 ? data.sections[index + 1] : null}
          />
        ))}
      </main>

      <Footer />

      <PopupModal />
    </div>
  );
}

export default App;
