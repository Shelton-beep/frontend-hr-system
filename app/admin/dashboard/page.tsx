import JobsTab from "@/app/_components/JobsTab";
import { auth } from "@/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <main>
      <Tabs defaultValue="jobs" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="interviews">Interviews</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">dashboard</TabsContent>
        <TabsContent value="jobs">
          <div className="mb-6">
            <JobsTab />
          </div>
        </TabsContent>
        <TabsContent value="applications">
          List of all job applications here.
        </TabsContent>
        <TabsContent value="interviews">List of interviews.</TabsContent>
      </Tabs>
    </main>
  );
};

export default DashboardPage;
