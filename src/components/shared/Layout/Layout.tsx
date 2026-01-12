import { Container, ContainerProps } from "styled-system/jsx";

export const Layout = (props: ContainerProps) => {
  return (
    <Container
      maxWidth="breakpoint-xl"
      display="flex"
      flexDirection="column"
      alignItems="center"
      minH="100vh"
      {...props}
    />
  );
};
