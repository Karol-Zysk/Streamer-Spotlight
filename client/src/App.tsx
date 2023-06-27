import Layout from "./layout/Layout";
import { Route, Routes } from "react-router-dom";
import Streamers from "./views/Streamers";
import StreamerPage from "./views/StreamerPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Streamers />} />
        <Route path="/:id" element={<StreamerPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
