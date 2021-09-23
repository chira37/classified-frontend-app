import { removeToken, setToken } from "@api/http";
import { setUser } from "@redux/slices/userSlice";
import store from "@redux/store";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

class AuthService {
    setUser(token: string): void {
        setToken(token); // set in axios authorization header
        Cookies.set("token", token, { expires: 7 });
        const { email, id } = jwtDecode<{ email: string; id: string }>(token);
        store.dispatch(setUser({ email, id }));
    }

    private removeUser(): void {
        removeToken();
        Cookies.remove("token");
        store.dispatch(setUser({ email: null, id: null }));
    }

    logOut(): void {
        this.removeUser;
    }

    hydarateUser(): void {
        const token = Cookies.get("token");
        if (token) {
            setToken(token);
            const { email, id } = jwtDecode<{ email: string; id: string }>(token);
            store.dispatch(setUser({ email, id }));
        }
    }
}

export default AuthService;
