import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button, Divider, Typography } from "@mui/material";
import { IconLock, IconMail, IconPassword } from "@tabler/icons-react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="py-8">
                <Typography
                    variant="h2"
                    component="h1"
                    className="text-center text-gray-700 dark:text-gray-200"
                    gutterBottom
                >
                    Login
                </Typography>
                <hr className="border-2 dark:border-gray-600" />
                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <div className="flex border border-gray-300 dark:border-gray-700 rounded-md mt-1">
                        <div className="flex items-center mx-2">
                            <IconMail className="items-center" />
                        </div>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="block w-full rounded-l-none"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData("email", e.target.value)}
                        />
                    </div>

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />
                    <div className="flex border border-gray-300 dark:border-gray-700 rounded-md mt-1">
                        <div className="flex items-center mx-2">
                            <IconLock className="items-center" />
                        </div>

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="block w-full rounded-l-none"
                            autoComplete="current-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />
                    </div>

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 flex">
                    <label className="flex flex-1 items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">
                            Remember me
                        </span>
                    </label>
                    <div className="mt-4 ml-10 flex items-center justify-end">
                        <Button
                            variant="outlined"
                            type="submit"
                            className="ms-4"
                            disabled={processing}
                        >
                            Log in
                        </Button>
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}
