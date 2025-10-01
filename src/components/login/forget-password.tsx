import React, { useEffect,useRef, useState } from "react";
import { Button } from "@lib/components/ui/button";
import { EyeClosed , Eye } from 'lucide-react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@lib/components/ui/dialog";
import { Input } from "@lib/components/ui/input";
import { X } from 'lucide-react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@lib/components/ui/input-otp";
import { forgotPassword } from "../../services/auth/forgot";


export function ForgetPasswordPopup(props) {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [show, setShow] = useState(true);
    const [currentTab, setCurrentTab] = useState("otp");
    // Remove internal show state, use dialog open prop
    const [otp, setOtp] = useState<string>("");
    const [timer, setTimer] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const [sending, setSending] = useState(false);
    const [loading, setLoading] = useState(false);

    
    const handleSendCode = async () => {
        if(!props.email) {
            return;
        }
        try {
            const response = await forgotPassword.sendResetEmail(props.email);
            console.log("Reset email sent:", response);
            setTimer(30);
            timerRef.current && clearInterval(timerRef.current);
            timerRef.current = setInterval(() => {
                setTimer(prev => {
                    if (prev <= 1) {
                        clearInterval(timerRef.current!);
                        setSending(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } catch (error: any) {
            console.error("Forgot password failed:", error);
        }
    };
    const handleNext = async () => {
        if (!otp) {
            console.error("Error: Please enter the OTP");
            return;
        }

        try {
            const response = await forgotPassword.verifyOtp(props.email, otp);
            console.log("OTP verified successfully:", response);

            setShow(false);
            setTimeout(() => {  
                setCurrentTab("new-password");
                setShow(true);
            }, 300);
        } catch (error: any) {
            console.error("OTP verification failed:", error);
            alert("Invalid OTP. Please try again.");
        }
    };
    const handleSave = async () => {
        if (!newPassword || !confirmPassword) {
            alert("Please fill in all fields.");
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {
            const response = await forgotPassword.resetPassword(props.email, newPassword);
            console.log("Password reset successfully:", response);
            // alert("Your password has been reset successfully.");
            props.onClose();
        } catch (error: any) {
            console.error("Password reset failed:", error);
            alert("Failed to reset password. Please try again.");
        }
    };

    const isDisabled = otp.length !== 6;
    return (
        <Dialog open={true} onOpenChange={open => { if (!open && props.onClose) props.onClose(); }}>
            <DialogContent className="xl:max-w-[700px] w-full rounded-24 gap-[36px]">
                <DialogHeader>
                    <DialogTitle className="text-lg">Change Password</DialogTitle>
                    <DialogClose asChild>
                        <Button type="button" variant="light" size={'lg'} onClick={props.onClose}>
                            <X className="size-6" />
                        </Button>
                    </DialogClose>
                </DialogHeader>
                <div className={`w-full flex flex-col gap-[36px] ${show ? 'fade-in' : 'fade-out'}`}>
                    {currentTab === 'otp'?(
                        <React.Fragment>
                            <div className="w-full flex flex-col gap-2">
                                <label className="text-sm text-[--black]">Verification code has been sent to {props.email}</label>
                                <div className="w-full flex items-stretch gap-2">
                                    <div className="w-full">
                                        <InputOTP
                                            maxLength={6}
                                            className='w-full'
                                            value={otp}
                                            onChange={setOtp}
                                        >
                                            <InputOTPGroup className='w-full'>
                                                <InputOTPSlot index={0} className='w-full shrink bg-transparent text-[--black] border border-[--lightGrey]' />
                                                <InputOTPSlot index={1} className='w-full shrink bg-transparent text-[--black] border border-[--lightGrey]' />
                                                <InputOTPSlot index={2} className='w-full shrink bg-transparent text-[--black] border border-[--lightGrey]' />
                                                <InputOTPSlot index={3} className='w-full shrink bg-transparent text-[--black] border border-[--lightGrey]' />
                                                <InputOTPSlot index={4} className='w-full shrink bg-transparent text-[--black] border border-[--lightGrey]' />
                                                <InputOTPSlot index={5} className='w-full shrink bg-transparent text-[--black] border border-[--lightGrey]' />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </div>
                                    <Button
                                        variant="primary"
                                        className="sm:w-[120px] w-full text-sm"
                                        onClick={handleSendCode}
                                        disabled={sending || timer > 0}
                                    >
                                        {timer > 0 ? (
                                            <span className="flex items-center gap-1">
                                                {timer}s
                                            </span>
                                        ) : sending ? (
                                            <span className="flex items-center gap-1">
                                                <svg className="animate-spin size-4" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                                                </svg>
                                                Sending...
                                            </span>
                                        ) : (
                                            "Send Again"
                                        )}
                                    </Button>
                                </div>
                            </div>
                            <DialogFooter className="w-full">
                                <Button 
                                    variant={'primary'} 
                                    size={'smallest'} 
                                    className="w-full shrink"
                                    disabled={isDisabled || loading}
                                    onClick={handleNext}
                                >
                                    {loading ? 'Verifying...' : 'Next'}
                                </Button>
                            </DialogFooter>
                        </React.Fragment>
                    ):(
                        <React.Fragment>
                            <div className="w-full flex flex-col gap-4">
                                <div className="relative w-full">
                                    <Input
                                        type={showNewPassword ? "text" : "password"}
                                        name="newPassword"
                                        placeholder="New Password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                    <span onClick={() => setShowNewPassword(!showNewPassword)} className="cursor-pointer absolute top-0 right-0 w-fit h-full flex items-center pr-6 transition text-[16px] text-[--black] hover:text-[--primary]">
                                        {showNewPassword ? <Eye className="size-[18px]"/> : <EyeClosed className="size-[18px]"/>}
                                    </span>
                                </div>
                                <div className="relative w-full">
                                    <Input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        placeholder="Confirm Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="cursor-pointer absolute top-0 right-0 w-fit h-full flex items-center pr-6 transition text-[16px] text-[--black] hover:text-[--primary]">
                                        {showConfirmPassword ? <Eye className="size-[18px]"/> : <EyeClosed className="size-[18px]"/>}
                                    </span>
                                </div>
                            </div>
                            <DialogFooter className="w-full">
                                <DialogClose asChild>
                                    <Button 
                                        variant={'light'} 
                                        size={'smallest'} 
                                        className="w-full shrink"
                                        // onClick={}
                                    >
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <Button 
                                    variant={'primary'} 
                                    size={'smallest'} 
                                    className="w-full shrink"
                                    onClick={handleSave}
                                >
                                    Save
                                </Button>
                            </DialogFooter>
                        </React.Fragment>

                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
