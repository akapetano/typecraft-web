import { Container, type ContainerProps } from "styled-system/jsx";

export const Layout = (props: ContainerProps) => {
  return (
    <Container
      maxWidth="breakpoint-xl"
      display="flex"
      flexDirection="column"
      flex="1"
      {...props}
    />
  );
};
