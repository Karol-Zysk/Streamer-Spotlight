import Layout from "./layout/Layout";
import { Route, Routes } from "react-router-dom";
import Streamers from "./views/Streamers";
import StreamersPage from "./views/StreamersPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Streamers />} />
        <Route path="/:id" element={<StreamersPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
