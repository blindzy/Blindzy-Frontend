import React, { useEffect, useState } from "react";
import { Camera, Plus, Loader2, X, Check } from 'lucide-react';
import { Button } from "@lib/components/ui/button";
import fetchMedusaApi from "../../lib/lib/fetchMedusaApi";
import { Icon } from '@iconify/react';

interface UserData {
    id: string;
    email?: string;
    phone?: string;
    company_name?: string;
    pfp_url?: string;
}

interface EditForm {
    email: string;
    phone: string;
    company_name: string;
}

function UserDetail() {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editForm, setEditForm] = useState<EditForm>({ email: "", phone: "", company_name: "" });
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        async function getUserData() {
            try {
                const email = localStorage.getItem("userEmail");
                if (!email) {
                    console.error("Email not found in localStorage");
                    return;
                }

                const data = await fetchMedusaApi<any>({
                    endpoint: "/store/customers/get-customer",
                    query: { email },
                });

                setUserData(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }

        getUserData();
    }, []);

    const openEdit = () => {
        if (!userData) return;
        setEditForm({
            email: userData.email ?? "",
            phone: userData.phone ?? "",
            company_name: userData.company_name ?? "",
        });
        setIsEditOpen(true);
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditSave = async () => {
        if (!userData?.id) return;
        setIsSaving(true);
        try {
            await fetchMedusaApi({
                endpoint: "/store/customers/update-customer",
                method: "PATCH",
                body: {
                    id: userData.id,
                    email: editForm.email,
                    phone: editForm.phone,
                    company_name: editForm.company_name,
                },
            });

            setUserData((prev) =>
                prev
                    ? {
                          ...prev,
                          email: editForm.email,
                          phone: editForm.phone,
                          company_name: editForm.company_name,
                      }
                    : prev
            );
            setIsEditOpen(false);
        } catch (error) {
            console.error("Failed to save profile:", error);
        } finally {
            setIsSaving(false);
        }
    };

    // Converts a File to a base64 string (without the data URI prefix)
    const fileToBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result as string;
                resolve(result.split(",")[1]);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !userData?.id) return;

        const localPreview = URL.createObjectURL(file);
        setPreview(localPreview);
        setIsUploading(true);

        try {
            const base64Content = await fileToBase64(file);

            const uploadRes = await fetchMedusaApi<{ url: string }>({
                endpoint: "/store/upload/upload-pfp",
                method: "POST",
                body: {
                    filename: file.name,
                    mimeType: file.type,
                    content: base64Content,
                },
            });

            const uploadedUrl = uploadRes?.url;
            if (!uploadedUrl) throw new Error("No URL returned from upload endpoint");

            await fetchMedusaApi({
                endpoint: "/store/customers/update-customer",
                method: "PATCH",
                body: {
                    id: userData.id,
                    pfp_url: uploadedUrl,
                },
            });

            setPreview(uploadedUrl);
            setUserData((prev) => prev ? { ...prev, pfp_url: uploadedUrl } : prev);
        } catch (error) {
            console.error("Image upload failed:", error);
            setPreview(null);
        } finally {
            setIsUploading(false);
            e.target.value = "";
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("access_token");

        document.cookie = "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        window.location.href = "/login";
    };

    const avatarSrc = preview || userData?.pfp_url;

    return (
        <>
            <div className="sticky top-0 xl:w-[25vw] w-full xl:h-[calc(100vh-32px)] h-full flex flex-col justify-between gap-[48px] xl:p-[1.25vw] sm:p-[2.344vw] p-4 xl:pt-[48px] bg-primary rounded-48 text-white xl:shrink-0">
                <div className="w-full flex flex-col gap-[48px]">
                    {userData ? (
                        <React.Fragment>
                            <div className="w-full flex flex-col items-center gap-4">
                                <div className="xl:size-[7.813vw] sm:size-[150px] size-[88px] rounded-full">
                                    <input
                                        type="file"
                                        className="hidden"
                                        id="user-image"
                                        accept=".jpg,.jpeg,.png,.webp"
                                        onChange={handleImageChange}
                                        disabled={isUploading}
                                    />

                                    <label
                                        htmlFor="user-image"
                                        className={`cursor-pointer relative w-full h-full flex items-center justify-center border border-[--white] rounded-full overflow-hidden ${isUploading ? "pointer-events-none" : ""}`}
                                    >
                                        {avatarSrc ? (
                                            <img
                                                src={avatarSrc}
                                                className="w-full h-full object-cover"
                                                alt="Profile"
                                            />
                                        ) : (
                                            <Camera className="xl:size-[2.5vw] sm:size-[48px] size-[26px] text-[--white]" />
                                        )}

                                        {isUploading && (
                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full">
                                                <Loader2 className="xl:size-[2vw] sm:size-[36px] size-[22px] text-white animate-spin" />
                                            </div>
                                        )}

                                        {!isUploading && (
                                            <div className="absolute xl:right-[0.729vw] sm:right-[14px] right-[6px] xl:bottom-[0.625vw] sm:bottom-[12px] bottom-[4px] xl:size-[0.938vw] size-[18px] bg-primary flex items-center justify-center">
                                                <Plus className="sm:size-[18px] size-[14px] text-[--white]" />
                                            </div>
                                        )}
                                    </label>
                                </div>

                                <h4 className="text-xl">{userData.email}</h4>
                            </div>

                            <div className="flex flex-col gap-2">
                                <h5 className="text-lg">DETAIL</h5>
                                <div className="flex items-center gap-2 text-md">
                                    <p>Email:</p>
                                    <a href={`mailto:${userData.email}`} className="transition hover:text-[--Black]">
                                        {userData.email}
                                    </a>
                                </div>
                                <div className="flex items-center gap-2 text-md">
                                    <p>Phone:</p>
                                    <a href={`tel:${userData.phone}`} className="transition hover:text-[--Black]">
                                        {userData.phone}
                                    </a>
                                </div>
                                <div className="flex items-center gap-2 text-md">
                                    <p>Company Name:</p>
                                    <p>{userData.company_name}</p>
                                </div>
                            </div>
                        </React.Fragment>
                    ) : (
                        <Icon icon="svg-spinners:8-dots-rotate" className="text-[36px] text-[--white] text-center mx-auto" />
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <Button variant={'light'} size={'large'} onClick={openEdit} className="w-full border-[--white] text-sm">
                        Edit Profile
                    </Button>
                    <Button variant={'outline_white'} size={'large'} onClick={handleLogout} className="w-full text-sm">
                        Log Out
                    </Button>
                </div>
            </div>

            {/* Edit Profile Modal */}
            {isEditOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white text-black rounded-2xl p-8 w-full max-w-md mx-4 flex flex-col gap-6 shadow-2xl">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-semibold">Edit Profile</h3>
                            <button
                                onClick={() => setIsEditOpen(false)}
                                className="text-gray-400 hover:text-black transition"
                            >
                                <X className="size-5" />
                            </button>
                        </div>

                        <div className="flex flex-col gap-4">
                            {/* Email (read-only) */}
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-gray-600">Email</label>
                                <input
                                    type="email"
                                    value={userData?.email ?? ""}
                                    readOnly
                                    disabled
                                    className="border border-gray-100 rounded-lg px-4 py-2.5 text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
                                />
                            </div>

                            {/* Phone */}
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-gray-600">Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={editForm.phone}
                                    onChange={handleEditChange}
                                    placeholder="Enter phone number"
                                    className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary transition"
                                />
                            </div>

                            {/* Company Name */}
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-gray-600">Company Name</label>
                                <input
                                    type="text"
                                    name="company_name"
                                    value={editForm.company_name}
                                    onChange={handleEditChange}
                                    placeholder="Enter company name"
                                    className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary transition"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <Button
                                variant={'outline_white'}
                                size={'large'}
                                onClick={() => setIsEditOpen(false)}
                                className="flex-1 text-sm border-gray-200 text-black"
                            >
                                Cancel
                            </Button>
                            <Button
                                variant={'light'}
                                size={'large'}
                                onClick={handleEditSave}
                                disabled={isSaving}
                                className="flex-1 text-sm"
                            >
                                {isSaving ? (
                                    <Loader2 className="size-4 animate-spin mx-auto" />
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        <Check className="size-4" /> Save
                                    </span>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default UserDetail;