// @mui
import { Box } from "@mui/material";
// type
import { WrongAlertProps } from "@/_components/pages/login/loginType";
type IProps = {
  wrongAlert: WrongAlertProps;
};
const WrongAlert = ({ wrongAlert }: IProps) => {
  return (
    <Box
      component="p"
      sx={{
        position: "absolute",
        color: "red",
        fontSize: "16px",
        right: "-130px",
        top: "-150px",
        zIndex: "501",
        padding: "30px 25px",
        bgcolor: "#ffffff",
        boxShadow: "0 3px 5px rgba(0, 0, 0, 0.2)",
        borderRadius: "50%",
        fontWeight: 700,
        opacity: `${!wrongAlert.showAlert ? 0 : 1}`,
        transform: `${!wrongAlert.showAlert ? "scale(0,0)" : "scale(1,1)"}`,
        transition: "linear 0.4s 0.6s",
        "&:before": {
          content: '""',
          position: "absolute",
          width: "15px",
          height: "15px",
          left: "-35px",
          bottom: "-25px",
          bgcolor: "#ffffff",
          boxShadow: "0 3px 5px rgba(0, 0, 0, 0.2)",
          borderRadius: "50%",
        },
        "&:after": {
          content: '""',
          position: "absolute",
          width: "25px",
          height: "25px",
          left: "-19px",
          bottom: "-8px",
          bgcolor: "#ffffff",
          boxShadow: "0 3px 5px rgba(0, 0, 0, 0.2)",
          borderRadius: "50%",
        },
      }}>
      {wrongAlert.message || "Có gì đó sai sai...!"}
    </Box>
  );
};
export default WrongAlert;
