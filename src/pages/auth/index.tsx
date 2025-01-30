import RootLogin from "components/rootlogin";
import FormLogin from "./FormLogin/login";
import useAuthStore from "stores/auth.store";
import FormRegister from "./FormRegister/register";

const AuthProducer = () => {
  const { stepLogin } = useAuthStore();

  return <RootLogin>{!stepLogin ? <FormLogin /> : <FormRegister />}</RootLogin>;
};
export default AuthProducer;
