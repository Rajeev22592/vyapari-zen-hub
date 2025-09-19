import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  business: z.string().min(2),
  city: z.string().min(2),
  state: z.string().min(2),
  phone: z.string().min(10),
});

type FormValues = z.infer<typeof schema>;

const JoinNetworkPage = () => {
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log("submit", data);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      <main className="p-4 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Join Network</h1>
          <p className="text-muted-foreground">Create your trader profile</p>
        </div>
        <Card className="bg-gradient-card border-border/50 shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">Trader Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <Input placeholder="Business name" {...register("business")} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input placeholder="City" {...register("city")} />
                <Input placeholder="State" {...register("state")} />
              </div>
              <Input placeholder="Phone" {...register("phone")} />
              <Button type="submit">Submit</Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <BottomNav />
    </div>
  );
};

export default JoinNetworkPage;
