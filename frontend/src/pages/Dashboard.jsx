// frontend/src/pages/Dashboard.jsx
import Navbar from '../components/Navbar';
import KanbanBoard from '../components/KanbanBoard';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto py-6">
        <KanbanBoard />
      </div>
    </div>
  );
};

export default Dashboard;