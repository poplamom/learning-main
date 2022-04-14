import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
const useStyles = makeStyles((theme) => ({
  mainGrid: {
    padding: 0,
    minHeight: "100%",
    marginBottom: "1em",
  },
}));
export default function Layout() {
  const classes = useStyles();

  return (
    <>
      <CssBaseline></CssBaseline>
      <Container maxWidth="lg" className={classes.mainGrid}>
        <Header title="Leaning" />
        <Content></Content>
        <Footer></Footer>
      </Container>
    </>
  );
}
