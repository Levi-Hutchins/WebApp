import { toast } from "react-toastify";
const useValidaton = () => {
    const validateSignUp = (values) => {
        if(!values.Email || !/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(values?.Email)){
            toast.error("Invalid Email Address", {
                position: "bottom-right"
            })
            return false;

        }
        if(!values.Name || values.Name === ""){
            toast.error("Please Enter a name", {
                position: "bottom-right"
            })
            return false;

        }
        if(!values.Password || values.Password === ""){
            toast.error("Invalid Password", {
                position: "bottom-right"
            })
            return false;

        }
        if(!values.ConfirmPassword || values.ConfirmPassword === ""){
            toast.error("Invalid Confirm Password ", {
                position: "bottom-right"
            })
            return false;

        }
        if(values.Password !== values.ConfirmPassword){
            toast.error("Passwords do not match", {
                position: "bottom-right"
            })
            return false;
        }
        return true
    }
    return {validateSignUp}


}
export default useValidaton;