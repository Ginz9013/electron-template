import { useNavigate } from 'react-router-dom';
import { Button } from '@/src/renderer/components/ui/button';
import { Input } from '@/src/renderer/components/ui/input';
import CenterLayout from '@/src/renderer/components/layout/center';
import icon from '@/assets/icon.svg';

const Login = () => {
  const navigate = useNavigate();

  return (
    <CenterLayout>
      <div className="flex flex-col items-center gap-4">
        <img width="160" alt="icon" src={icon} />
        <h1 className="text-white text-2xl mb-4">electron-react-boilerplate</h1>
        {/* Account */}
        <div className="w-full">
          <label htmlFor="account" className="text-white text-sm">
            Account
          </label>
          <Input id="account" className="text-white" />
        </div>
        {/* Password */}
        <div className="w-full">
          <label htmlFor="password" className="text-white text-sm">
            Password
          </label>
          <Input id="password" className="text-white" />
        </div>
        <Button
          className="bg-white text-slate-900 hover:bg-slate-300 w-full font-bold mt-4"
          // eslint-disable-next-line no-console
          onClick={() => navigate('/dashboard')}
        >
          Login
        </Button>
      </div>
    </CenterLayout>
  );
};

export default Login;
