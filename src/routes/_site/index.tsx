import { createFileRoute } from '@tanstack/react-router';
import Button from '@atlaskit/button/new';

export const Route = createFileRoute('/_site/')({
  component: Index,
});

function Index() {
  return (
    <main className='max-w-7xl px-4 pt-8 mx-auto'>
      <div className='flex items-center gap-3'>
        <Button>FambaHub</Button>
        <Button appearance='primary'>FambaHub</Button>
      </div>
    </main>
  );
}
