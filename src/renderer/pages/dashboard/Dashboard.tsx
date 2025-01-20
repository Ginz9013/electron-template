import CenterLayout from '@/src/renderer/components/layout/Center';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/src/renderer/components/ui/button';

const { CenterContainer } = CenterLayout;

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <CenterLayout>
      <CenterContainer>
        <h1 className="text-4xl text-white">Dashboard</h1>
        <Button
          className="inline-block text-center"
          onClick={() => navigate('/')}
        >
          Log Out
        </Button>
      </CenterContainer>
    </CenterLayout>
  );
};

export default Dashboard;
