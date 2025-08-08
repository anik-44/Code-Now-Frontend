import * as Label from '@radix-ui/react-label';
import {useRef, useState} from 'react';
import {Pencil} from 'lucide-react';
import {useSelector} from "react-redux";
import NavBar from "@/components/NavBar";

export default function ProfileUpdate() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState<string | null>(null);
    const user = useSelector((state: any) => state.user);
    console.log(user)

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <NavBar/>
            <div className="max-w-3xl mx-auto p-6 space-y-8">

                <h1 className="text-2xl font-bold">Update Profile</h1>

                <div className="flex gap-8">
                    {/* LEFT: Image */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-32 h-32 rounded-full overflow-hidden border border-gray-300">
                            <img
                                src={image || '/placeholder.jpg'}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="px-3 py-1 text-sm rounded bg-gray-100 hover:bg-gray-200"
                        >
                            Change Photo
                        </button>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </div>

                    {/* RIGHT: Editable Fields */}
                    <div className="flex-1 space-y-6">
                        {/* Name */}
                        <div className="space-y-1">
                            <Label.Root htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name
                            </Label.Root>
                            <div className="flex items-center gap-2">
                                <input
                                    id="name"
                                    type="text"
                                    value={user.username}
                                    className="flex-1 border px-3 py-2 rounded w-full"
                                />
                                <Pencil size={16} className="text-gray-500"/>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-1">
                            <Label.Root htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </Label.Root>
                            <div className="flex items-center gap-2">
                                <input
                                    id="email"
                                    type="email"
                                    value={user.email}
                                    className="flex-1 border px-3 py-2 rounded w-full"
                                />
                                <Pencil size={16} className="text-gray-500"/>
                            </div>
                        </div>

                        {/* Password */}
                        {/*<div className="space-y-1">*/}
                        {/*    <Label.Root htmlFor="password" className="block text-sm font-medium text-gray-700">*/}
                        {/*        New Password*/}
                        {/*    </Label.Root>*/}
                        {/*    <input*/}
                        {/*        id="password"*/}
                        {/*        type="password"*/}
                        {/*        value={password}*/}
                        {/*        onChange={(e) => setPassword(e.target.value)}*/}
                        {/*        className="border px-3 py-2 rounded w-full"*/}
                        {/*    />*/}
                        {/*</div>*/}

                        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                            Update Profile
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
