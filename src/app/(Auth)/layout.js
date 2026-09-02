import { Flex } from 'antd';

export default function AuthLayout({ children }) {
  return (
    <main className="grid h-screen max-h-screen place-items-center overflow-auto bg-gradient-to-br from-secondary/75 to-primary/75">
      <Flex
        align="stretch"
        justify="start"
        className="mx-auto max-h-[100vh] w-full rounded-xl   lg:w-3/4 xl:w-full"
      >
        <div className="grid flex-1 place-items-center p-8">{children}</div>
      </Flex>
    </main>
  );
}
