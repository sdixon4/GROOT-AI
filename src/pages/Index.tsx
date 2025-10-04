import { Sidebar } from '@/components/layout/Sidebar';
import Triage from './Triage';

const Index = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <Triage />
    </div>
  );
};

export default Index;
