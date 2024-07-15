import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { LiaEdit } from "react-icons/lia";

interface ProfileCardHeaderProps {
  title: string;
  handleClick: () => void;
  handleClose: () => void;
}

export const ProfileCardHeader = ({
  title,
  handleClick,
  handleClose,
}: ProfileCardHeaderProps) => {
  const [editClicked, setEditClicked] = useState(false);

  const handleEditClick = () => {
    handleClick();
    setEditClicked(true);
  };

  const handleCloseClick = () => {
    handleClose();
    setEditClicked(false);
  };

  return (
    <div>
      <div className="flex p-2 justify-between">
        <h1 className="font-bold text-nowrap items-center gap-3 md:text-2xl flex text-teal-700">
          {title}
        </h1>

        {!editClicked ? (
          <Button variant={"outline"} onClick={handleEditClick}>
            <span>
              <LiaEdit className="h-4 w-4 font-bold" />
            </span>
            <span className="hidden md:flex">Edit Information</span>
          </Button>
        ) : (
          <Button
            variant={"destructive"}
            onClick={handleCloseClick}
            className="gap-1 items-center flex"
          >
            <span>
              <AiOutlineCloseCircle className="h-4 w-4 font-bold" />
            </span>
            <span className="hidden md:flex">Close Edit</span>
          </Button>
        )}
      </div>
      <Separator />
    </div>
  );
};
