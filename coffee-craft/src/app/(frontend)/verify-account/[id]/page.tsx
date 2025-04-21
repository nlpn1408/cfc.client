import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import VerifyTokenForm from "@/components/VerifyTokenForm";

export default async function VerifyAccount({
    params: { id },
}: {
    params: { id: string };
}) {
    //Get a User by ID
    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Verify Account</CardTitle>
                    <CardDescription>
                        {/* Please check your email -{user?.email}- and Enter the code we sent there to verify your account. */}
                    </CardDescription>
                    <CardContent>
                        <VerifyTokenForm />
                    </CardContent>
                </CardHeader>
            </Card>
        </div>
    );
}