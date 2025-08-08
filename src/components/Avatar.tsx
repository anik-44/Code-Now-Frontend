import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {useToast} from "@/hooks/use-toast";
import {logout} from "@/store/authSlice";
import {DropdownMenuGroup} from "@radix-ui/react-dropdown-menu";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

function AvatarComponent() {
    const {toast} = useToast();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutUser = () => {
        // @ts-expect-error(')
        dispatch(logout({toast, successCallback: () => navigate("/login")}));
    };

    const profileHandler = () => {
        navigate("/profile")
    }

    return (
        <>
            <div className="px-6">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className="cursor-pointer">
                            <AvatarImage src="https://github.com/shadcn.png"/>
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-24">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuGroup>
                            <DropdownMenuItem
                                onClick={profileHandler}
                            >Profile</DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => logoutUser()}>
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </>
    );
}

export default AvatarComponent;
