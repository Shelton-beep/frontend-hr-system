"use client";

import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { WhyNssaItem } from "./WhyNssaItem";
import { GiLifeBar, GiSkills } from "react-icons/gi";
import { Button } from "@/components/ui/button";
import { useCallback, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";

export const WhyNssa = () => {
  const [showContent, setShowContent] = useState(false);

  // Using useCallback to create a memoized function to update the state
  const toggleContent = useCallback(() => {
    setShowContent((prevShowContent) => !prevShowContent);
  }, []);

  return (
    <>
      <div className="mt-6">
        <div className="flex gap-3">
          <h1 className="text-3xl text-green-600 font-bold">
            Why should you join NSSA?.
          </h1>
          <Button
            className="flex gap-2 items-center justify-center"
            variant={"outline"}
            onClick={toggleContent}
          >
            {showContent ? "Hide" : "Show"}
            {showContent ? (
              <ArrowUp className="h-4 w-4" />
            ) : (
              <ArrowDown className="h-4 w-4" />
            )}
          </Button>
        </div>
        {showContent && (
          <div className="mt-6 flex flex-col md:flex-row md:justify-center md:h-[200px]">
            <WhyNssaItem
              icon={<FaMoneyBillTrendUp className="m-3 h-8 w-8" />}
              title="Earning more."
              description="Get better remuneration opportunities."
            />
            <WhyNssaItem
              icon={<GiSkills className="m-3 h-8 w-8" />}
              title="Improving Skills"
              description="Perfect Environment for improving your skills"
            />
            <WhyNssaItem
              icon={<GiLifeBar className="m-3 h-8 w-8" />}
              title="Improving Life"
              description="Amazing Teamwork and connections which will improve life."
            />
          </div>
        )}
      </div>
    </>
  );
};
