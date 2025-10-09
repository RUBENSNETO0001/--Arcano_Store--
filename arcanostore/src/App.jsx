import Header from './componentes_principais/Navbar';
import Footer from './componentes_principais/Footer';
// import Main from './componetes_secundarios/Main_home';
import Mains from './componetes_secundarios/Main_sobre';

function App() {
  return (
    <div className="body">
      <Header/>
      <Mains/>
      <Footer/>
    </div>
  );
}

export default App;