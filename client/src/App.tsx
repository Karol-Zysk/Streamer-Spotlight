import Layout from "./layout/Layout";
import { Route, Routes } from "react-router-dom";
import { NotFound, StreamerPage, Streamers } from "./pages";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Streamers />} />
        <Route path="/streamers" element={<Streamers />} />
        <Route path="/streamers/:id" element={<StreamerPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
