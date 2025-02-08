import Navbar from "./components/Navbar";
import Chat from "./components/Chat";

const style = {
  appContainer: `max-w-[728px] mx-auto`,
  sectionContainer: `relative mt-10 flex h-[90vh] flex-col border-none bg-gray-100 shadow-xl`,
};
function App() {
  return (
    <div className={style.appContainer}>
      <section className={style.sectionContainer}>
        <Navbar />
        <Chat />
      </section>
    </div>
  );
}

export default App;
