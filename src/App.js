import Gallery from "./components/Gallery";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const imgArr = [
  "https://picsum.photos/id/10/600",
  "https://picsum.photos/id/20/600",
  "https://picsum.photos/id/30/600",
  "https://picsum.photos/id/40/600",
  "https://picsum.photos/id/50/600",
  "https://picsum.photos/id/60/600",
  "https://picsum.photos/id/70/600",
  "https://picsum.photos/id/80/600",
  "https://picsum.photos/id/90/600",
  "https://picsum.photos/id/100/600",
  "https://picsum.photos/id/110/600",
  "https://picsum.photos/id/120/600"
];

function App() {
  return (
    <div className="App">
      <Gallery imgArr={imgArr} magification={2} />
    </div>
  );
}

export default App;
