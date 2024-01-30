import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles({
  playArea: {
    margin: "10px 25px"
  },
  messageArea: {
    margin: "10px"
  },
  message: {
    fontSize: "22px",
    color: "white"
  },
  winOrLoseContainer: {
    height: "50px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: "15px",
    marginBottom: "15px"
  },
  winOrLose: {
    border: "1px solid black",
    backgroundColor: "grey",
    height: "40px",
    fontSize: "1.3em",
    fontWeight: "bold",
    color: "white",
    lineHeight: "40px",
    opacity: 0.8
  }
});
