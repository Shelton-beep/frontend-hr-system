import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IoIosAdd } from "react-icons/io";
import AddJobForm from "@/components/AddJobForm";

const AddNewJobDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-teal-700 text-white">
          <IoIosAdd className="h-4 w-4" />
          Add new vacancy
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Job Vacancy</DialogTitle>
        </DialogHeader>
        <AddJobForm />
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" className="w-full bg-red-500" size={"lg"}>
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewJobDialog;
