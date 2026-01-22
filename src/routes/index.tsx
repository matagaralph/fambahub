import { createFileRoute } from '@tanstack/react-router';
import { Text } from '@primer/react';
export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <>
      <header className='h-15 border-b border-default'></header>
      <main className='max-w-7xl mx-auto px-4 pt-8'>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos amet
          omnis, cupiditate magni iure voluptatem inventore perferendis placeat
          soluta error aliquam unde accusantium illum, dolorem, sit repellendus
          recusandae quas excepturi!
        </Text>
      </main>
    </>
  );
}
