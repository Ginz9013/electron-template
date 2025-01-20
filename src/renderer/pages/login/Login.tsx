import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/src/renderer/components/ui/button';
import { Input } from '@/src/renderer/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/src/renderer/components/ui/form';
import { useUser } from '@/src/renderer/hooks/useUser';
import CenterLayout from '@/src/renderer/components/layout/Center';
import icon from '@/assets/icon.svg';

const formSchema = z.object({
  account: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});

const { CenterContainer } = CenterLayout;

const Login = () => {
  const [ _, setUser ] = useUser();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      account: '',
      password: '',
    },
  });

  const submitHandler = (values: z.infer<typeof formSchema>) => {
    setUser({ token: values.account + values.password });
    navigate('/dashboard');
  };

  return (
    <CenterLayout>
      <CenterContainer>
        <img width="160" alt="icon" src={icon} />
        <h1 className="text-white text-2xl mb-4">electron-react-boilerplate</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitHandler)}
            className="space-y-4 w-full flex flex-col"
          >
            <FormField
              control={form.control}
              name="account"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Account</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Please enter your account..."
                      className="text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Please enter your password..."
                      className="text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CenterContainer>
    </CenterLayout>
  );
};

export default Login;
