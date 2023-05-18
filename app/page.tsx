"use client";
import { BellRing, Check, Sun, Moon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import * as EmailValidator from "email-validator";

type CardProps = React.ComponentProps<typeof Card>;

export function LoginForm({ className, ...props }: CardProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validEmail, setValidEmail] = useState(false);

    return (
        <Card className={cn("w-[380px]", className)} {...props}>
            <CardHeader>
                <CardTitle>Create an account</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
                <div className="flex flex-col gap-4">
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            type="email"
                            placeholder="Email address"
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setValidEmail(EmailValidator.validate(e.target.value));
                            }}
                        />
                    </div>
                    <div>
                        <Label htmlFor="password">New password</Label>
                        <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>
                <div className="flex items-center space-x-4 rounded-md border p-4">
                    <BellRing />
                    <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">Notifications</p>
                        <p className="text-sm text-muted-foreground">Allow us to send you imporant messages to you</p>
                    </div>
                    <Switch />
                </div>
            </CardContent>
            <CardFooter>
                <Button
                    className="w-full"
                    onClick={() => {
                        console.log(email, password);
                        console.log(EmailValidator.validate(email));
                    }}
                    disabled={!validEmail}
                >
                    <Check className="mr-2 h-4 w-4" /> Create account
                </Button>
            </CardFooter>
        </Card>
    );
}

export default function Home() {
    const [theme, setTheme] = useState<string>("light");
    return (
        <div className={`flex flex-col w-screen h-screen ${theme === "light" ? "" : "bg-gray-950"}`}>
            <nav className={`h-12 flex items-center justify-end p-4 w-screen ${theme === "light" ? "" : "bg-gray-950"}`}>
                <button onClick={() => (theme === "light" ? setTheme("dark") : setTheme("light"))}>
                    {theme === "light" ? <Moon /> : <Sun color="white" />}
                </button>
            </nav>
            <Separator className={theme} />
            <div className="flex flex-grow items-center justify-center">{LoginForm({ className: theme })}</div>
        </div>
    );
}
